import Cookies from 'js-cookie'
import router from '@/router'
import axios from "axios";
import {executeVuexRequestFactory} from './networkFunctions'

const NetworkRestPlugin = {
  install(Vue, pluginOptions) {
    let currentHttpClient;
    if(pluginOptions.httpClient){
      currentHttpClient = pluginOptions.httpClient;
    }else{
      currentHttpClient = axios.create({
        baseURL: pluginOptions.baseURL,
      });

      currentHttpClient.interceptors.request.use((config) => {
        if (pluginOptions.sessionCookie) {
          const accessToken = Cookies.get(pluginOptions.sessionCookie);
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

      currentHttpClient.interceptors.response.use(
        response => response.data,
        error => {
          if(error.status === 401){
            Cookies.remove(pluginOptions.sessionCookie);
            router.push({name: 'Login'})
          }
          return Promise.reject(error)
        }
      );
    }
    Vue.$rest = {executeVuexRequest: executeVuexRequestFactory(currentHttpClient)}
  }
};

export default NetworkRestPlugin;
