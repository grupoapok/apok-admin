export const getItemList = (context, params) =>
  Vue.$rest.executeVuexRequest(
    context,
    GET_ITEM_LIST,
    `CHANGE_ME?page=${params.page}&size=${params.size}`
  );
