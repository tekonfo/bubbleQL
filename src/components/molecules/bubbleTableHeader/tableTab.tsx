import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { InputAdornment, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import {
  deleteBubbleTableSetting,
  upsertBubbleTableSetting,
} from '../../../repository/model/bubbleTableSetting'
import { BubbleTableSettingEntity } from '../../../store/bubbleTableSettingContext'

const CustomButton = styled(Button)({
  '&:hover': {
    background: 'red',
  },
})

export default function TableTab({
  uid,
  appId,
  table,
  tableId,
  isAllEdit = false,
  clickEvent,
  index,
  setIndex,
  isActive,
}: {
  uid: string
  appId: string
  table: BubbleTableSettingEntity
  tableId?: string
  isAllEdit?: boolean
  clickEvent?: () => void
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
  isActive: boolean
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [tableName, setTableName] = useState(table.tableName ?? '')
  if (!table) {
    return <div>loading</div>
  }

  const showTab = (
    <Button
      key={table.tableName}
      onClick={() => {
        setIndex(index)
      }}
      onDoubleClick={() => setIsEdit(true)}
      color={isActive ? 'primary' : 'secondary'}
      startIcon={
        isActive ? (
          <CustomButton variant="contained">
            {
              <DeleteIcon
                onClick={() => {
                  if (!tableId) {
                    return
                  }

                  deleteBubbleTableSetting(uid, appId, tableId)
                  setIsEdit(false)
                  if (clickEvent) {
                    clickEvent()
                  }
                }}
              />
            }
          </CustomButton>
        ) : (
          <div />
        )
      }
    >
      {table.tableName}
    </Button>
  )

  const click = () => {
    // tableNameが空もしくは初期値と一致している場合は更新しない
    if (tableName !== '' && table.tableName !== tableName) {
      console.log(table.tableName, tableName)
      upsertBubbleTableSetting(uid, appId, { tableName }, tableId)
    }

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
