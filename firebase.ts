// Declara que la variable 'firebase' existirá globalmente
declare const firebase: any;

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCcU2CbpSkVSVfHIAOvePo7fjlJSRtVjgA",
  authDomain: "inmuebles-v.firebaseapp.com",
  projectId: "inmuebles-v",
  storageBucket: "inmuebles-v.firebasestorage.app",
  messagingSenderId: "114763072584",
  appId: "1:114763072584:web:f69c04f80240f446ef447d",
  measurementId: "G-GZTLWX96VR"
};

// Inicializa Firebase solo si no ha sido inicializado antes
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Exporta los servicios que necesitas
export const auth = firebase.auth();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;