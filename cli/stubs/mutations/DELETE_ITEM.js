[DELETE_ITEM](state, payload) {
  switch (payload.meta) {
    case 'PENDING': {
      Object.keys(state.list).forEach(page => {
        state.list[page].filter(item => item.id === payload.data.id)
                        .forEach(item => item.deleting = true)
      });
      break;
    }
    case 'SUCCESS': {
      const newList = cloneDeep(state.list);
      Object.keys(newList).forEach(page => {
        newList[page] = newList[page].filter(item => !item.deleting)
      });
      state.list = newList;
      break;
    }
    case 'ERROR': {
      Object.keys(state.list).forEach(page => {
        state.list[page].forEach(item => item.deleting = false);
      });
      break;
    }
  }
}
