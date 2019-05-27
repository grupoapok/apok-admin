// import RESTClient from "./clients/RESTClient";
// import GraphQLClient from "./clients/GraphQLClient";

const NetworkPlugin = {
  install(vue, options) {
    if (options.rest){
      const RESTClient = require('./clients/RESTClient').default;
      vue.$rest = new RESTClient(options.rest);
    }
    if (options.graphql){
      const GraphQLClient = require('./clients/GraphQLClient').default;
      vue.$graphql = new GraphQLClient(options.graphql);
    }
  }
};

export default NetworkPlugin;
