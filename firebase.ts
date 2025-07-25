// Declara que la variable 'firebase' existirá globalmente
declare const firebase: any;

// Tu configuración de Firebase
// ¡IMPORTANTE! La clave de API es necesaria para que la aplicación funcione.
export const firebaseConfig = {
  apiKey: 'AIzaSyCcU2CbpSkVSVfHIAOvePo7fjlJSRtVjgA',
  authDomain: "inmuebles-v.firebaseapp.com",
  projectId: "inmuebles-v",
  storageBucket: "inmuebles-v.firebasestorage.app",
  messagingSenderId: "114763072584",
  appId: "1:114763072584:web:f69c04f80240f446ef447d",
  measurementId: "G-GZTLWX96VR"
};

let authInstance: any = null;
let googleProviderInstance: any = null;
let initializationError: Error | null = null;

try {
  // Primero, verificar si el script de Firebase se cargó
  if (typeof firebase === 'undefined') {
    throw new Error("FIREBASE_SCRIPT_NOT_LOADED");
  }

  // Luego, inicializar la app solo si no se ha hecho antes
  if (!firebase.apps.length) {
    // Validar que la API key esté presente y no sea el placeholder
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('DEBES_PEGAR_TU_API_KEY_DE_FIREBASE_AQUI')) {
      throw new Error("API_KEY_MISSING");
    }
    firebase.initializeApp(firebaseConfig);
  }

  // Finalmente, exportar los servicios
  authInstance = firebase.auth();
  googleProviderInstance = firebase.auth.GoogleAuthProvider;

} catch (e: any) {
  console.error("Firebase initialization failed:", e);
  initializationError = e;
}


// Exporta los servicios y el posible error de inicialización
export const auth = authInstance;
export const GoogleAuthProvider = googleProviderInstance;
export const firebaseInitError = initializationError;
