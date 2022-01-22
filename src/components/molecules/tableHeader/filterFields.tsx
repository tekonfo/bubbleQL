import { ConstructionOutlined } from '@mui/icons-material'
import { Box, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'

export default function FilterFields() {
  const [rows, setRow] = useState([{}] as Array<any>)
  const onDelete = (index: number) => {
    const newRow = rows
    newRow.splice(index, 1)
    setRow([...newRow])
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack>
        <div>In this view, show records</div>
        {rows.map((x, index) => (
          <FilterRow key={index} onDelete={onDelete} index={index} />
        ))}
        <Stack direction="row">
          <Button
            onClick={() => {
              setRow([...rows, {}])
            }}
          >
            +Add condition
          </Button>
          <Button>+Add condition group</Button>
        </Stack>
      </Stack>
    </Box>
  )
}

const FilterRow = (props: {
  index: number
  onDelete: (index: number) => void
}) => {
  return (
    <Stack direction="row">
      <div>{props.index}</div>
      <Button
        onClick={() => {
          props.onDelete(props.index)
        }}
      >
        Delete
      </Button>
    </Stack>
  )
}
