import Box from '@mui/material/Box'
import { useState } from 'react'
import { BubbleTableSettingContextType } from '../../../store/bubbleTableSettingContext'
import TableTab from '../bubbleTableHeader/tableTab'
import BubbleTableHeaderTitle from '../bubbleTableHeader/title'
import FilterFieldsDialog from '../dialog/filterFieldsDialog'
import HideFields from '../tableHeader/hideFields'

export default function TableHeader({
  children,
  uid,
  appId,
  tables,
}: {
  children?: React.ReactNode
  uid: string
  appId: string
  tables: Array<BubbleTableSettingContextType>
}) {
  const tableDivs = tables.map(x => (
    <TableTab
      appId={appId}
      uid={uid}
      key={x.id}
      table={x.data}
      tableId={x.id}
    />
  ))

  const [isNewTable, setIsNewTable] = useState(false)
  let addTable
  if (isNewTable) {
    addTable = (
      <TableTab
        table={{ tableName: '' }}
        isAllEdit={true}
        clickEvent={() => {
          setIsNewTable(false)
        }}
        appId={appId}
        uid={uid}
      />
    )
  } else {
    addTable = <div onClick={() => setIsNewTable(true)}>add table</div>
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
        }}
      >
        <BubbleTableHeaderTitle />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
        }}
      >
        {tableDivs}
        {addTable}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
        }}
      >
        <div>VIEWS</div>
        <div>Grid View</div>
        <HideFields />
        <FilterFieldsDialog />
        <div>Group</div>
        <div>Sort</div>
        <div>Color</div>
        <div>Sort</div>
        <div>Row height</div>
        <div>Share view</div>
      </Box>
    </>
  )
}
