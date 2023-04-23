import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite';
import path from 'node:path'
import { createPlugins } from './build/plugin'
import { getEnvConfig, wrapperEnv } from './build/utils'

function resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

getEnvConfig()

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH } = viteEnv

  const isBuild = command === 'build'
  
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [{ find: '@', replacement: resolve('src') }],
    },
    server: {
      port: VITE_PORT,
      https: false,
      host: true,
    },
    esbuild: {
      drop: isBuild ? ['console', 'debugger'] : [],
    },
    plugins: createPlugins(viteEnv, isBuild),
  }
}
