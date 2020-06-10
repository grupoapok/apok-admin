export const getItem = (context, id) =>
  Vue.$rest.executeVuexRequest(context, GET_ITEM, `CHANGE_ME/${id}`)
     .catch(error => processError(context, error));
