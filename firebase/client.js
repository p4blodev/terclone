import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
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

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return db.collection('devits').add({
    avatar,
    content,
    img,
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
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`)
  const task = ref.put(file)

  return task
}
