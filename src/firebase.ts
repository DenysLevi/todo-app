import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const projectId = "todo-app-bd390";

const firebaseConfig = {
  projectId,
  apiKey: "AIzaSyBEVJwxdYqm7ERl9RMIxDIddK6oTWg11Kg",
  authDomain: `${projectId}.firebaseapp.com`,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: "563057625077",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
