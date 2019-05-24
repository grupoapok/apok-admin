import cloneDeep from "lodash/cloneDeep";
import constants from "@/config/constants";
import {
  CHANGE_PAGE,
  CHANGE_PAGE_SIZE,
  DELETE_ITEM,
  GET_ITEM,
  GET_ITEM_LIST,
  RESET_LIST,
  RESET_ITEM,
  SAVE_ITEM
} from "@/store/ListTypes";

export const initialState = {
  list: {},
  pageSize: 20,
  loading: false,
  currentPage: 1,
  totalPages: 1,
  perPage: 1,
  currentItem: {}
};

export const mutations = {
  [CHANGE_PAGE](state, page) {
    state.currentPage = page;
  },
  [CHANGE_PAGE_SIZE](state, size) {
    state.pageSize = size;
  },
  [RESET_LIST](state) {
    state.list = {};
  },
  [GET_ITEM_LIST](state, payload) {
    switch (payload.meta) {
      case "PENDING":
        state.loading = true;
        break;
      case "ERROR":
        state.loading = false;
        break;
      case "SUCCESS": {
        state.loading = false;
        const newList = { ...state.list };
        const meta = payload.data[constants.PAGINATION_META];
        state.currentPage = parseInt(
          meta[constants.PAGINATION_CURRENT_PAGE],
          10
        );
        state.totalPages = parseInt(
          meta[constants.PAGINATION_TOTAL_PAGES],
          10
        );
        state.perPage = parseInt(meta[constants.PAGINATION_PER_PAGE], 10);
        newList[state.currentPage] = payload.data[constants.PAGINATION_DATA];
        state.list = newList;
        break;
      }
      default:
        break;
    }
  },
  [GET_ITEM](state, payload) {
    switch (payload.meta) {
      case "PENDING":
        state.loading = true;
        break;
      case "ERROR":
        state.loading = false;
        state.currentItem = {};
        break;
      case "SUCCESS":
        state.loading = false;
        state.currentItem = payload.data.data;
        break;
      default:
        break;
    }
  },
  [RESET_ITEM](state) {
    state.currentItem = {};
  },
  [DELETE_ITEM](state, id) {
    const newList = { ...state.list };
    newList[state.currentPage] = newList[state.currentPage].filter(
      u => u.id !== id
    );
    state.list = newList;
  },
  [SAVE_ITEM](state, payload) {
    switch (payload.meta) {
      case "PENDING":
        state.loading = true;
        break;
      case "SUCCESS": {
        state.loading = false;
        const newList = cloneDeep(state.list);

        state.list[state.currentPage].forEach((user, index) => {
          if (user.id === payload.data.data.id) {
            newList[state.currentPage][index] = { ...payload.data.data };
          }
        });

        state.list = newList;
        break;
      }
      default:
        break;
    }
  }
};
