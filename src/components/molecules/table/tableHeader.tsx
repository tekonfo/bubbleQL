import Box from '@mui/material/Box'
import BubbleTableHeaderTitle from '../bubbleTableHeader/title'
import FilterFieldsDialog from '../dialog/filterFieldsDialog'
import HideFields from '../tableHeader/hideFields'

export default function TableHeader({
  children,
}: {
  children?: React.ReactNode
}) {
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
