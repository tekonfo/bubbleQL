import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useContext } from 'react'
import { BubbleTableContext } from '../../..'

const emails = ['username@gmail.com', 'user02@gmail.com']

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
  const { table } = useContext(BubbleTableContext)
  const { getToggleHideAllColumnsProps, allColumns } = table
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <TextField></TextField>
      {allColumns.map(column => (
        <div key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
            {column.id}
          </label>
        </div>
      ))}
      <Button>Hide All</Button>
      <Button>Show All</Button>
    </Dialog>
  )
}
