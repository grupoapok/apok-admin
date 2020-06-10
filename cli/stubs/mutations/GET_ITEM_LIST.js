[GET_ITEM_LIST](state, payload) {
  state.loading = payload.meta === 'PENDING';
  if (payload.meta === 'SUCCESS') {
    state.currentPage = payload.data.meta.current_page;
    state.totalPages = payload.data.meta.last_page;
    state.perPage = payload.data.meta.per_page;
    state.list[state.currentPage] = payload.data.data;
    state.totalRecords = payload.data.meta.total;
    state.loading = false;
  }
}
