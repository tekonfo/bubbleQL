import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import BubbleTableHeaderLoginButton from '../molecules/bubbleTableHeader/loginButton'
import BubbleTableHeaderTitle from '../molecules/bubbleTableHeader/title'

export default function Header() {
  return (
    <AppBar color="inherit" elevation={0} position="static">
      <Toolbar>
        <BubbleTableHeaderTitle />
        <BubbleTableHeaderLoginButton />
      </Toolbar>
    </AppBar>
  )
}
