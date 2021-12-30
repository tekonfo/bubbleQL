import 'firebase/compat/auth'
import { CurrentUserType } from '../../pages/store/currentUserContext'
import { Firebase } from '../firebase'

export const auth = Firebase.auth()

export const Login = async () => {
  const provider = new Firebase.auth.GoogleAuthProvider()
  const result = await Firebase.auth()
    .signInWithPopup(provider)
    .catch(function (error: any) {
      console.log(error)
      const errorCode = error.code
      console.log(errorCode)
      const errorMessage = error.message
      console.log(errorMessage)
    })
  return result
}

// ログイン状態の検知
export const listenAuthState = (
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType>>,
) => {
  return Firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setCurrentUser(user)
    } else {
      setCurrentUser(null)
    }
  })
}

export const firebaseUser = () => {
  return Firebase.auth().currentUser
}

// Logout
export const Logout = () => {
  auth.signOut().then(() => {
    window.location.reload()
  })
}
