import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useContext, useState } from 'react'
import { BubbleTableContext } from '../../../../src/store/bubbleTableContext'

const emails = ['username@gmail.com']

export default function HideFields({
  children,
}: {
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(emails[1])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <div className="flex-auto">
      <Button onClick={handleClickOpen}>Hide Fields</Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  )
}

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

function SimpleDialog(props: SimpleDialogProps) {
  const [columnNameText, setColumnNameText] = useState('')

  const { table } = useContext(BubbleTableContext)
  const { getToggleHideAllColumnsProps, allColumns } = table
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleInputChange = (e: any) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setColumnNameText(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <TextField onChange={handleInputChange} />
      <div>
        <input type="checkbox" {...getToggleHideAllColumnsProps()} />
        Toggl All
      </div>
      {allColumns
        .filter(col =>
          columnNameText == '' ? true : col.id.match(columnNameText),
        )
        .map(column => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
    </Dialog>
  )
}
