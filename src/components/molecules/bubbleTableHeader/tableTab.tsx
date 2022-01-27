import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { BubbleTableSettingContextType } from '../../../store/bubbleTableSettingContext'
export default function TableTab({
  table,
  isAllEdit = false,
  clickEvent,
}: {
  table: BubbleTableSettingContextType
  isAllEdit?: boolean
  clickEvent?: () => void
}) {
  const [isEdit, setIsEdit] = useState(false)

  const showTab = (
    <div key={table.tableName} onDoubleClick={() => setIsEdit(true)}>
      {table.tableName}
    </div>
  )

  const click = () => {
    setIsEdit(false)
    if (clickEvent) {
      clickEvent()
    }
  }

  const editTab = (
    <TextField
      id={table.tableName}
      defaultValue={table.tableName}
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
