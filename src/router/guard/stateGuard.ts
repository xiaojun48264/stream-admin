import type { Router } from 'vue-router'
import { PageEnum } from '@/enums/PageEnum'
import { useUserStore } from '@/store/modules/user'

export function createStateGuard(router: Router) {
  router.afterEach(to => {
    if (to.path === PageEnum.BASE_LOGIN) {
      const userStore = useUserStore()

      userStore.resetState()
    }
  })
}
