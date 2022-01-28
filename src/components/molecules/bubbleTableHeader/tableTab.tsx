import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { upsertBubbleTableSetting } from '../../../repository/model/bubbleTableSetting'
import { BubbleTableSettingContextType } from '../../../store/bubbleTableSettingContext'
export default function TableTab({
  uid,
  appId,
  table,
  tableId,
  isAllEdit = false,
  clickEvent,
}: {
  uid: string
  appId: string
  table: BubbleTableSettingContextType
  tableId?: string
  isAllEdit?: boolean
  clickEvent?: () => void
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [tableName, setTableName] = useState(table.tableName)

  const showTab = (
    <div key={table.tableName} onDoubleClick={() => setIsEdit(true)}>
      {table.tableName}
    </div>
  )

  const click = () => {
    upsertBubbleTableSetting(uid, appId, { tableName }, tableId)

    setIsEdit(false)
    if (clickEvent) {
      clickEvent()
    }
  }

  const editTab = (
    <TextField
      id={table.tableName}
      defaultValue={tableName}
      onChange={x => {
        setTableName(x.target.value)
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CheckCircleIcon onClick={click} />
          </InputAdornment>
        ),
      }}
    />
  )

  if (isAllEdit || isEdit) {
    return editTab
  } else {
    return showTab
  }
}
