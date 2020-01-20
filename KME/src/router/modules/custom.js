/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const nestedRouter = {
  path: '/custom',
  component: Layout,
  // redirect: 'menu1/menu1-1',
  name: 'custom',
  alwaysShow:true,
  meta: {
    title: '客户管理',
    icon: 'user'
  },
  children: [{
    path: 'custom1',
    name: 'custom1',
    component: () => import('@/views/vsz-custom/custom-list'),
    meta: {
      title: '客户列表'
    }
    },
    {
      path: 'customadd',
      component: () => import('@/views/vsz-custom/custom-add'),
      name: 'customadd',
      meta: {
        title: '新增客户'
      }
    },
    {
      path: 'custom2',
      hidden: true,
      component: () => import('@/views/vsz-custom/custom-edit'),
      name: 'custom2',
      meta: {
        title: '编辑客户'
      }
    },
    {
      path:"custom3",
      name:"custom3",
      hidden: true,
      component: () => import('@/views/vsz-custom/custom-info'),
      meta: {
        title:'客户详情'
      }
    },
    {
      path:"custom4",
      name:"custom4",
      hidden: true,
      meta: {
        title:'删除客户'
      }
    },
    {
      path:"custom5",
      name:"custom5",
      hidden: true,
      meta: {
        title:'重置客户密码'
      }
    }
  ]
}

export default nestedRouter
