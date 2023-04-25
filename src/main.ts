import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/index.less'
import { setupStore } from '@/store'
import { setupRouter, router } from '@/router'
import { setupRouterGuard } from '@/router/guard'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  setupRouterGuard(router)

  app.mount('#app')
}

bootstrap()
