import fs from 'node:fs'
import dotenv from 'dotenv'
import path from 'node:path'
import { ViteEnv } from './types'

export function getEnvConfig(match: string = 'VITE_GLOB_', confFiles: string[] = ['.env', '.env.production']) {
  let envConfig = {}

  confFiles.forEach(item => {
    try {
        const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)))
        envConfig = { ...envConfig, ...env }
    } catch (error) {
      console.error(`Error in parsing ${item}`, error)
    }
  })

  const reg = new RegExp(`^${match}`)
  Object.keys(envConfig).forEach(key => {
    if (!reg.test(key)) {
        Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig
}

export function wrapperEnv(envConfig: Record<string, any>): ViteEnv {
    const ret: any = {}

    Object.keys(envConfig).forEach(key => {
        let realName = envConfig[key].replace(/\\n/g, '\n')
        
        realName = realName === 'true' ? true : realName === 'false' ? false : realName

        if (key === 'VITE_PORT') {
            realName = Number(realName)
        }

        ret[key] = realName
    })

    return ret
}
