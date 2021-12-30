import { createContext } from 'react'
import { TableInstance } from 'react-table'
export type BubbleTableContextType = {
  table: TableInstance<object>
  setTable: React.Dispatch<React.SetStateAction<TableInstance<object>>>
}
export const BubbleTableContext = createContext({} as BubbleTableContextType)
