import React from 'react'
import useSWR from 'swr'
import Routing from '../../../api/routing'
import TableTd from './tableTd'
import TableTr from './tableTr'

const fetcher = (...args: any[]) =>
  fetch(args[0], args[1]).then(res => res.json())

export default function TableTbody({
  children,
}: {
  children?: React.ReactNode
}) {
  const { data, error } = useSWR(Routing.bubbleBasic, fetcher)

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
