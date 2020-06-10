export const deleteItem = (context, id) =>
  Vue.$rest.executeVuexRequest(context, DELETE_ITEM, `CHANGE_ME/${id}`, { id }, 'DELETE');
