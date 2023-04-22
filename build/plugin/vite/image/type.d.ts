export interface VitePluginImageMin {
  verbose?: boolean
  filter?: RegExp | ((path: string) => boolean)
}
