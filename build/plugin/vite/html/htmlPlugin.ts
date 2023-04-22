import { PluginOption, ResolvedConfig, normalizePath } from 'vite'
import type { InjectOptions, PageOption, Pages, UserOptions } from './type'
import history from 'connect-history-api-fallback'
import path from 'node:path'
import { render } from 'ejs'
import { parse } from 'node-html-parser'
import fg from 'fast-glob'
import consola from 'consola'
import fs from 'fs-extra'
import { dim } from 'colorette'

const DEFAULT_TEMPLATE = 'index.html'
const ignoreDirs = ['.', '', '/']

const bodyInjectRE = /<\/body>/

export function createPlugin(userOption: UserOptions = {}): PluginOption {
  const { entry, template = DEFAULT_TEMPLATE, pages = [], verbose = false } = userOption

  let viteConfig: ResolvedConfig

  return {
    name: 'vite-plugin-html',
    enforce: 'pre',
    config(config) {
      const input = createInput(userOption, config as unknown as ResolvedConfig)

      if (input) {
        return {
          build: {
            rollupOptions: {
              input,
            },
          },
        }
      }
    },
    configResolved(config) {
      viteConfig = config
    },
    configureServer(server) {
      let _pages: { filename: string; template: string }[] = []
      const rewrites: { from: RegExp; to: string | ((context: any) => string) }[] = []

      if (!isMpa(viteConfig)) {
        const template = userOption.template || DEFAULT_TEMPLATE
        const filename = DEFAULT_TEMPLATE
        _pages.push({ template, filename })
      } else {
        _pages = pages.map(page => {
          return {
            filename: page.filename || DEFAULT_TEMPLATE,
            template: page.template || DEFAULT_TEMPLATE,
          }
        })
      }
      const proxy = viteConfig.server?.proxy ?? {}
      const baseUrl = viteConfig.base ?? '/'
      const keys = Object.keys(proxy)

      let indexPage: { filename: string; template: string }
      for (const page of _pages) {
        if (page.filename !== 'index.html') {
          rewrites.push(createRewire(page.template, page, baseUrl, keys))
        } else {
          indexPage = page
        }
      }

      if (indexPage) {
        rewrites.push(createRewire('', indexPage, baseUrl, keys))
      }

      server.middlewares.use(
        history({
          disableDotRule: undefined,
          verbose: false,
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          rewrites,
        })
      )
      return
    },
    transformIndexHtml: {
      enforce: 'pre',
      async transform(html, ctx) {
        const url = ctx.filename
        const base = viteConfig.base
        const excludeBaseUrl = url.replace(base, '/')
        const htmlName = path.relative(process.cwd(), excludeBaseUrl)

        const page = getPage(userOption, htmlName, viteConfig)

        const { injectOptions = {} } = page

        const _html = await renderHtml(html, {
          injectOptions,
          viteConfig,
          // env,
          entry: page.entry || entry,
          verbose,
        })

        const { tags = [] } = injectOptions
        return {
          html: _html,
          tags,
        }
      },
    },
    async closeBundle() {
      const outputDirs: string[] = []

      if (isMpa(viteConfig) || pages.length) {
        for (const page of pages) {
          const dir = path.dirname(page.template)
          if (!ignoreDirs.includes(dir)) {
            outputDirs.push(dir)
          }
        }
      } else {
        const dir = path.dirname(template)
        if (!ignoreDirs.includes(dir)) {
          outputDirs.push(dir)
        }
      }

      const cwd = path.resolve(viteConfig.root, viteConfig.build.outDir)

      const htmlFiles = await fg(
        outputDirs.map(dir => `${dir}/*.html`),
        { cwd: path.resolve(cwd), absolute: true }
      )

      await Promise.all(
        htmlFiles.map(file =>
          fs.move(file, path.resolve(cwd, path.basename(file)), {
            overwrite: true,
          })
        )
      )

      const htmlDirs = await fg(
        outputDirs.map(dir => dir),
        { cwd: path.resolve(cwd), onlyDirectories: true, absolute: true }
      )

      await Promise.all(
        htmlDirs.map(async item => {
          const isEmpty = await isDirEmpty(item)
          if (isEmpty) {
            return fs.remove(item)
          }
        })
      )
    },
  }
}

export function createInput({ pages = [], template = DEFAULT_TEMPLATE }: UserOptions, viteConfig: ResolvedConfig) {
  const input: Record<string, string> = {}
  if (isMpa(viteConfig) || pages?.length) {
    const templates = pages.map(page => page.template)
    templates.forEach(temp => {
      let dirName = path.dirname(temp)
      const file = path.basename(temp)

      dirName = dirName.replace(/\s+/g, '').replace(/\//g, '-')

      const key = dirName === '.' || dirName === 'public' || !dirName ? file.replace(/\.html/, '') : dirName
      input[key] = path.resolve(viteConfig.root, temp)
    })

    return input
  } else {
    const dir = path.dirname(template)

    if (ignoreDirs.includes(dir)) {
      return undefined
    } else {
      const file = path.basename(template)
      const key = file.replace(/\.html/, '')
      return {
        [key]: path.resolve(viteConfig.root, template),
      }
    }
  }
}

/**
 * @description 判断是否是多页面应用
 * @param viteConfig vite配置
 * @returns
 */
function isMpa(viteConfig: ResolvedConfig) {
  const input = viteConfig?.build?.rollupOptions?.input
  return typeof input !== 'string' && Object.keys(input || {}).length > 1
}

/**
 * @description 创建重写规则
 * @param reg 正则表达式
 * @param page 页面配置
 * @param baseUrl 基础路径
 * @param proxyUrlKeys 代理路径
 */
function createRewire(
  reg: string,
  page: { filename: string; template: string },
  baseUrl: string,
  proxyUrlKeys: string[]
): { from: RegExp; to: string | ((context: any) => string) } {
  return {
    from: new RegExp(`^/${reg}*`),
    to({ parsedUrl }: any) {
      const pathname: string = parsedUrl.pathname

      const excludeBaseUrl = pathname.replace(baseUrl, '/')

      const template = path.join(baseUrl, page.template)

      if (excludeBaseUrl === '/') {
        return template
      }

      const isApiUrl = proxyUrlKeys.some(item => pathname.startsWith(path.join(baseUrl, item)))
      return isApiUrl ? excludeBaseUrl : template
    },
  }
}

/**
 * @description 获取页面
 * @param param 插件配置
 * @param name 文件名称
 * @param viteConfig vite 配置
 */
function getPage(
  { pages = [], entry, template = DEFAULT_TEMPLATE, inject = {} }: UserOptions,
  name: string,
  viteConfig: ResolvedConfig
) {
  let page: PageOption
  if (isMpa(viteConfig) || pages?.length) {
    page = getPageConfig(name, pages, DEFAULT_TEMPLATE)
  } else {
    page = createSpaPage(entry, template, inject)
  }
  return page
}

/**
 * @description 创建单页面应用页面
 * @param entry 入口文件
 * @param template 模版文件
 * @param inject 注入选项
 */
function createSpaPage(entry: string | undefined, template: string, inject: InjectOptions = {}): PageOption {
  return {
    entry,
    filename: 'index.html',
    template,
    injectOptions: inject,
  }
}

/**
 * @description 获取页面配置
 * @param htmlName html文件名称
 * @param pages 多页面配置
 * @param defaultPage 默认的页面
 */
function getPageConfig(htmlName: string, pages: Pages, defaultPage: string): PageOption {
  const defaultPageOption: PageOption = {
    filename: defaultPage,
    template: `./${defaultPage}`,
  }

  const page = pages.find(page => {
    return path.resolve('/' + page.template) === path.resolve('/' + htmlName)
  })

  return page ?? defaultPageOption ?? undefined
}

/**
 * @description 渲染html
 * @param {String} html html字符串
 * @param {Object} config 配置
 */
async function renderHtml(
  html: string,
  config: {
    injectOptions: InjectOptions
    viteConfig: ResolvedConfig
    entry?: string
    verbose?: boolean
  }
) {
  const { injectOptions, entry, verbose } = config
  const { data, ejsOptions } = injectOptions

  const esjData: Record<string, any> = {
    ...data,
  }

  let result = await render(html, esjData, ejsOptions)

  if (entry) {
    result = removeEntryScript(result, verbose)
    result = result.replace(bodyInjectRE, `<script type="module" src="${normalizePath(`${entry}`)}"></script>\n</body>`)
  }

  return result
}

function removeEntryScript(html: string, verbose = false) {
  if (!html) {
    return html
  }
  const root = parse(html)
  const scriptNodes = root.querySelectorAll('script[type=module]') || []
  const removedNode: string[] = []
  scriptNodes.forEach(item => {
    removedNode.push(item.toString())
    item.parentNode.removeChild(item)
  })

  verbose &&
    removedNode.length &&
    consola.warn(`vite-plugin-html: Since you have already configured entry, ${dim(
      removedNode.toString()
    )} is deleted. You may also delete it from the index.html.
        `)

  return root.toString()
}

async function isDirEmpty(dir: string) {
  return fs.readdir(dir).then(files => {
    return files.length === 0
  })
}
