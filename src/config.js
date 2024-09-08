/*  
    Attention recruiters or anyone that might be viewing this,
    obviously I'd gitignore this file, but this app is for exhibition purposes
*/

// https://console.firebase.google.com/u/0/project/chat-rooms-daf8d/database/firestore/data~2F
const config = {
  apiKey: "AIzaSyBiIir5Y5r0bsbyducte7PpVreWXzu-o-M",
  authDomain: "szaby-5d8be.firebaseapp.com",
  databaseURL: "https://szaby-5d8be-default-rtdb.firebaseio.com",
  projectId: "szaby-5d8be",
  storageBucket: "szaby-5d8be.appspot.com",
  messagingSenderId: "215276216449",
  appId: "1:215276216449:web:94f0f17cbd74c2336fad80",
  measurementId: "G-EL7YSFVQZ0"
}

// Initialize Firebase
firebase.initializeApp(config)
const db = firebase.firestore()

// Password for the private chat room
const privateRoomPassword = 'DamnTrainCJ!69'
