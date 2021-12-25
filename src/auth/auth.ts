import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export const auth = firebase.auth()
export const Firebase = firebase

export const Login = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  const result = await firebase
    .auth()
    .signInWithPopup(provider)
    .catch(function (error: any) {
      console.log(error)
      const errorCode = error.code
      console.log(errorCode)
      const errorMessage = error.message
      console.log(errorMessage)
    })
  console.log(result)
  return result
}

// ログイン状態の検知
export const listenAuthState = (dispatch: any) => {
  return firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      dispatch({
        type: 'login',
        payload: {
          user,
        },
      })
    } else {
      dispatch({
        type: 'logout',
      })
    }
  })
}

export const firebaseUser = () => {
  return firebase.auth().currentUser
}

// Logout
export const Logout = () => {
  auth.signOut().then(() => {
    window.location.reload()
  })
}
