var firebaseConfig = {
    apiKey: "AIzaSyDVREeTWwRZi2357hAxMQMaO5rGqzl8lKw",
    authDomain: "chat-rooms-daf8d.firebaseapp.com",
    databaseURL: "https://chat-rooms-daf8d.firebaseio.com",
    projectId: "chat-rooms-daf8d",
    storageBucket: "chat-rooms-daf8d.appspot.com",
    messagingSenderId: "72412532819",
    appId: "1:72412532819:web:856140823dc7e28df1b6a6",
    measurementId: "G-DPND3KNEZW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();