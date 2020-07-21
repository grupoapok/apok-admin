export default {
  path: '%MODULE_NAME_LOWER%',
  component: () => import(/* webpackChunkName: "%MODULE_NAME%" */ './views/%MODULE_NAME%.vue'),
  children: [
    {
      path: '/',
      redirect: { name: '%MODULE_NAME%List' }
    },
    {
      path: 'list',
      name: '%MODULE_NAME%List',
      props: true,
      component: () => import(/* webpackChunkName: "%MODULE_NAME%_list" */ './views/%MODULE_NAME%List.vue')
    },
    {
      path: 'edit/:id',
      name: '%MODULE_NAME%Edit',
      props: true,
      component: () => import(/* webpackChunkName: "%MODULE_NAME%_edit" */ './views/%MODULE_NAME%Edit.vue')
    },
    {
      path: 'edit/0',
      name: '%MODULE_NAME%New',
      redirect: {
        name: '%MODULE_NAME%Edit',
        params: { id: '0' },
      },
    },
  ],
}
