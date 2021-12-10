import React from 'react'
import useSWR from 'swr'
import { BubbleRouting } from '../../../api/routing'
import TableTd from './tableTd'
import TableTr, { getKeys } from './tableTr'

export default function TableTbody({
  children,
}: {
  children?: React.ReactNode
}) {
  const routing = new BubbleRouting()
  const { data, error } = useSWR(routing.route(), routing.fetcher)

  if (error || !data) return <Tbody></Tbody>
  if (!routing.isBubbleBasicData(data)) return <Tbody></Tbody>

  const keys: Array<string> = getKeys(data.results)
  const trs = []
  let count = 0
  for (const res of data.results) {
    const td = keys.map(k => <TableTd key={k}>{res[k]}</TableTd>)
    const tr = <TableTr key={count++}>{td}</TableTr>
    trs.push(tr)
  }

  return <Tbody>{trs}</Tbody>
}

function Tbody({ children }: { children?: React.ReactNode }) {
  return <tbody>{children}</tbody>
}
