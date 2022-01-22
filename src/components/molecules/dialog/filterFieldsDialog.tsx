import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import React from 'react'
import FilterFields from '../tableHeader/filterFields'

export default function FilterFieldsDialog({
  children,
}: {
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
  }

  return (
    <div className="flex-auto">
      <Button onClick={handleClickOpen}>Filter Fields</Button>
      <FilterDialog open={open} onClose={handleClose} />
    </div>
  )
}

export interface FilterDialogProps {
  open: boolean
  onClose: (value: string) => void
}

function FilterDialog(props: FilterDialogProps) {
  const { onClose, open } = props
  return (
    <Dialog onClose={() => onClose('')} open={open}>
      <FilterFields />
    </Dialog>
  )
}
