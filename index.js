import * as firebase from 'firebase';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA_uODZYc72M_o3rNxCZiSrRXoIZQ2U1Os",
  authDomain: "react-app-s3ce.firebaseapp.com",
  projectId: "react-app-s3ce",
  storageBucket: "react-app-s3ce.appspot.com",
  messagingSenderId: "354675499105",
  appId: "1:354675499105:web:4bd3ce22706c692a698a20",
  measurementId: "G-L3KFYWS5D6"
});

const db = getFirestore(firebaseApp);

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
