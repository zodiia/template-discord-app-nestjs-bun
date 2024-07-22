export function isDefined<T>(it: T | null | undefined | void): it is T {
  return it !== undefined && it !== null
}
