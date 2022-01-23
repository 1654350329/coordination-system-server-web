import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },
  {
    path: '/dataReport',
    component: Layout,
    redirect: '/dataReport',
    name: 'DataReport',
    meta: {title: '资料上报与初审', icon: 'dashboard'},
    children: [
      {
        path: 'dataReport',
        name: 'DataReport',
        component: () => import('@/views/dataReport/index'),
        meta: {title: '资料上报', icon: 'dashboard'}
      },
      {
        path: 'dataExamine',
        name: 'DataExamine',
        component: () => import('@/views/dataExamine/index'),
        meta: {title: '资料初审', icon: 'dashboard'}
      }]
  },

// 系统管理
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage',
    name: 'UserManage',
    meta: {title: '系统管理', icon: 'el-icon-setting'},
    children: [
      {
        path: 'userManage',
        name: 'UserManage',
        component: () => import('@/views/user/index'),
        meta: {title: '用户管理', icon: 'el-icon-user-solid'}
      },
      {
        path: 'roleManage',
        name: 'RoleManage',
        component: () => import('@/views/role/index'),
        meta: {title: '角色管理', icon: 'el-icon-coin'}
      },
      {
        path: 'menuManage',
        name: 'MenuManage',
        component: () => import('@/views/menu/index'),
        meta: {title: '菜单管理', icon: 'el-icon-menu'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
