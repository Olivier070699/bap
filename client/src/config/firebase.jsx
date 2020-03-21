import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCk9qDNRBa3oD5NWl0M-fptcgk1fU26CHY",
    authDomain: "labo5-2fb0c.firebaseapp.com",
    databaseURL: "https://labo5-2fb0c.firebaseio.com",
    projectId: "labo5-2fb0c",
    storageBucket: "labo5-2fb0c.appspot.com",
    messagingSenderId: "778590578582",
    appId: "1:778590578582:web:f07ba3ca337557d0381fb7"
};

firebase.initializeApp(firebaseConfig)
const db = firebase

export default db