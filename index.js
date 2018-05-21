const fs = require('fs')

const readdirRecursivelySync = (baseDir, options = {}) =>
  fs
    .readdirSync(baseDir, options)
    .map(
      path =>
        fs.statSync(`${baseDir}/${path}`).isDirectory()
          ? readdirRecursivelySync(`${baseDir}/${path}`, options)
          : `${baseDir}/${path}`
    )

module.exports = readdirRecursivelySync
module.exports.readdirRecursivelySync = readdirRecursivelySync

const flatten = paths => {
  const flattened = paths.reduce(
    (prev, next) =>
      Array.isArray(next) ? [...prev, ...next] : [...prev, next],
    []
  )
  return flattened.filter(Array.isArray).length > 0
    ? flatten(flattened)
    : flattened
}

module.exports.flatten = flatten

const readdirRecursivelySyncFlatten = (baseDir, options = {}) =>
  flatten(readdirRecursivelySync(baseDir, options))

module.exports.readdirRecursivelySyncFlatten = readdirRecursivelySyncFlatten
