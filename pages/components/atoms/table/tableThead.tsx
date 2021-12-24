import React, { useContext } from 'react'
import { BubbleTableContext } from '../../../store/bubbleTableContext'

export default function TableThead({
  children,
}: {
  children?: React.ReactNode
}) {
  const { table } = useContext(BubbleTableContext)

  const { headerGroups } = table
  return (
    <thead>
      {headerGroups.map(headerGroup => (
        // eslint-disable-next-line react/jsx-key
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            // eslint-disable-next-line react/jsx-key
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
        </tr>
      ))}
    </thead>
  )
}
