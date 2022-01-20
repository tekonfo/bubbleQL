開発ドキュメント
https://mica-yarn-3e9.notion.site/bubbleQL-3777f64de4ba4bb58720b9503f9f794f

## What is it?

This is a DB client tool that can handle [Bubble](https://bubble.io)'s DB in an [Airtable](https://airtable.com/) Like manner.

please access this url

[bubble-ql.vercel.app](http://bubble-ql.vercel.app)

## Document

### Figma

https://www.figma.com/file/P8tWlAeBI12GGXHet1Nq9l/BubbleQL?node-id=0%3A1

### Notion

## Getting Started

First, run the development server:

```bash
npm install
# or
yarn install
```

```bash
npm run dev
# or
yarn dev
```

## test

```
npm test
```

## Develop

### HTTP リクエストモジュールについて

API routes 内は Node 環境らしいので、got を利用する。

### SSG? SSR? SPA?

SSG にする？

- リアルタイムに更新が必要なコンテンツが無理っていうのは、API とかのデータ取得でも同様なのか？
  ちょっと実験してみないとわからない。
  ページ数は多くないので、SSG が向いているような気もする。
  が、レンダリングが無理なら、そもそも候補に入らない。

### Architecture

- Atmic Design を採用

### ロジックの書き方

- SWR を使って同一リクエストを違うページで行い、都度キャッシュさせる？
  - props のバケツリレーをしたくない。
    https://swr.vercel.app/ja/docs/getting-started
    これを見る限りそれで大丈夫そう

### HOW to find icon

https://react-icons.github.io/react-icons/icons

FYI ref : https://zenn.dev/taichifukumoto/articles/how-to-use-react-icons
