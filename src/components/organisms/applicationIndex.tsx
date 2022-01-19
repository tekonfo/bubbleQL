import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { listenAuthState } from '../../auth/auth'
import { getBubbleApplications } from '../../repository/model/bubbleApplication'
import { BubbleApplicationType } from '../../store/bubbleProjectContext'
import { CurrentUserType } from '../../store/currentUserContext'

export default function ApplicationIndex() {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)
  listenAuthState(setCurrentUser)

  const [data, setData] = useState([] as Array<any>)

  useEffect(() => {
    if (!currentUser) {
      return
    }
    getBubbleApplications(currentUser.uid).then(d => {
      const arr: Array<any> = []
      d.forEach(x => {
        arr.push({
          id: x.id,
          name: x.data().appName,
        })
      })
      setData(arr)
    })
  }, [currentUser])

  const lists = data.map(x => (
    <Link key={x.id} href={'/application/' + x.id} passHref>
      <ListItem>
        <ListItemButton>
          <ListItemText primary={x.name} />
        </ListItemButton>
      </ListItem>
    </Link>
  ))

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <List>{lists}</List>
      </Box>
    </>
  )
}
