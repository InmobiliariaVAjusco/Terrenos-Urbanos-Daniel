// Declara que la variable 'firebase' existirá globalmente
declare const firebase: any;

// Tu configuración de Firebase
// ¡IMPORTANTE! Pega aquí tu clave de API de Firebase.
export const firebaseConfig = {
  // REEMPLAZA "TU_API_KEY_AQUI" CON TU CLAVE DE API REAL DE FIREBASE
  apiKey: "AIzaSyCcU2CbpSkVSVfHIAOvePo7fjlJSRtVjgA", 
  authDomain: "inmuebles-v.firebaseapp.com",
  projectId: "inmuebles-v",
  storageBucket: "inmuebles-v.appspot.com",
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
    // Validar que la API key se haya reemplazado
    if (firebaseConfig.apiKey === "TU_API_KEY_AQUI" || !firebaseConfig.apiKey) {
      throw new Error("API_KEY_MISSING");
    }
    firebase.initializeApp(firebaseConfig);
  }

  // Finalmente, exportar los servicios
  authInstance = firebase.auth();
  
  // Se establece explícitamente la persistencia a 'local'.
  // Esto soluciona errores en entornos donde la detección automática de almacenamiento puede fallar
  // (ej. "web storage must be enabled").
  authInstance.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((error: any) => {
        console.error("Error al establecer la persistencia de Firebase:", error);
    });

  googleProviderInstance = firebase.auth.GoogleAuthProvider;

} catch (e: any) {
  console.error("Firebase initialization failed:", e);
  initializationError = e;
}


// Exporta los servicios y el posible error de inicialización
export const auth = authInstance;
export const GoogleAuthProvider = googleProviderInstance;
export const firebaseInitError = initializationError;