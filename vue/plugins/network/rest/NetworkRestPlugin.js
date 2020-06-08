import RESTClient from "./RESTClient";
import Vue from 'vue';

const NetworkRestPlugin = {
  install(Vue, options) {
    Vue.rest = new RESTClient(options);
  }
};

export default NetworkRestPlugin;
