import { useContext } from 'react'
import { BubbleApplicationContext } from '../../store/bubbleProjectContext'
import { BubbleTableSettingContext } from '../../store/bubbleTableSettingContext'
import { CurrentUserContext } from '../../store/currentUserContext'
import Table from '../molecules/table/table'
import TableHeader from '../molecules/table/tableHeader'
import TableSidebar from '../molecules/table/tableSidebar'

export default function BubbleTable() {
  // ここでテーブル一覧は取得しておく
  // moleculesにcontextは依存させないようにする
  const tableSettingContext = useContext(BubbleTableSettingContext)
  const currentUser = useContext(CurrentUserContext)
  const app = useContext(BubbleApplicationContext)

  if (!currentUser.currentUser) {
    return <div>認証が済んでいません</div>
  }

  return (
    <div>
      <TableHeader
        uid={currentUser.currentUser.uid}
        appId={app.appId}
        tables={tableSettingContext.bubbleTableSettingContextTypes}
      />
      <div>
        <TableSidebar />
        <Table></Table>
      </div>
    </div>
  )
}
