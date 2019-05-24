import Vue from 'vue';
import {
  CHANGE_PAGE,
  CHANGE_PAGE_SIZE,
  DELETE_ITEM,
  GET_ITEM,
  GET_ITEM_LIST,
  RESET_LIST,
  RESET_ITEM,
  SAVE_ITEM,
} from '@/store/ListTypes';

export const getItemList = (context, { page, size }) => context.commit(GET_ITEM_LIST, Vue.http.get(`users?page=${page}&size=${size}`));

export const resetList = context => context.commit(RESET_LIST);

export const changePage = (context, page) => context.commit(CHANGE_PAGE, parseInt(page, 10));

export const changePageSize = (context, size) => {
  context.commit(CHANGE_PAGE_SIZE, parseInt(size, 10));
  context.dispatch('changePage', 1)
    .then(() => context.dispatch('resetList'))
    .then(() => context.dispatch('getItemList', { page: 1, size }));
};

export const getItem = (context, id) => context.commit(GET_ITEM, Vue.http.get(`users/${id}`));

export const resetItem = context => context.commit(RESET_ITEM);

export const deleteItem = (context, id) => context.commit(DELETE_ITEM, id);

export const saveItem = (context, data) => {
  const savePromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 3000);
  });

  return new Promise((resolve, reject) => {
    context.commit(SAVE_ITEM, { meta: 'PENDING' });
    return savePromise
      .then((response) => {
        context.commit(SAVE_ITEM, { meta: 'SUCCESS', data: response });
        resolve();
      })
      .catch((error) => {
        context.commit(SAVE_ITEM, { meta: 'ERROR', data: error });
        reject(error);
      });
  });
};
