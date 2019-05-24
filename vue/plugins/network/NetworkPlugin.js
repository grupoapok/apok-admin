import RESTClient from "./clients/RESTClient";
import GraphQLClient from "./clients/GraphQLClient";

const NetworkPlugin = {
  install(vue, options) {
    if (options.rest){
      vue.$rest = new RESTClient(options.rest);
    }
    if (options.graphql){
      vue.$graphql = new GraphQLClient(options.graphql);
    }
  }
};

export default NetworkPlugin;
