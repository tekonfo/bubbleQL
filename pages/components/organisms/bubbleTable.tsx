import useSWR from 'swr'
import Table from '../molecules/table/table'
import TableTbody from '../molecules/table/tableTbody'
import TableTd from '../molecules/table/tableTd'
import TableTh from '../molecules/table/tableTh'
import TableThead from '../molecules/table/tableThead'
import TableTr from '../molecules/table/tableTr'

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1]).then(res => res.json())

export default function BubbleTable() {
  const { data, error } = useSWR('/api/bubble', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // データをレンダリングする
  if (data.length == 0) return <div>no records</div>
  // TODO: keyを全部の行のsetにする
  const keys: Array<string> = Object.keys(data[0])
  const th = keys.map(key => <TableTh key={key}>{key}</TableTh>)

  const trs = []
  for (const res of data) {
    const td = keys.map(k => <TableTd key={k}>{res[k]}</TableTd>)
    const tr = <TableTr>{td}</TableTr>
    trs.push(tr)
  }

  return (
    <Table>
      <TableThead>
        <TableTr>{th}</TableTr>
      </TableThead>
      <TableTbody>{trs}</TableTbody>
    </Table>
  )
}
