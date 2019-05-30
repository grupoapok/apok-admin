import NetworkClient from "../NetworkClient";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import Cookies from "js-cookie";
import store from "@/store";
import ValidationError from "../ValidationError";

class GraphQLClient extends NetworkClient {
  constructor(params) {
    super();

    const httpLink = new HttpLink({
      uri: params.baseUrl
    });

    const logoutLink = onError(({ networkError, graphQLErrors, ...others }) => {
      if (graphQLErrors) {
        const error = graphQLErrors[0];
        if (
          error.hasOwnProperty("message") &&
          error.message.toLowerCase() === "unauthenticated"
        ) {
          store.dispatch("auth/logout", { root: true });
        }
      }
      if (networkError) {
        if (networkError.statusCode === 401) {
          store.dispatch("auth/logout", { root: true });
        }
      }
    });

    const authLink = new ApolloLink((operation, forward) => {
      // Retrieve the authorization token from local storage.
      const sessionCookie = Cookies.get(params.sessionCookie);
      // Use the setContext method to set the HTTP headers.
      operation.setContext({
        headers: {
          Authorization: sessionCookie ? `Bearer ${sessionCookie}` : "",
          Accept: "application/json"
        }
      });

      // Call the next link in the middleware chain.
      return forward(operation);
    });

    this.client = new ApolloClient({
      // Provide the URL to the API server.
      link: logoutLink.concat(authLink.concat(httpLink)), // Chain it with the HttpLink
      // Using a cache for blazingly
      // fast subsequent queries.
      cache: new InMemoryCache({ resultCaching: false })
    });
  }

  executeRequest(url, params, method = "QUERY") {
    const reqMethod = method.toLowerCase();
    let promise;
    const variables = { ...params };
    switch (reqMethod) {
      case "query":
        promise = this.client.query({
          query: url,
          variables,
          fetchPolicy: params.fetchPolicy || "network-only"
        });
        break;
      case "mutation":
      case "mutate":
        promise = this.client.mutate({
          mutation: url,
          variables,
          errorPolicy: params.errorPolicy || "all"
        });
        break;
      default:
        throw new Error(`Invalid request type ${method}`);
    }
    return promise;
  }

  executeVuexRequest(context, action, url, params, method = "QUERY") {
    context.commit(action, { meta: "PENDING", data: params });
    return new Promise((resolve, reject) => {
      this.executeRequest(url, params, method)
        .then(response => {
          if (response.hasOwnProperty("errors")) {
            if (
              response.errors[0].hasOwnProperty("extensions") &&
              response.errors[0].extensions.category === "validation"
            ) {
              throw new ValidationError(
                response.errors[0].extensions.validation
              );
            }
            throw new Error(response.errors);
          }
          context.commit(action, { meta: "SUCCESS", data: response.data });
          resolve(response);
        })
        .catch(error => {
          context.commit(action, { meta: "ERROR", data: error });
          reject(error);
        });
    });
  }
}

export default GraphQLClient;
