/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const nestedRouter = {
  path: '/notifications',
  component: Layout,
  name: 'notifications',
  alwaysShow:true,
  hidden: true,
  redirect: '/notifications/notificationsList',
  meta: {
    title: '通知中心',
    icon: 'form'
  },
  children: [
    {
      path: 'notificationsList',
      hidden: true,
      component: () => import('@/views/vsz-notifications/notifications-list'),
      name: 'notificationsList',
      meta: { title: '通知列表' }
      // redirect: '/nested/menu1/menu1-1'
    },
    {
      path: 'addNotifications',
      name: 'addNotifications',
      hidden: true,
      component: () => import('@/views/vsz-notifications/notifications-add'),
      meta: { title: '管理通知' }
    }
  ]
}

export default nestedRouter
