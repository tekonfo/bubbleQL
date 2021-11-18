import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1]).then(res => res.json())

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BubbleQL</title>
        <meta
          name="description"
          content="This is a db client of Bubble like Airtable"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Bubble />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

function createTable(results: any) {
  if (results.length == 0) return <div>no records</div>
  // TODO: keyを全部の行のsetにする
  const keys: Array<string> = Object.keys(results[0])
  const th = keys.map(key => <th key={key}>{key}</th>)

  const trs = []
  for (const res of results) {
    const td = keys.map(k => <td key={k}>{res[k]}</td>)
    const tr = <tr>{td}</tr>
    trs.push(tr)
  }

  return (
    <table>
      <thead>
        <tr>{th}</tr>
      </thead>
      <tbody>{trs}</tbody>
    </table>
  )
}

function Bubble() {
  const { data, error } = useSWR('/api/bubble', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // データをレンダリングする
  return createTable(data.results)
}

export default Home
