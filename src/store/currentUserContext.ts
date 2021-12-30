import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { createContext } from 'react'
export type CurrentUserType = firebase.User | null
// TODO:ここにsetCurrentUserのfunction追加したい
export type CurrentUserContextType = {
  currentUser: CurrentUserType
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType>>
}

// これの登録がない場合は、リダイレクトするとかしたい
export const CurrentUserContext = createContext({} as CurrentUserContextType)
