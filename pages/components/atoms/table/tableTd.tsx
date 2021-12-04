import React from 'react'

const TableTd = ({ children, value }: { children?: any; value?: string }) => {
  return <td key={value}>{value}</td>
}

export default TableTd
