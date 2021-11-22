import React from 'react'
import useSWR from 'swr'
import { BubbleRouting } from '../../../api/routing'
import TableTd from './tableTd'
import TableTr from './tableTr'

export default function TableTbody({
  children,
}: {
  children?: React.ReactNode
}) {
  const routing = new BubbleRouting()
  const { data, error } = useSWR(routing.route(), routing.fetcher)

  if (error || !data || data.results.length == 0) return <Tbody></Tbody>
  const results = data.results

  const keys: Array<string> = Object.keys(results[0])
  const trs = []
  for (const res of results) {
    const td = keys.map(k => <TableTd key={k}>{res[k]}</TableTd>)
    const tr = <TableTr>{td}</TableTr>
    trs.push(tr)
  }

  return <Tbody>{trs}</Tbody>
}

function Tbody({ children }: { children?: React.ReactNode }) {
  return <tbody>{children}</tbody>
}
