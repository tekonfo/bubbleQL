import React, { useContext } from 'react'
import { BubbleRouting } from '../../../routing/routing'
import { updateRow } from '../../../services/bubbleService'
import { BubbleApplicationContext } from '../../../store/bubbleProjectContext'
import { BubbleTableSettingContext } from '../../../store/bubbleTableSettingContext'
import { IsRefreshBubbleTableContext } from '../../../store/refreshBubbleTableContext'

export const EditableCell = (props: any) => {
  const initialValue = props.value
  const cell = props.cell.row.values
  const columnName = props.column.id
  const rowIndex = props.row.index

  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const bubbleApplicationContext = useContext(BubbleApplicationContext)
  const bubbleTableSettingContext = useContext(BubbleTableSettingContext)
  const isRefreshBubbleTableContext = useContext(IsRefreshBubbleTableContext)
  const routing = new BubbleRouting(
    bubbleApplicationContext.bubbleApplicationContext,
    bubbleTableSettingContext.bubbleTableSettingContextTypes[
      bubbleTableSettingContext.index
    ],
  )

  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  // フォーカス外れた時に実行
  const onBlur = () => {
    // instanceの値自体は変更しないようにコピーする
    const copyCell: any = {}
    copyCell[columnName] = value
    updateRow(routing, cell._id, copyCell, () => {
      isRefreshBubbleTableContext.setIsRefreshBubbleTableContextType({
        isRefreshTable: true,
      })
    })
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
export const defaultColumn = {
  Cell: EditableCell,
}
