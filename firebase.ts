// Declara que la variable 'firebase' existirá globalmente
declare const firebase: any;

// Tu configuración de Firebase
// ¡IMPORTANTE! La API Key se carga desde las variables de entorno.
export const firebaseConfig = {
  // La API Key ya no se escribe aquí. Se inyecta durante el build.
  authDomain: "inmuebles-v.firebaseapp.com",
  projectId: "inmuebles-v",
  storageBucket: "inmuebles-v.appspot.com",
  messagingSenderId: "114763072584",
  appId: "1:114763072584:web:f69c04f80240f446ef447d",
  measurementId: "G-GZTLWX96VR"
};

let authInstance: any = null;
let googleProviderInstance: any = null;
let firestoreInstance: any = null;
let initializationError: { message: string; name: string; code?: string; } | null = null;

try {
  // Primero, verificar si el script de Firebase se cargó
  if (typeof firebase === 'undefined') {
    throw new Error("FIREBASE_SCRIPT_NOT_LOADED");
  }

  // Luego, inicializar la app solo si no se ha hecho antes
  if (!firebase.apps.length) {
    // Validar que la API key se haya proporcionado via environment variable
    if (!process.env.API_KEY) {
      throw new Error("API_KEY_MISSING");
    }
    
    const configWithApiKey = { ...firebaseConfig, apiKey: process.env.API_KEY };
    firebase.initializeApp(configWithApiKey);
  }

  // Finalmente, exportar los servicios
  authInstance = firebase.auth();
  firestoreInstance = firebase.firestore();
  
  // Se establece explícitamente la persistencia a 'local'.
  // Esto soluciona errores en entornos donde la detección automática de almacenamiento puede fallar
  // (ej. "web storage must be enabled").
  authInstance.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((error: any) => {
        console.error("Error al establecer la persistencia de Firebase:", error);
    });

  googleProviderInstance = new firebase.auth.GoogleAuthProvider();

} catch (e: any) {
  console.error("Firebase initialization failed:", e);
  // Immediately create a simple, serializable object from the error to prevent circular reference issues.
  initializationError = {
    message: e.message || 'Error de inicialización de Firebase desconocido.',
    name: e.name || 'InitializationError',
    code: e.code,
  };
}


// Exporta los servicios y el posible error de inicialización
export const auth = authInstance;
export const db = firestoreInstance;
export const GoogleAuthProvider = googleProviderInstance;
export const firebaseInitError = initializationError;