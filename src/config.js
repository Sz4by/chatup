// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiIir5Y5r0bsbyducte7PpVreWXzu-o-M",
  authDomain: "szaby-5d8be.firebaseapp.com",
  databaseURL: "https://szaby-5d8be-default-rtdb.firebaseio.com",
  projectId: "szaby-5d8be",
  storageBucket: "szaby-5d8be.appspot.com",
  messagingSenderId: "215276216449",
  appId: "1:215276216449:web:94f0f17cbd74c2336fad80",
  measurementId: "G-EL7YSFVQZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Password for the private chat room
const privateRoomPassword = 'DamnTrainCJ!69'
