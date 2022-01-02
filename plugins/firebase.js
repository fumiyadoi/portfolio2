import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
}
const apps = getApps()
let firebaseApp = []
if (!apps.length) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  firebaseApp = apps[0]
}
const db = getFirestore(firebaseApp, {})
export { db }
