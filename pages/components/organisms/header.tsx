import { Button } from '@mui/material'
import { useContext } from 'react'
import { Login, Logout } from '../../../src/auth/auth'
import { CurrentUserContext } from '../../store/currentUserContext'

export default function Header() {
  const currentUserContext = useContext(CurrentUserContext)
  const button = currentUserContext ? (
    <Button onClick={Logout}>ログアウト</Button>
  ) : (
    <Button onClick={Login}>Google認証</Button>
  )

  return <div>{button}</div>
}
