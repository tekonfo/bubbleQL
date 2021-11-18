// ReactDOM.createPortal()の第一引数に指定するコンポーネントです。
// Atomic Designのpages層に相当しますが、ただtemplatesを呼び出すだけのwrapperとなっています。
import useSWR from 'swr'
import Footer from '../organisms/footer'
import MetaHead from '../organisms/head'
import Header from '../organisms/header'

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1]).then(res => res.json())

export default function DetailTable() {
  return (
    <div>
      <MetaHead />

      <Header />

      <main>
        <Bubble />
      </main>

      <Footer />
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
