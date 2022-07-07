import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA_uODZYc72M_o3rNxCZiSrRXoIZQ2U1Os",
    authDomain: "react-app-s3ce.firebaseapp.com",
    projectId: "react-app-s3ce",
    storageBucket: "react-app-s3ce.appspot.com",
    messagingSenderId: "354675499105",
    appId: "1:354675499105:web:4bd3ce22706c692a698a20",
    measurementId: "G-L3KFYWS5D6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
