import RESTClient from "./RESTClient";

const NetworkRestPlugin = {
  install(vue, options) {
    vue.$rest = new RESTClient(options);
  }
}

export default NetworkRestPlugin;
