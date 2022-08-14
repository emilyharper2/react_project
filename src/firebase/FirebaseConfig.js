// Import the functioning needed from SDKs.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';

// Web app's Firebase configuration.
const firebaseConfig = {
    apiKey: "AIzaSyA_uODZYc72M_o3rNxCZiSrRXoIZQ2U1Os",
    authDomain: "react-app-s3ce.firebaseapp.com",
    projectId: "react-app-s3ce",
    storageBucket: "react-app-s3ce.appspot.com",
    messagingSenderId: "354675499105",
    appId: "1:354675499105:web:4bd3ce22706c692a698a20",
    measurementId: "G-L3KFYWS5D6"
};
// Initializing Firebase
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
};

export {firebase};