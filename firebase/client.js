import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAe0NLMbo-rUJsB-McFB1p9gMLDOvXarbM',
  authDomain: 'terclone.firebaseapp.com',
  projectId: 'terclone',
  storageBucket: 'terclone.appspot.com',
  messagingSenderId: '840412694497',
  appId: '1:840412694497:web:7f26704ea6c28b23a3f4a0',
  measurementId: 'G-X3KWZ94TZP',
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}
export const onAuthStateChange = (onchange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    // const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null
    const normalizedUser = user && mapUserFromFirebaseAuth(user)

    onchange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider()

  return firebase.auth().signInWithPopup(gitHubProvider)
}
