// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBepSbemeRNSsI5mw5Duih_mGVHT0ziv4c',
  authDomain: 'vue-blog-8ed7d.firebaseapp.com',
  databaseURL: 'https://vue-blog-8ed7d.firebaseio.com',
  projectId: 'vue-blog-8ed7d',
  storageBucket: 'vue-blog-8ed7d.appspot.com',
  messagingSenderId: '923133172124',
  appId: '1:923133172124:web:10a24e5b04b29304d39059',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { db }