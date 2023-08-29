# sourcemapcmd

[![CI](https://github.com/anttiviljami/sourcemapcmd/workflows/CI/badge.svg)](https://github.com/anttiviljami/sourcemapcmd/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/sourcemapcmd.svg)](https://www.npmjs.com/package/sourcemapcmd)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/sourcemapcmd/blob/master/LICENSE)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

Command line tool to resolve source file references with source maps

Usage:

```sh
npx sourcemapcmd <bundleURL> <line>:<column> [--verbose]

Options:
      --version  Show version number                                   [boolean]
  -v, --verbose  Verbose mode                                          [boolean]
  -h, --help     Show help                                             [boolean]
```

## Example

```
$ npx sourcemapcmd https://portal.epilot.cloud/patch-2023-08-25-file-preview-proxy/epilot360-entity/bundle.js?version=1692995278 2059:1595
{
  "source": "webpack://entity/src/components/entity-details/index.tsx",
  "line": 159,
  "column": 10,
  "name": "setEntityState"
}
```
