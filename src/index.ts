import * as fs from 'fs'

type Options =
  | { encoding: BufferEncoding | null; withFileTypes?: false }
  | BufferEncoding
  | null

export const readdirRecursivelySync = (
  baseDir: string,
  options: Options = null
): Array<string | any[] | string> =>
  fs
    .readdirSync(baseDir, options)
    .map(
      path =>
        fs.statSync(`${baseDir}/${path}`).isDirectory()
          ? readdirRecursivelySync(`${baseDir}/${path}`, options)
          : `${baseDir}/${path}`
    )

export const flatten = (paths: Array<string | any[]> | string): string[] => {
  if (typeof paths === 'string') return [paths]
  const flattened = paths.reduce(
    (prev, next) =>
      Array.isArray(next) ? [...prev, ...next] : [...prev, next],
    <string | any>[]
  )
  return flattened.filter(Array.isArray).length > 0
    ? flatten(flattened)
    : flattened
}

export const readdirRecursivelySyncFlatten = (
  baseDir: string,
  options: Options = null
) => flatten(readdirRecursivelySync(baseDir, options))

export default readdirRecursivelySync
