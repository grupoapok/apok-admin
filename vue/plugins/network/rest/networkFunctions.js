import Vue from "vue";
import axios from 'axios';

export const executeVuexRequest = (context, action, url, params, method = "get") => {
    context.commit(action, { meta: "PENDING", data: params });
    let reqPromise;
    switch(method){
        case "get":
            reqPromise = axios.get(url, params);
            break;
        case "post":
            reqPromise = axios.post(url, params);
            break;
        case "put":
            reqPromise = axios.put(url, params);
            break;
        case "delete":
            reqPromise = axios.delete(url, params);
            break;
    }
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
};
