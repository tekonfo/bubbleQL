import React from 'react'

export const EditableCell = (props: any) => {
  const initialValue = props.value
  const index = props.row.index
  const id = props.column.id
  const updateMyData = props.updateMyData

  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  // フォーカス外れた時に実行
  const onBlur = () => {
    updateMyData(index, id, value)
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
