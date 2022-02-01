import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import { useState } from 'react'
import {
  BubbleTableSettingContextType,
  BubbleTableSettingType,
} from '../../../store/bubbleTableSettingContext'
import TableTab from '../bubbleTableHeader/tableTab'
import BubbleTableHeaderTitle from '../bubbleTableHeader/title'
import FilterFieldsDialog from '../dialog/filterFieldsDialog'
import HideFields from '../tableHeader/hideFields'

export default function TableHeader({
  children,
  uid,
  appId,
  bubbleTableSettingType,
}: {
  children?: React.ReactNode
  uid: string
  appId: string
  bubbleTableSettingType: BubbleTableSettingType
}) {
  const tables = bubbleTableSettingType.bubbleTableSettingContextTypes

  const tableDivs = tables.map((x, index) => (
    <TableTab
      appId={appId}
      uid={uid}
      key={x.id}
      table={x.data}
      tableId={x.id}
      index={index}
      setIndex={bubbleTableSettingType.setIndex}
      isActive={index === bubbleTableSettingType.index}
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
        index={0}
        isActive={false}
        setIndex={() => {}}
      />
    )
  } else {
    addTable = (
      <div onClick={() => setIsNewTable(true)}>
        <AddIcon />
      </div>
    )
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
