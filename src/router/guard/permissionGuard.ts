import type { Router, RouteLocationRaw } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { PageEnum } from '@/enums/PageEnum'

const LOGIN_PATH = PageEnum.BASE_LOGIN

const whitePathList: PageEnum[] = [LOGIN_PATH]

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    const token = userStore.getAccessToken

    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }

    if (!token) {
      const redirectData: RouteLocationRaw = {
        path: LOGIN_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    }

    next()
  })
}
