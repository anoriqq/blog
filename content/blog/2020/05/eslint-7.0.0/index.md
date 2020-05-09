---
title: ESLint v7.0.0の変更点
date: '2020-05-08T22:49:59Z'
---

## ESLint v7.0.0 の新機能

個人的に関心があるものをピックアップします。

[リリースブログ](https://eslint.org/blog/2020/02/whats-coming-in-eslint-7.0.0)

### Node.js v8.X のサポート終了

> Prerequisites: Node.js (^10.12.0, or >=12.0.0) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)
>
> > [Installation and Usage](https://github.com/eslint/eslint/blob/v7.0.0/docs/user-guide/getting-started.md#installation-and-usage)

### Node.js/CommonJS 固有のルールをコアでは deprecated に

次のルールが非推奨になる。  
今後、これらのルールは[`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node)で管理される。  
一部ルール名が変わっているようだ。  
コアのルールは残るが将来のメジャーリリースで削除予定。

- [`callback-return`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/callback-return.md)
- [`global-require`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/global-require.md)
- [`handle-callback-err`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/handle-callback-err.md)
- `no-buffer-constructor`=>[`prefer-global/buffer`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/buffer.md)
- [`no-mixed-requires`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-mixed-requires.md)
- [`no-new-require`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-new-require.md)
- [`no-path-concat`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-path-concat.md)
- [`no-process-env`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-process-env.md)
- [`no-process-exit`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-process-exit.md)
- `no-restricted-modules` => [`no-restricted-require`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-restricted-require.md)

### directive comments に説明が残せるように

- [RFC - New: Description in directive comments](https://github.com/eslint/rfcs/pull/33)
- [Disabling Rules with Inline Comments](https://github.com/eslint/eslint/blob/v7.0.0/docs/user-guide/configuring.md#disabling-rules-with-inline-comments)

```ts
/* eslint-disable no-new -- this class has a side-effect in the constructor. */
```

### ~/.eslintrc の使用を警告する

- [RFC - Update: Deprecating Personal Config](https://github.com/eslint/rfcs/pull/32)

ホームディレクトリの`.eslintrc`は v6.7.0 で廃止されており、v7.0.0 から警告が表示されるようになる。  
v8.0.0 で削除される予定。

### --config/--ignore-path で指定したパスの基準パスが CWD に変更

- [RFC - New: Changing Base Path of `overrides` and `ignorePatterns](https://github.com/eslint/rfcs/pull/37)

今まではプロジェクトルートを基準にしていたためそれ以外のディレクトリから相対パスでファイルを指定して実行すると、ファイルを見つけられなかった。  
基準パスが CWD になるので自然な動作になる。  
今までのコマンドに修正が必要になる場合があるので注意。

### プラグイン読み込み元をリント対象ファイルに最も近い設定ファイルを基準に変更

- [RFC - New: Plugin Loading Improvement](https://github.com/eslint/rfcs/pull/39)
- [Configuring Plugins](https://github.com/eslint/eslint/blob/v7.0.0/docs/user-guide/configuring.md#configuring-plugins)

monorepo のような環境でも CWD によって構成が壊れることがなくなった。

### 対象ファイルの拡張子を.eslintrc で構成できるように

- [RFC - New: Configuring Additional Lint Targets with `.eslintrc`](https://github.com/eslint/rfcs/pull/20)
- [Specifying Target Files to Lint](https://github.com/eslint/eslint/blob/v7.0.0/docs/user-guide/configuring.md#specifying-target-files-to-lint)

> By default, ESLint lints \*.js files and the files that match the overrides entries of your configuration.
>
> > [Command Line Interface](https://github.com/eslint/eslint/blob/v7.0.0/docs/user-guide/command-line-interface.md#--ext)

今までは CLI で`eslint src docs --ext .js,.md,.html,.ts,.jsx,.tsx,.vue`のように指定しなければならなかった拡張子が`.eslintrc`で設定できるように。  
`--ext`オプションを使うと、`.eslintrc`の構成は無視される。

Example: 以下の構成だと今までの`--ext .ts,.tsx`と同等になる

```js
// .eslintrc
module.exports = {
  overrides: [
    {
      files: ['*.{ts,tsx}'],
    },
  ],
};
```

### デフォルトの ignore パターンを変更

- [RFC - New: Update Default Ignore Patterns](https://github.com/eslint/rfcs/pull/51)

以下のパターンを変更

- (as-is) `.*`
- (new) `!.eslintrc.js`
- (change) `/node_modules/*` → `/**/node_modules/*`
- (remove) ~~`/bower_components/*`~~

今まではサブディレクトリの`node_module`を ignore したいときは`.eslintignore`を構成する必要があったが、デフォルトで ignore されるように。

## 感想

少し使ったら書きます。  
今の印象はクセがなくなったようなイメージを持ちました。

間違い等は[Twitter](https://twitter.com/anoriqq)までお知らせください。

## References

- [What's coming in ESLint v7.0.0 - ESLint - Pluggable JavaScript linter](https://eslint.org/blog/2020/02/whats-coming-in-eslint-7.0.0)
- [ESLint 7.0.0 の開発が始まる - Qiita](https://qiita.com/mysticatea/items/1318dda062878eac86bb)
- [Comparing v6.8.0...v7.0.0 · eslint/eslint](https://github.com/eslint/eslint/compare/v6.8.0...v7.0.0)
