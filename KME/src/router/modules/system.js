/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const nestedRouter = {
  path: '/system',
  component: Layout,
  alwaysShow:true,
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'system'
  },
  children: [
    {
      path: 'system1',
      component: () => import('@/views/vsz-system/personal-list'),
      name: 'system1',
      meta: { title: '用户管理' }
    },
    {
      path: 'addPersonal',
      component: () => import('@/views/vsz-system/personal-add'),
      name: 'addPersonal',
      meta: { title: '新增用户' }
    },
    {
      path: 'editorPersonal',
      hidden:true,
      component: () => import('@/views/vsz-system/personal-editor'),
      name: 'editorPersonal',
      meta: { title: '编辑用户' }
    },
    {
      path: 'system2',
      name: 'system2',
      component: () => import('@/views/vsz-system/role'),
      meta: { title: '角色管理' }
    },
    {
      path: 'system5',
      // hidden: true,
      name: 'system5',
      component: () => import('@/views/vsz-system/role-add.vue'),
      meta: { title: '新增角色' }
    },
    {
      path: 'system3',
      name: 'system3',
      component: () => import('@/views/vsz-system/solution'),
      meta: { title: '解决方案管理' }
    },
    {
      path: 'system4',
      name: 'system4',
      component: () => import('@/views/vsz-system/addSolution'),
      meta: { title: '新增解决方案' }
    },
    {
      path: 'system7',
      name: 'system7',
      hidden: true,
      component: () => import('@/views/vsz-system/modifySolution'),
      meta: { title: '编辑解决方案' }
    },
    {
      path: 'system6',
      name: 'system6',
      hidden: true,
      component: () => import('@/views/vsz-system/role-edit.vue'),
      meta: { title: '编辑角色' }
    },
    {
      path: 'system8',
      name: 'system8',
      hidden: true,
      meta: { title: '删除用户' }
    },
    {
      path: 'system9',
      name: 'system9',
      hidden: true,
      meta: { title: '密码重置' }
    },
    {
      path: 'system10',
      name: 'system10',
      hidden: true,
      meta: { title: '删除解决方案' }
    },
    {
      path: 'system11',
      name: 'system11',
      hidden: true,
      meta: { title: '删除角色' }
    }
  ]
}

export default nestedRouter
