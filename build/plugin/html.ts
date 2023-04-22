import { PluginOption } from 'vite'
import { ViteEnv } from '../types'
import { createHtmlPlugin } from './vite/html'

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE } = env

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
    },
  })

  return htmlPlugin
}
