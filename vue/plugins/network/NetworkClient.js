class NetworkClient {
  static get Types() {
    return {
      REST: "REST",
      GRAPHQL: "GraphQL"
    };
  }

  constructor() {
    if (this.constructor === NetworkClient) {
      throw new TypeError("Abstract Classes cannot be instantiated");
    }
  }

  executeRequest(url, params, method = 'get') {
    throw new Error("Abstract Method not overriden by subclass");
  }

  executeVuexRequest(context, action, url, params, method = 'get') {
    throw new Error("Abstract Method not overriden by subclass");
  }
}
export default NetworkClient;
