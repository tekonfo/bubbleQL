import { Button } from '@mui/material'
import { useContext } from 'react'
import { Logout, Login } from '../../../auth/auth'
import { CurrentUserContext } from '../../../store/currentUserContext'

export default function BubbleTableHeaderLoginButton() {
  const currentUserContext = useContext(CurrentUserContext)
  return currentUserContext ? (
    <Button onClick={Logout}>ログアウト</Button>
  ) : (
    <Button onClick={Login}>Google認証</Button>
  )
}
