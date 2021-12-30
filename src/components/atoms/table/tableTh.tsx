import React from 'react'

const TableTh = ({ children, value }: { children?: any; value?: string }) => {
  return <th key={value}>{value}</th>
}

export default TableTh
