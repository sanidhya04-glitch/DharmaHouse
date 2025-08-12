// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV7o323naVepbL4xVdnh3AAL_s3L0vQsw",
  authDomain: "dharma-house-hub-3d2p0.firebaseapp.com",
  projectId: "dharma-house-hub-3d2p0",
  storageBucket: "dharma-house-hub-3d2p0.appspot.com",
  messagingSenderId: "1096038838750",
  appId: "1:1096038838750:web:4431f41655075d9ada2d4f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
