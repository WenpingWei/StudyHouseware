/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const nestedRouter = {
  path: '/dataManage',
  component: Layout,
  // redirect: 'menu1/menu1-1',
  name: 'dataManage',
  alwaysShow:true,
  meta: {
    title: '数据管理',
    icon: 'table'
  },
  children: [{
    path: 'dataNum1',
    component: () => import('@/views/vsz-data/data-module'),
    name: 'num1',
    meta: {
      title: '数据模板'
    }
    // redirect: '/nested/menu1/menu1-1'
  },
  {
    path: 'dataNum2',
    name: 'num2',
    component: () => import('@/views/vsz-data/module-add'),
    meta: {
      title: '新增数据模板'
    }
  },
  {
    path: 'dataNum5',
    name: 'num2',
    hidden: true,
    component: () => import('@/views/vsz-data/module-edit'),
    meta: {
      title: '编辑模板'
    }
  },
  {
    path: 'dataNum3',
    name: 'num3',
    hidden: true,
    component: () => import('@/views/vsz-data/point-list'),
    meta: {
      title: '数据点管理'
    }
  },
  {
    path: 'dataNum4',
    name: 'num4',
    hidden: true,
    component: () => import('@/views/vsz-data/edit-point'),
    meta: {
      title: '编辑数据点'
    }
  },
  {
    path: 'dataNum6',
    name: 'num4',
    hidden: true,
    component: () => import('@/views/vsz-data/add-point'),
    meta: {
      title: '新增数据点'
    }
  },
  {
    path: 'dataNum7',
    name: 'num7',
    hidden: true,
    meta: {
      title: '删除模板'
    }
  },
  {
    path: 'dataNum8',
    name: 'num8',
    hidden: true,
    meta: {
      title: '删除数据点'
    }
  }
  ]
}

export default nestedRouter
