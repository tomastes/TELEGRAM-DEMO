import firebase from 'firebase'
const firebaseConfig = {
    //add your own config
  };
  const firebaeApp = firebase.initializeApp(firebaseConfig)
  const db = firebaeApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db;