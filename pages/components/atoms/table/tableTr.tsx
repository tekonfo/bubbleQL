import React from 'react'
import useSWR from 'swr'
import TableTh from './tableTh'

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1]).then(res => res.json())

export default function TableTr({ children }: { children?: React.ReactNode }) {
  const { data, error } = useSWR('/api/bubble', fetcher)

  if (error) return <Tr></Tr>
  if (!data) return <Tr></Tr>

  // データをレンダリングする
  if (data.length == 0) return <Tr></Tr>
  // TODO: keyを全部の行のsetにする
  const keys: Array<string> = Object.keys(data[0])
  const th = keys.map(key => <TableTh key={key}>{key}</TableTh>)

  return <Tr>{th}</Tr>
}

function Tr({ children }: { children?: React.ReactNode }) {
  return <tr>{children}</tr>
}
