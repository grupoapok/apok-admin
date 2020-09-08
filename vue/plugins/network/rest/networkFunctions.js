export const executeVuexRequestFactory = (httpClient) => (context, action, url, params, method = "get") => {
    context.commit(action, { meta: "PENDING", data: params });
    let reqPromise;
    switch(method.toLowerCase()){
        case "get":
            reqPromise = httpClient.get(url, params);
            break;
        case "post":
            reqPromise = httpClient.post(url, params);
            break;
        case "put":
            reqPromise = httpClient.put(url, params);
            break;
        case "delete":
            reqPromise = httpClient.delete(url, params);
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
