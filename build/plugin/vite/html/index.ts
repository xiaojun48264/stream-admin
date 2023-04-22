import type { PluginOption } from "vite";
import type { UserOptions } from "./type";
import { createPlugin } from "./htmlPlugin";
import { createMinifyHtmlPlugin } from "./minifyHtml";
import consola from "consola";

consola.wrapConsole()

export function createHtmlPlugin(userOptions: UserOptions): PluginOption[] {
    return [createPlugin(userOptions), createMinifyHtmlPlugin(userOptions)];
}