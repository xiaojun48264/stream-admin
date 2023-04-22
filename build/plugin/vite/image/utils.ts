const toString = Object.prototype.toString

function is(value: unknown, type: string): boolean {
  return toString.call(value) === `[object ${type}]`
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return is(value, 'Function')
}

export function isRegExp(value: unknown): value is RegExp {
  return is(value, 'RegExp')
}
