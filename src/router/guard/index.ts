import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import { Notification } from '@arco-design/web-vue'
import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'

export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createHttpGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createStateGuard(router)
}

/**
 * 处理页面状态的钩子
 * @param router
 */
function createPageGuard(router: Router) {
  router.beforeEach(() => {
    return true
  })
}

/**
 * 切换路由时关闭当前页面以完成请求的接口
 * @param router
 */
function createHttpGuard(router: Router) {
  router.beforeEach(() => {
    return true
  })
}

/**
 * 用于路由切换时关闭消息实例
 * @param router
 */
function createMessageGuard(router: Router) {
  router.beforeEach(() => {
    Notification.clear()
    return true
  })
}

/**
 * 路由切换进度条
 * @param router
 */
function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    nProgress.start()
    return true
  })
  router.afterEach(() => {
    nProgress.done()
    return true
  })
}
