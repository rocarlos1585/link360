import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: 'AIzaSyCZynApyjcpKhmc7algM_E7cWVV8LjiahY',
  authDomain: 'salud360-e97f0.firebaseapp.com',
  databaseURL: '',
  projectId: 'salud360-e97f0',
  storageBucket: 'salud360-e97f0.appspot.com',
  messagingSenderId: '613730483816',
  appId: '1:613730483816:web:3c09d1e6ff0090c50905dd',
  measurementId: 'G-8F6JRDZKWR'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export function obtenerMensajeErrorFirebaseAuth(codigoError) {
  switch (codigoError) {
    case "auth/user-not-found":
      return "No se encontró ningún usuario con esta dirección de correo electrónico.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta.";
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con esta dirección de correo electrónico.";
    case "auth/invalid-email":
      return "La dirección de correo electrónico no es válida.";
    case "auth/weak-password":
      return "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
    case "auth/too-many-requests":
      return "Se han enviado demasiadas solicitudes en un corto período de tiempo. Por favor, inténtalo de nuevo más tarde.";
    default:
      return "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
  }
}