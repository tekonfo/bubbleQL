import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Link from 'next/link'
import BubbleTableHeaderLoginButton from '../molecules/bubbleTableHeader/loginButton'
import BubbleTableHeaderTitle from '../molecules/bubbleTableHeader/title'

export default function Header() {
  return (
    <AppBar color="inherit" elevation={0} position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            BubbleQL
          </Typography>
        </Link>

        <BubbleTableHeaderLoginButton />
      </Toolbar>
    </AppBar>
  )
}
