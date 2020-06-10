[SAVE_ITEM](state, payload) {
  state.loading = payload.meta === 'PENDING';

  switch (payload.meta) {
    case 'ERROR':
      state.updating = false;
      break;
    case 'PENDING':
      state.updating = !!payload.data.id;
      break;
    case 'SUCCESS': {
      state.list = updatePagedList(state.list, payload.data.data, state.pageSize, state.updating);
      state.updating = false;
      state.totalPages = Object.keys(state.list).length;
      break;
    }
  }
}
