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

## Develop

### Architecture

- Atmic Design を採用

### ロジックの書き方

- SWR を使って同一リクエストを違うページで行い、都度キャッシュさせる？
  - props のバケツリレーをしたくない。
    https://swr.vercel.app/ja/docs/getting-started
    これを見る限りそれで大丈夫そう

### HOW to find icon

https://react-icons.github.io/react-icons
FYI ref : https://zenn.dev/taichifukumoto/articles/how-to-use-react-icons
