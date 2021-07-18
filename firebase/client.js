import firebase from 'firebase/app'
import 'firebase/firestore'
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

const db = firebase.firestore()

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
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

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCounts: 0,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        const date = new Date(createdAt.seconds * 1000)

        const normalizedCreatedAt = new Intl.DateTimeFormat('en-US')
          .format(date)
          .toString()

        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        }
      })
    })
}
