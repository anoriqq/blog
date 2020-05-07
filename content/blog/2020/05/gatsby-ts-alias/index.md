---
title: TypeScriptでGatsby.jsを書くときにモジュールのaliasに関するtscとeslint ts/importのエラーを解決する方法
date: '2020-05-07T12:23:21Z'
description: 'TypeScriptでGatsby.jsを書くときにモジュールのaliasに関するtscと@typescript-eslint/importのエラーを解決する方法'
---

## やりたいこと

- Gatsby.js に TypeScript を使っていて、モジュールのインポートに alias を貼りたい

## 前提

```shell
❯ yarn --version
1.22.4

❯ yarn tsc --version
Version 3.8.3

❯ yarn gatsby --version
Gatsby CLI version: 2.12.12
Gatsby version: 2.21.17
```

## 課題

解決するエラーは 2 つ  
僕の環境でのエラーメッセージを添えて

- ESLint 由来

```text
Unable to resolve path to module '@typings/graphql-types'.
```

- TSC 由来

```text
Cannot find module '@typings/graphql-types'`.
```

## 結論

### ESLint 由来のエラー

`tsconfig.json`に下記設定を追加

```json
// tsconfig.json
{
  "paths": {
    "@typings/*": ["@types/*"]
  }
}
```

### TSC 由来のエラー

`eslint-import-resolver-typescript`をインストールして`.eslintrc.js`に下記設定を追加

```shell
❯ yarn add -D eslint-import-resolver-typescript
```

```js
// .eslintrc.js
module.exports = {
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
```

## 読まなくて良いところ

やったことまとめておく  
全部だめだった

- `gatsby-node.js`に追加の Webpack 設定
  - [Adding a Custom Webpack Config | GatsbyJS](https://www.gatsbyjs.org/docs/add-custom-webpack-config/)

```js
// gatsby-node.js
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@typings': path.resolve(__dirname, '@types/'),
      },
    },
  });
};
```

- [`eslint-import-resolver-alias`](https://github.com/johvin/eslint-import-resolver-alias)
  - [How to set up import aliases for Gatsby.js | mrozilla](https://www.mrozilla.cz/blog/gatsby-eslint-vscode-import-alias/)

```shell
❯ yarn add -D eslint-import-resolver-alias
```

```js
// .eslintrc.js
module.exports = {
  settings: {
    'import/resolver': {
      alias: [['@typings', '@types']],
    },
  },
};
```

- [`eslint-import-resolver-webpack`](https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers/webpack)

```shell
❯ yarn add -D eslint-import-resolver-webpack
```

```js
// .eslintrc.js
module.exports = {
  settings: {
    'import/resolver': {
      webpack: {},
    },
  },
};
```

- [`gatsby-plugin-root-import`](https://github.com/mongkuen/gatsby-plugin-root-import)

```shell
❯ yarn add -D gatsby-plugin-root-import
```

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
      },
    },
  ],
};
```
