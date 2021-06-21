import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAe0NLMbo-rUJsB-McFB1p9gMLDOvXarbM",
  authDomain: "terclone.firebaseapp.com",
  projectId: "terclone",
  storageBucket: "terclone.appspot.com",
  messagingSenderId: "840412694497",
  appId: "1:840412694497:web:7f26704ea6c28b23a3f4a0",
  measurementId: "G-X3KWZ94TZP",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch {
  firebase.app();
}

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider();

  return firebase.auth().signInWithPopup(gitHubProvider);
};
