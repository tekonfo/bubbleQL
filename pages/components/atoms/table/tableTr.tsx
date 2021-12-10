import React from 'react'
import useSWR from 'swr'
import { BubbleRouting } from '../../../api/routing'
import TableTh from './tableTh'

export default function TableTr({ children }: { children?: React.ReactNode }) {
  const routing = new BubbleRouting()
  const { data, error } = useSWR(routing.route(), routing.fetcher)

  if (error || !data) return <Tr></Tr>
  if (!routing.isBubbleBasicData(data)) return <Tr></Tr>

  const keys = getKeys(data.results)
  const th = keys.map(key => <TableTh key={key}>{key}</TableTh>)

  return <Tr>{th}</Tr>
}

function Tr({ children }: { children?: React.ReactNode }) {
  return <tr>{children}</tr>
}

// TODO: ここはホントはロジックなので、外部ファイルに切り出したい
export function getKeys(lists: Array<object>): Array<string> {
  if (lists.length == 0) return []
  // TODO: keyを全部の行のsetにする
  const keys: Array<string> = Object.keys(lists[0])
  return keys
}
