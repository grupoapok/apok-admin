import Vue from "vue";
import VueResource from "vue-resource";
import Cookies from "js-cookie";
import router from "@/router";
import NetworkClient from "../NetworkClient";

class RESTClient extends NetworkClient {
  constructor(params) {
    super();
    this.baseUrl = params.baseUrl;
    Vue.use(VueResource);
    Vue.http.options.root = params.baseUrl;

    Vue.http.interceptors.push(request => {
      // modify request
      if (params.sessionCookie) {
        const accessToken = Cookies.get(params.sessionCookie);
        if (
          accessToken !== undefined &&
          accessToken !== null &&
          accessToken.trim() !== ""
        ) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      }
      if (params.logging) {
        console.log(request);
      }
      return response => {
        if (response.status === 401) {
          Cookies.remove(params.sessionCookie);
          router.push({ name: "Login" });
        }
      };
    });
  }

  executeRequest(url, params, method) {
    const reqMethod = method.toLowerCase();
    let promise;
    switch (reqMethod) {
      case "get":
        promise = Vue.http.get(url, params);
        break;
      case "post":
        promise = Vue.http.post(url, params);
        break;
      case "put":
        promise = Vue.http.put(url, params);
        break;
      case "delete":
        promise = Vue.http.delete(url, params);
        break;
    }
    return promise.then(response => response.body);
  }

  executeVuexRequest(context, action, url, params, method = "get") {
    context.commit(action, { meta: "PENDING", data: params });
    const reqPromise = this.executeRequest(url, params, method);
    return new Promise((resolve, reject) => {
      reqPromise
        .then(response => {
          context.commit(action, { meta: "SUCCESS", data: response });
          resolve(response);
        })
        .catch(error => {
          context.commit(action, { meta: "ERROR" });
          reject(error);
        });
    });
  }
}

export default RESTClient;
