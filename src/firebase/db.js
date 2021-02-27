import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDwpTRy1ds9MyMMZKtWVAh_zafSh2mO1oQ",
    authDomain: "vue-todo-e2d9b.firebaseapp.com",
    projectId: "vue-todo-e2d9b",
    storageBucket: "vue-todo-e2d9b.appspot.com",
    messagingSenderId: "414021971624",
    appId: "1:414021971624:web:886baf1ce48182b3471c9d"
};
// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();