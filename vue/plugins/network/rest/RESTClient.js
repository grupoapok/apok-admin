// import Vue from "vue";
// import axios from 'axios';
// import Cookies from "js-cookie";
// import router from "@/router";
// import NetworkClient from "../NetworkClient";
//
// class RESTClient extends NetworkClient {
//   constructor(params) {
//     super();
//     const httpClient = axios.create({
//       baseURL: params.baseURL,
//     });
//
//     httpClient.interceptors.request.use((config) => {
//       if (params.sessionCookie) {
//         const accessToken = Cookies.get(params.sessionCookie);
//         if (
//           accessToken !== undefined &&
//           accessToken !== null &&
//           accessToken.trim() !== ""
//         ) {
//           config.headers['Authorization'] = `Bearer ${accessToken}`;
//         }
//       }
//       return config;
//     });
//
//     httpClient.interceptors.response.use(
//       response => response.data,
//       error => {
//         if(error.status === 401){
//           Cookies.remove(params.sessionCookie);
//           router.push({name: 'Login'})
//         }
//         return Promise.reject(error)
//       }
//     )
//   }
// }
// export default RESTClient;
