import { Button } from '@mui/material'
import { Login } from '../../../src/auth/auth'

export default function Header() {
  return (
    <div>
      <Button onClick={Login}>Google認証</Button>
    </div>
  )
}
