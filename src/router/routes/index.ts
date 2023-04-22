import { PageEnum } from '@/enums/PageEnum'
import type { RouteRecordRaw } from 'vue-router'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
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
