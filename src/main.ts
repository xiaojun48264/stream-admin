import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/index.less'
import { setupStore } from '@/store'
import { setupRouter } from './router'

async function bootstrap() {
    const app = createApp(App)

    setupStore(app)

    setupRouter(app)

    app.mount('#app')
}

bootstrap()