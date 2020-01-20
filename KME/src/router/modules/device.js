/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const nestedRouter = {
  path: '/equipmentManage',
  component: Layout,
  name: 'equipmentManage',
  alwaysShow:true,
  meta: {
    title: '设备管理',
    icon: 'device'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/vsz-device/device-list'),
      name: 'Menu1',
      meta: {
        title: '设备列表'
      }
      // redirect: '/nested/menu1/menu1-1'
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/vsz-device/device-add'),
      meta: {
        title: '新增设备'
      }
    },
    {
      path: 'menu4',
      name: 'Menu4',
      component: () => import('@/views/vsz-device/type-list'),
      meta: { title: '类型列表' }
    },
    {
      path: 'menu3',
      name: 'Menu3',
      component: () => import('@/views/vsz-device/type-add'),
      meta: { title: '新增类型' }
    },
    {
      path: 'menu17',
      name: 'Menu17',
      hidden: true,
      component: () => import('@/views/vsz-device/type-edit'),
      meta: { title: '编辑类型' }
    },
    {
      path: 'menu19',
      name: 'Menu19',
      hidden: true,
      component: () => import('@/views/vsz-device/device-survey'),
      meta: { title: '设备详情' }
    },
    {
      path: 'menu5',
      name: 'Menu5',
      hidden: true,
      component: () => import('@/views/vsz-device/history-locus'),
      meta: { title: '历史轨迹' }
    },
    {
      path: 'menu6',
      name: 'Menu6',
      hidden: true,
      component: () => import('@/views/vsz-device/alarm-records'),
      meta: { title: '告警记录' }
    },
    {
      path: 'menu7',
      name: 'Menu7',
      hidden: true,
      component: () => import('@/views/vsz-device/alarm-detail'),
      meta: { title: '告警详情' }
    },
    {
      path: 'menu8',
      name: 'Menu8',
      hidden: true,
      component: () => import('@/views/vsz-device/device-detail'),
      meta: { title: '设备详情' }
    },
    {
      path: 'menu9',
      name: 'Menu9',
      hidden: true,
      component: () => import('@/views/vsz-device/history-data'),
      meta: { title: '历史数据' }
    },
    {
      path: 'menu10',
      name: 'Menu10',
      hidden: true,
      component: () => import('@/views/vsz-device/device-edit'),
      meta: { title: '编辑设备' }
    },
    {
      path: 'menu11',
      name: 'Menu11',
      hidden: true,
      // component: () => import('@/views/vsz-device/device-survey'),
      meta: { title: '文件管理' }
    },
    {
      path: 'menu12',
      name: 'Menu12',
      hidden: true,
      // component: () => import('@/views/vsz-device/file-management'),
      meta: { title: '下载文件' }
    },
    {
      path: 'menu13',
      name: 'Menu13',
      hidden: true,
      // component: () => import('@/views/vsz-device/file-management'),
      meta: { title: '删除文件' }
    },
    {
      path: 'menu14',
      name: 'Menu14',
      hidden: true,
      // component: () => import('@/views/vsz-device/file-management'),
      meta: { title: '上传文件' }
    },
    {
      path: 'menu15',
      name: 'Menu15',
      hidden: true,
      // component: () => import('@/views/vsz-device/file-management'),
      meta: { title: '设备解锁' }
    },
    {
      path: 'menu16',
      name: 'Menu16',
      hidden: true,
      // component: () => import('@/views/vsz-device/file-management'),
      meta: { title: '删除类型' }
    },
    {
      path: 'menu18',
      name: 'Menu18',
      hidden: true,
      // component: () => import('@/views/vsz-device/file-management'),
      meta: { title: '删除设备' }
    }
  ]
}

export default nestedRouter
