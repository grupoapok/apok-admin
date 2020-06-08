import Cookies from 'js-cookie'
import router from 'vue-router'
import axios from "axios";
import {executeVuexRequest} from './networkFunctions'

const NetworkRestPlugin = {
  install(Vue, options) {
    const httpClient = axios.create({
      baseURL: options.baseURL,
    });

    httpClient.interceptors.request.use((config) => {
      if (options.sessionCookie) {
        const accessToken = Cookies.get(options.sessionCookie);
        if (
          accessToken !== undefined &&
          accessToken !== null &&
          accessToken.trim() !== ""
        ) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }
      return config;
    });

    httpClient.interceptors.response.use(
      response => response.data,
      error => {
        if(error.status === 401){
          Cookies.remove(options.sessionCookie);
          router.push({name: 'Login'})
        }
        return Promise.reject(error)
      }
    );

    Vue.$rest = {executeVuexRequest: executeVuexRequest}
  }
};

export default NetworkRestPlugin;
