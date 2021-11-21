import React from 'react'
import useSWR from 'swr'
import TableTd from './tableTd'
import TableTh from './tableTh'
import TableTr from './tableTr'

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1]).then(res => res.json())

export default function TableTbody({
  children,
}: {
  children?: React.ReactNode
}) {
  const { data, error } = useSWR('/api/bubble', fetcher)

  if (error) return <Tbody></Tbody>
  if (!data) return <Tbody></Tbody>

  // データをレンダリングする
  if (data.length == 0) return <Tbody></Tbody>
  const keys: Array<string> = Object.keys(data[0])
  const trs = []
  for (const res of data) {
    const td = keys.map(k => <TableTd key={k}>{res[k]}</TableTd>)
    const tr = <TableTr>{td}</TableTr>
    trs.push(tr)
  }

  return <Tbody>{children}</Tbody>
}

function Tbody({ children }: { children?: React.ReactNode }) {
  return <tbody>{children}</tbody>
}
