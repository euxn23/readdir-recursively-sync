# readdir-recursively-sync
A simple, zero-dependecy readdir-recursively module.

## Usage
```
const { readdirRecursivelySync } = require('readdir-recursively-sync')
const files = readdirRecursivelySync('nested/dir/path/')
```

## Notes
- arg `option` is same to `fs.readdir`.
- supports Node.js 8.x+

## Licence
MIT
