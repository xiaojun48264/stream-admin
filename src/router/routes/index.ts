import { PageEnum } from '@/enums/PageEnum'
import type { RouteRecordRaw } from 'vue-router'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
  children: [
    {
      path: PageEnum.BASE_HOME.replace('/', ''),
      name: 'Dashboard',
      redirect: PageEnum.BASE_HOME + '/analysis',
      children: [
        {
          path: 'analysis',
          name: 'Analysis',
          component: () => import('@/views/dashboard/analysis/index.vue')
        }
      ]
    }
  ]
}

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
  meta: {
    title: '登录',
  },
}

export const basicRoutes = [LoginRoute, RootRoute]
