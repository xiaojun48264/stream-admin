import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import '@/assets/styles/index.less'

async function bootstrap() {
    const app = createApp(App)

    setupStore(app)

    app.mount('#app')
}

bootstrap()