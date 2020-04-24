export const saveItem = (context, object) => {
  let method = 'POST';
  let url = 'CHANGE_ME';
  if (!!object.id) {
    url = `CHANGE_ME/${object.id}`;
    method = 'PUT';
  }
  return new Promise((resolve, reject) => {
    Vue.$rest.executeVuexRequest(context, SAVE_ITEM, url, object, method)
       .then(response => {
         context.dispatch('messages/sendMessage', {
           type: 'success',
           text: 'success',
           id: new Date().getTime()
         }, { root: true });
         resolve(response);
       })
       .catch(error => {
         processError(context, error);
         reject(error);
       });
  });
};
