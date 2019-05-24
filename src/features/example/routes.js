export default {
  path: 'example',
  name: 'Example',
  component: () => import(/* webpackChunkName: "example" */ './views/Example.vue'),
  redirect: { name: 'ExampleList' },
  children: [
    {
      path: 'list',
      name: 'ExampleList',
      component: () => import(/* webpackChunkName: "example_list" */ './views/ExampleList.vue')
    },
    {
      path: 'edit/:id',
      name: 'ExampleForm',
      component: () => import(/* webpackChunkName: "example_form" */ './views/ExampleForm.vue')
    },
    {
      path: 'new',
      name: 'ExampleNew',
      redirect: {
        name: 'ExampleForm',
        params: { id: 0 }
      }
    }
  ]
}
