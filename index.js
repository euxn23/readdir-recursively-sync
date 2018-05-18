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
    .reduce(
      (prev, next) =>
        Array.isArray(next) ? [...prev, ...next] : [...prev, next],
      []
    )

module.exports.readdirRecursivelySync = readdirRecursivelySync
