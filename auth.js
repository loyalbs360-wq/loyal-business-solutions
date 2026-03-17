import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Configuración proporcionada por el usuario
const firebaseConfig = {
  apiKey: "AIzaSyDimFqfmFuv2aw5-4TVyrL6kiH6UsRjHv4",
  authDomain: "lbs-portal.firebaseapp.com",
  projectId: "lbs-portal",
  storageBucket: "lbs-portal.firebasestorage.app",
  messagingSenderId: "456419739483",
  appId: "1:456419739483:web:b5418187a3a3028705fc7e",
  measurementId: "G-THNLRCZCP9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referencias a elementos del DOM (se manejarán en la integración con index.html)
export const handleLogin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const handleRegister = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const handleLogout = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const onUserStatusChange = (callback) => {
    onAuthStateChanged(auth, callback);
};
