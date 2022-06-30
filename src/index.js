import { initializeApp } from 'firebase';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA_uODZYc72M_o3rNxCZiSrRXoIZQ2U1Os",
  authDomain: "react-app-s3ce.firebaseapp.com",
  projectId: "react-app-s3ce",
  storageBucket: "react-app-s3ce.appspot.com",
  messagingSenderId: "354675499105",
  appId: "1:354675499105:web:4bd3ce22706c692a698a20",
  measurementId: "G-L3KFYWS5D6"
});

const db = getFirestore(app);

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});