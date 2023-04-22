import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'

const WHITE_NAME_LIST: string[] = []

function getRouteNames(arr: any[]) {
  arr.forEach(item => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
}

getRouteNames(basicRoutes)

export const router = createRouter({
  routes: basicRoutes,
  history: createWebHistory(),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route

    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App) {
  app.use(router)
}
