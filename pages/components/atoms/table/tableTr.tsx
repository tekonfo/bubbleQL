import React from 'react'
import useSWR from 'swr'
import { BubbleRouting } from '../../../api/routing'
import TableTh from './tableTh'

export default function TableTr({ children }: { children?: React.ReactNode }) {
  const routing = new BubbleRouting()
  // ここのdataがany担っているの良くない
  const { data, error } = useSWR(routing.route(), routing.fetcher)

  if (error || !data || data.results.length == 0) return <Tr></Tr>
  const results = data.results

  // TODO: keyを全部の行のsetにする
  const keys: Array<string> = Object.keys(results[0])
  const th = keys.map(key => <TableTh key={key}>{key}</TableTh>)

  return <Tr>{th}</Tr>
}

function Tr({ children }: { children?: React.ReactNode }) {
  return <tr>{children}</tr>
}
