import Table from '../molecules/table/table'
import TableHeader from '../molecules/table/tableHeader'
import TableSidebar from '../molecules/table/tableSidebar'

export default function BubbleTable() {
  return (
    <div>
      <TableHeader />
      <div>
        <TableSidebar />
        <Table></Table>
      </div>
    </div>
  )
}
