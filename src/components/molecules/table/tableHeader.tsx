import Box from '@mui/material/Box'
import { BubbleTableSettingContextType } from '../../../store/bubbleTableSettingContext'
import BubbleTableHeaderTitle from '../bubbleTableHeader/title'
import FilterFieldsDialog from '../dialog/filterFieldsDialog'
import HideFields from '../tableHeader/hideFields'

export default function TableHeader({
  children,
  tables,
}: {
  children?: React.ReactNode
  tables: Array<BubbleTableSettingContextType>
}) {
  const tableDivs = tables.map(x => <div key={x.tableName}>{x.tableName}</div>)
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
