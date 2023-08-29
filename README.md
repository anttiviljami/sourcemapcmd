# resolve-sourcemap

CLI tool to resolve unminified references with source maps

Usage:

```sh
npx resolve-sourcemap <bundleURL> <line>:<column>
```

## Example

```
$ npx resolve-sourcemap https://portal.epilot.cloud/patch-2023-08-25-file-preview-proxy/epilot360-entity/bundle.js?version=1692995278 2059:1595
{
  "source": "webpack://entity/src/components/entity-details/index.tsx",
  "line": 159,
  "column": 10,
  "name": "setEntityState"
}
```