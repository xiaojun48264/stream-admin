import path from 'pathe'
import type { PluginOption, ResolvedConfig } from 'vite'
import { isFunction, isRegExp } from './utils'
import { VitePluginImageMin } from './type'

const extRE = /\.(png|jpeg|gif|jpg|bmp|svg)$/i

export function imagePlugin(options: VitePluginImageMin = {}): PluginOption {
  let outputPath: string
  let publicDir: string
  let config: ResolvedConfig

  const { filter = extRE } = options

  function processFile(filePath: string, buffer: Buffer) {

  }

  return {
    name: 'vite:images',
    apply: 'build',
    enforce: 'post',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      outputPath = resolvedConfig.build.outDir

      if (typeof resolvedConfig.publicDir === 'string') {
        publicDir = resolvedConfig.publicDir
      }
    },
    async generateBundle(_, bundler) {
      const files: string[] = []

      Object.keys(bundler).forEach(key => {
        filterFile(path.resolve(outputPath, key), filter) && files.push(key)
      })

      if (!files.length) return;

      const handles = files.map(async (filePath: string) => {
        const source = (bundler[filePath] as any).source

        const result = ''

        if (result) {
          (bundler[filePath] as any).source = result
        }
      })

      await Promise.all(handles)
    },
    async closeBundle() {
      console.log('closeBundle')
    },
  }
}

function filterFile(file: string, filter: RegExp | ((file: string) => boolean)) {
  if (filter) {
    const isRe = isRegExp(filter)
    const isFn = isFunction(filter)
    if (isRe) {
      return (filter as RegExp).test(file)
    }
    if (isFn) {
      return (filter as (file: any) => any)(file)
    }
  }
  return false
}
