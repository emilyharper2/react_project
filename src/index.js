


const firebaseConfig = {
  apiKey: "AIzaSyA_uODZYc72M_o3rNxCZiSrRXoIZQ2U1Os",
  authDomain: "react-app-s3ce.firebaseapp.com",
  databaseURL: "https://react-app-s3ce.firebaseio.com",
  projectId: "react-app-s3ce",
  storageBucket: "react-app-s3ce.appspot.com",
  messagingSenderId: "354675499105",
  appId: "1:354675499105:web:4bd3ce22706c692a698a20",
  measurementId: "G-L3KFYWS5D6"
};

if (firebase.apps.length === 0) {
  initializeApp(firebaseConfig);
}