import router from './router'
import store from './store'
import {
  Message,MessageBox 
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken,removeToken,getUseId
} from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'  //更改网页title

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const username =window.localStorage.getItem("userName")
  var hasToken = getToken(username)
  if(!window.localStorage.getItem("userName")){
    hasToken = ""
  }

  if(getToken(username)){                                        //token存在
    if(!getUseId(window.localStorage.getItem("userName"))){     //关闭页面但浏览器缓存未清理所有时，避免程序报错进行清理
      removeToken(window.localStorage.getItem("userName"))
      Message.error('浏览器已重新打开,请重新登录')
    }
  }
  if (hasToken) {      
    console.log(hasToken,"hasToken")
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next(
        {
        path: '/'
      }
      )
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          const {
            roles
          } = await store.dispatch('user/getInfo')
          store.dispatch('GenerateRoutes').then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({
              ...to,
              replace: true
            })
          })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    console.log(window.localStorage.getItem("userName"),22222)
    /* has no token*/
    if (to.path === '/login') {
      next()
    } else if (to.path === '/dashboard') {
      next(`/login`)
      NProgress.done()
    }else {
      store.dispatch('user/resetToken')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
      MessageBox.alert('登录信息已过期，请重新登录', '警告', {
          confirmButtonText: '确定',
          callback: action => {
            location.reload() 
          }
        });
      

    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
