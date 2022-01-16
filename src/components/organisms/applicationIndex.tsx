import { useCollection } from '@nandorojo/swr-firestore'
import { useEffect, useState } from 'react'
import { listenAuthState } from '../../auth/auth'
import { getBubbleApplications } from '../../repository/model/bubbleApplication'
import { BubbleApplicationType } from '../../store/bubbleProjectContext'
import { CurrentUserType } from '../../store/currentUserContext'

export default function ApplicationIndex() {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)
  listenAuthState(setCurrentUser)

  const { data, error } = useCollection<BubbleApplicationType>(
    `User/O3w71bkSiqbmbsHJGdVqvr6m3Sf2/Application`,
  )

  if (error) return <div>Error!</div>
  if (!data) return <div>Loading...</div>

  return <>div</>
}
