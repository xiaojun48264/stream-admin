import type { Options as EJSOptions } from 'ejs'
import type { Options as MinifyOptions } from 'html-minifier-terser'
import type { HtmlTagDescriptor } from 'vite'

export type Entry = string | Record<string, string>

export interface InjectOptions {
  /**
   * @description 注入到html模板中的数据
   */
  data?: Record<string, any>

  tags?: HtmlTagDescriptor[]

  /**
   * @description esj选项配置
   */
  ejsOptions?: EJSOptions
}

export interface PageOption {
  filename: string
  template: string
  entry?: string
  injectOptions?: InjectOptions
}

export type Pages = PageOption[]

export interface UserOptions {
  /**
   * @description  pages选项
   */
  pages?: Pages
  /**
   * @description  是否压缩html/压缩选项
   */
  minify?: boolean | MinifyOptions
  /**
   * @description  入口文件
   */
  entry?: string
  /**
   * @description  模板文件路径
   */
  template?: string
  /**
   * @description  注入选项
   */
  inject?: InjectOptions
  /**
   * @description  输出警告日志
   */
  verbose?: boolean
}
