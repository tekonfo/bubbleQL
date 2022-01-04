import React from 'react'

export default function TableTr({ children }: { children?: React.ReactNode }) {
  return <Tr></Tr>
}

function Tr({ children }: { children?: React.ReactNode }) {
  return <tr>{children}</tr>
}
