import GraphQLClient from "./GraphQLClient";

const NetworkGraphQLPlugin = {
  install(vue, options){
    vue.$graphql = new GraphQLClient(options);
  }
};

export default NetworkGraphQLPlugin;
