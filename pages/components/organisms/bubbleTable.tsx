import useSWR from 'swr'
import Table from '../molecules/table/table'
import TableHeader from '../molecules/table/tableHeader'
import TableSidebar from '../molecules/table/tableSidebar'

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1]).then(res => res.json())

export default function BubbleTable() {
  const { data, error } = useSWR('/api/bubble', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // データをレンダリングする
  if (data.length == 0) return <div>no records</div>

  const trs = []
  for (const res of data) {
    const td = keys.map(k => <TableTd key={k}>{res[k]}</TableTd>)
    const tr = <TableTr>{td}</TableTr>
    trs.push(tr)
  }

  return (
    <div>
      <TableHeader />
      <div>
        <TableSidebar />
        <Table></Table>
      </div>
    </div>
  )
}
