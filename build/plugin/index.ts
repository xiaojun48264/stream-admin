import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import mkcert from 'vite-plugin-mkcert'
import { configHtmlPlugin } from './html'
import { configImagePlugin } from './image'
import { ViteEnv } from '../types'

export function createPlugins(env: ViteEnv, isBuild: boolean) {
  const plugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [ArcoResolver({ sideEffect: true })],
    }),
    mkcert({
      source: 'coding',
    }),
  ]

  // vite-plugin-html
  plugins.push(configHtmlPlugin(env, isBuild))

  // vite-plugin-image
  isBuild && plugins.push(configImagePlugin())

  return plugins
}
