import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { createContext } from 'react'

// TODO:ここにsetCurrentUserのfunction追加したい
export type CurrentUserContextType = firebase.User | null

// これの登録がない場合は、リダイレクトするとかしたい
export const CurrentUserContext = createContext({} as CurrentUserContextType)
