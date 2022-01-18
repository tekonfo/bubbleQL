import { DataGrid } from '@mui/x-data-grid'
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
      const arr = d.map((x, index) => ({
        id: index,
        name: x.appName,
      }))
      setData(arr)
      console.log(data)
    })
  }, [currentUser])

  return (
    <>
      <DataGrid columns={[{ field: 'name' }]} rows={data} autoHeight />
    </>
  )
}
