/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const nestedRouter = {
  path: '/personal',
  component: Layout,
  name: 'personal',
  alwaysShow:true,
  hidden: true,
  meta: {
    title: '个人中心',
    icon: 'form'
  },
  children: [
    {
      path: 'personalInfo',
      name: 'personalInfo',
      hidden: true,
      component: () => import('@/views/vsz-personal/personal-Info'),
      meta: { title: '个人信息' }
    },
    {
      path: 'modificationPwd',
      name: 'modificationPwd',
      hidden: true,
      component: () => import('@/views/vsz-personal/modification-pwd'),
      meta: { title: '密码管理' }
    },
    {
      path: 'personalEidt',
      name: 'personalEidt',
      hidden: true,
      component: () => import('@/views/vsz-personal/personalEdit'),
      meta: { title: '资料修改' }
    }
  ]
}

export default nestedRouter
