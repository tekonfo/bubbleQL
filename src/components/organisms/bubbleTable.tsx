import { useContext } from 'react'
import { BubbleTableSettingContext } from '../../store/bubbleTableSettingContext'
import Table from '../molecules/table/table'
import TableHeader from '../molecules/table/tableHeader'
import TableSidebar from '../molecules/table/tableSidebar'

export default function BubbleTable() {
  // ここでテーブル一覧は取得しておく
  // moleculesにcontextは依存させないようにする
  const tableSettingContext = useContext(BubbleTableSettingContext)

  return (
    <div>
      <TableHeader
        tables={tableSettingContext.bubbleTableSettingContextTypes}
      />
      <div>
        <TableSidebar />
        <Table></Table>
      </div>
    </div>
  )
}
