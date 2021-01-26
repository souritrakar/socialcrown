import  firebase from 'firebase';
import firestore from 'firebase/firestore'
import auth from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyC3Mc51GIY_yEszvONFHXlFSkPWFMulDoc",
    authDomain: "social-crown.firebaseapp.com",
    projectId: "social-crown",
    storageBucket: "social-crown.appspot.com",
    messagingSenderId: "620667028279",
    appId: "1:620667028279:web:421960d9c15ff4a8f850b2"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

firebase.auth()
firebase.storage()
export default firebase;