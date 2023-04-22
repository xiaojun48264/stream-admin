import type { PluginOption } from 'vite'
import { imagePlugin } from './vite/image'

export function configImagePlugin(): PluginOption {
  return imagePlugin()
}