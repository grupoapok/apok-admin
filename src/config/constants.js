export default {
  APP_NAME: process.env.VUE_APP_APP_NAME || 'Vue Admin',
  SHORT_APP_NAME: process.env.VUE_APP_SHORT_APP_NAME || 'VA',
  SESSION_COOKIE: process.env.VUE_APP_SESSION_COOKIE || 'vue.admin.session',
  API_URL: process.env.VUE_APP_API_URL,
  CLIENT_ID: process.env.VUE_APP_CLIENT_ID,
  CLIENT_SECRET: process.env.VUE_APP_CLIENT_SECRET,
  PAGINATION_META: "meta",
  PAGINATION_DATA: "data",
  PAGINATION_CURRENT_PAGE: "current_page",
  PAGINATION_TOTAL_PAGES: "last_page",
  PAGINATION_PER_PAGE: "per_page",
  DEFAULT_LANG: process.env.VUE_APP_DEFAULT_LANG || 'en'
};
