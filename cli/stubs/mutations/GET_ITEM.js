[GET_ITEM](state, payload) {
  state.loading = payload.meta === 'PENDING';
  if (payload.meta === 'SUCCESS') {
    state.currentItem = payload.data.data;
  }
}
