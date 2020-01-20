/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const nestedRouter = {
  path: '/equipmentMonitor',
  component: Layout,
  alwaysShow:true,
  name: 'equipmentMonitor',
  meta: {
    title: '设备监控',
    icon: 'equipmentMonitor'
  },
  children: [
    {
      path: 'jk1',
      component: () => import('@/views/vsz-monitor/monitor-map'), // Parent router-view
      name: 'jk1',
      meta: { title: '地图分布' }
    },
    {
      path: 'jk3',
      name: 'jk3',
      component: () => import('@/views/vsz-monitor/monitor-list-change.vue'),
      meta: { title: '数据点监控' }
    },
  ]
}

export default nestedRouter
