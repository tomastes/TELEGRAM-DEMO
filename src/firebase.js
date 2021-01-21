import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAWHPNvtrWmMniPYRPu3mX2ohmCJW4G-vU",
    authDomain: "telegramclone-ac9a2.firebaseapp.com",
    databaseURL: "https://telegramclone-ac9a2.firebaseio.com",
    projectId: "telegramclone-ac9a2",
    storageBucket: "telegramclone-ac9a2.appspot.com",
    messagingSenderId: "771549601430",
    appId: "1:771549601430:web:2c4f4595d068a62fdfecb7"
  };
  const firebaeApp = firebase.initializeApp(firebaseConfig)
  const db = firebaeApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db;