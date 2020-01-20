/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const nestedRouter = {
  path: '/gateway',
  component: Layout,
  alwaysShow:true,
  name: 'gateway',
  meta: {
    title: '网关管理',
    icon: 'gateway'
  },
  children: [
    {
      path: 'gatewayList',
      component: () => import('@/views/vsz-gateway/gateway-list'),
      name: 'gatewayList',
      meta: { title: '网关列表' }
      // redirect: '/nested/menu1/menu1-1'
    },
    {
      path: 'addGateway',
      name: 'addGateway',
      component: () => import('@/views/vsz-gateway/gateway-add'),
      meta: { title: '新增网关' }
    },
    {
      path: 'modifyGateway',
      name: 'modifyGateway',
      hidden: true,
      component: () => import('@/views/vsz-gateway/gateway-modify'),
      meta: { title: '编辑网关' }
    },
    {
      path: 'deviceBind',
      name: 'deviceBind',
      hidden: true,
      component: () => import('@/views/vsz-gateway/device-bind'),
      meta: { title: '绑定设备' }
    },
    {
      path: 'operationalLog',
      name: 'operationalLog',
      hidden: true,
      component: () => import('@/views/vsz-gateway/operational-log'),
      meta: { title: '操作日志' }
    },
    {
      path: 'deviceBindAdd',
      name: 'deviceBindAdd',
      hidden: true,
      component: () => import('@/views/vsz-gateway/deviceBind-add'),
      meta: { title: '新增绑定设备' }
    },
    {
      path: 'deviceBindModify',
      name: 'deviceBindModify',
      hidden: true,
      component: () => import('@/views/vsz-gateway/deviceBind-modify'),
      meta: { title: '编辑绑定设备' }
    },
    {
      path: 'deviceBindDetails',
      name: 'deviceBindDetails',
      hidden: true,
      component: () => import('@/views/vsz-gateway/device-status'),
      meta: { title: '告警设置' }
    },
    {
      path: 'gateWayData',
      name: 'gateWayData',
      hidden: true,
      meta: { title: '网关数据下发' }
    },
    {
      path: 'delDevice',
      name: 'delDevice',
      hidden: true,
      meta: { title: '删除绑定设备' }
    },
    {
      path: 'delGateWay',
      name: 'delDevice',
      hidden: true,
      meta: { title: '删除网关' }
    },
    {
      path: '',
      name: 'system7',
      hidden: true,
      meta: { title: '编辑方案' }
    },{
      path: '',
      name: 'system4',
      hidden: true,
      meta: { title: '新增方案' }
    }
  ]
}

export default nestedRouter
