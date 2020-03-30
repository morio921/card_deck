import Frame from '@views/partials/Frame'

export default [{
  path: '/deck',
  component: Frame,
  fullpath: 'deck',
  children: [
    {
      path: 'new',
      fullpath: '/deck/new',
      component: resolve => require(['@views/deck/New'], resolve)
    },
    {
      path: ':id',
      fullpath: '/deck/:id',
      component: resolve => require(['@views/deck/Pile'], resolve)
    }
  ]
}]
