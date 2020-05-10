---
title: Gatsby.jsのソースコードを読む
date: '2020-05-09T22:58:10Z'
---

## Gatsby.js にコントリビュートしたい

最近の僕は GitHub 駆動人生を生きているので、好きなプロジェクトに参加したい欲が溢れてる。  
今回の目標は Gatsby.js。  
TypeScript Migration の Issue が Help Wanted で ts 移行は経験があるのでこれをやる。

### Contributing guidelines を読む

初めて参加するプロジェクトなので、ガイドをよく読む。  
[`CONTRIBUTING.md`](https://github.com/gatsbyjs/gatsby/blob/master/CONTRIBUTING.md)
も
[`README.md`](https://github.com/gatsbyjs/gatsby/blob/master/README.md#-how-to-contribute)
も
公式サイトの[Contributing Guide](https://gatsbyjs.org/contributing/how-to-contribute/)
に誘導される。  
公式サイトの内容はしっかりしているので全部読んだら勉強になると思った。  
今回必要になりそうなことは、

- 質問は Discord か Twitter で投げてね
- [Setting Up Your Local Dev Environment](https://www.gatsbyjs.org/contributing/setting-up-your-local-dev-environment/)
  - `Node`と`Yarn`を入れてね
  - Fork して Clone して topic branch 切ってね
    - `yarn run bootstrap`でセットアップしてくれるよ
  - [Gatsby functional changes](https://www.gatsbyjs.org/contributing/setting-up-your-local-dev-environment/#gatsby-functional-changes)
    - `gatsby-cli`と`gatsby-dev-cli`をインストールしてね
      - `gatsby-dev-cli`の使い方は[gatsby-dev-cli#readme](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-dev-cli#readme)を見てね
  - [Add tests](https://www.gatsbyjs.org/contributing/setting-up-your-local-dev-environment/#add-tests)
    - 変更のテストを追加してね
    - テストは`yarn test`または`yarn jest <package-name>`/`yarn jest <file-path>`で実行できるよ
  - [Commits and pull requests](https://www.gatsbyjs.org/contributing/setting-up-your-local-dev-environment/#commits-and-pull-requests)
    - commit して fork に push して branch を upstream に向けて PR 開いてね
    - 詳しい PR の開き方は[Opening PRs in Gatsby](https://www.gatsbyjs.org/contributing/how-to-open-a-pull-request/#opening-prs-in-gatsby)

ガイドに従って環境構築まではやった。  
Clone と bootstrap にそこそこに時間かかる。

このポストの内容終わり。

### コードを読む（ここからメモなので読まなくて良いところ）

僕にとっては本題だけど、読む人にとっては多分どうでも良いところ。

monorepo なので`/packages`以下のディレクトリがパッケージとして配信される  
とりあえず`gatsby`から  
まず`gatsby/package.json`読む  
`bin`は`"gatsby": "./dist/bin/gatsby.js"`。これがコマンド  
`files`にあるやつが配信されるパッケージに含まれるファイルたち  
`main`は`gatsby/cache-dir/commonjs/gatsby-browser-entry.js`。gitignore されてるので build されたやつ  
`scripts`に`"build:cjs": "babel cache-dir --out-dir cache-dir/commonjs --ignore \"**/__tests__\"",`ってある。  
つまり`packages/gatsby/cache-dir/gatsby-browser-entry.js`が main のコードベース

次に`bin`のファイル読む  
`packages/gatsby-cli/lib/index.js`を require してる  
`gatsby`本体は`gatsby-cli`に依存してるのか

先に`gatsby-cli`読もう  
`gatsby-cli/package.json`読む  
`bin`は`./lib/index.js`。
複数のパッケージに同じ名前の`bin`が設定されていたらどうやって動くんだろう。  
`gatsby`と`gatsby-cli`は同じファイルを指定してるからどっちを実行しても`gatsby-cli`が動くのか。なるほど  
`gatsby-cli`の`files`読んだ  
`main`は`lib/index.js`で`build`スクリプトで build してる  
つまり`packages/gatsby-cli/src/index.ts`が`gatsby`コマンドで 1 番最初に実行されるコードベース

ここからコード読むので手書きに移行  
1 番左のファイルが`packages/gatsby-cli/src/index.ts`

![手書きメモ](./gatsby-ts-pr.png)

見た感じいけそうだったのでコメントしてきた。  
選んだのは`gatsby-cli/src/reporter/loggers/ipc/index.js`  
順番に読んでいって、最初にぶつかった未コンバートのファイルだったから。

> > [[Umbrella] TypeScript Migration (Help wanted!)](https://github.com/gatsbyjs/gatsby/issues/21995#issuecomment-626261017)

できたので PR 開いてきた

> > [chore(gatsby-cli): migrate loggers/ipc to typescript](https://github.com/gatsbyjs/gatsby/pull/23960)

悩んだところ

- `types.ts`はどんな基準で作ってるのだろうか
- 他のディレクトリの`types.ts`から型を持ってきても良いのだろうか
  - 結局今回は`type.ts`は新規作成なかったし、他のディレクトリから型引っ張ってきた
- union 型を分離して処理する方法
  - `is`keyword を初めて知った
  - Type Guard の復習になった
- いくつか初見のパッケージを知った
  - strip-ansi
  - signal-exit
  - semver
  - ink
- 範囲外の定義済みの型を変えてよいのか迷った

### レビューしてもらう

まだ
