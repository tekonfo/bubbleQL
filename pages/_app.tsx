import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import {
  CurrentUserContext,
  CurrentUserType,
} from '../src/store/currentUserContext'

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)
  const currentUserContextValue = {
    currentUser,
    setCurrentUser,
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <Component {...pageProps} />
      </CurrentUserContext.Provider>
    </>
  )
}
export default MyApp
