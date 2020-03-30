import NotFound from '@views/partials/NotFound'

export default [
  {
    path: '/',
    redirect: '/deck/new'
  },
  {
    path: '*',
    meta: {
      title: '页面未找到',
      ignoreAuth: true
    },
    component: NotFound
  }
]
