
# · Inmuebles V · | Plataforma de Bienes Raíces

Esta es una plataforma moderna para la compra y venta de inmuebles, construida con React, TypeScript y Firebase. Utiliza una arquitectura estática optimizada para un despliegue rápido y seguro en plataformas como Vercel.

---

## 🚀 Puesta en Marcha (Guía Detallada)

Sigue estos pasos **cuidadosamente** para configurar y desplegar tu propia versión de la aplicación. La causa más común de errores es omitir uno de estos pasos.

### ✅ Paso 1: Configurar tu Proyecto en Firebase

1.  **Crea tu proyecto:** Ve a la [Consola de Firebase](https://console.firebase.google.com/). Haz clic en **"Crear un proyecto"** y sigue los pasos.

2.  **Crea una App Web:**
    *   Dentro de tu proyecto, haz clic en el ícono de engranaje ⚙️ junto a "Descripción general del proyecto" y ve a **Configuración del proyecto**.
    *   En la pestaña **General**, baja hasta la sección "Tus apps".
    *   Haz clic en el ícono de **App web** (`</>`) para registrar una nueva.
    *   Dale un apodo (ej. "Mi Portal Inmobiliario") y haz clic en **"Registrar app"**.
    *   Firebase te mostrará un objeto `firebaseConfig`. **¡Esto es muy importante!** De aquí necesitarás la `apiKey`.

### ✅ Paso 2: Configurar Variables de Entorno

Para mantener tu `apiKey` segura, no la pondremos directamente en el código. Usaremos variables de entorno.

**Para Despliegue en Vercel (Recomendado):**

1.  Ve al panel de control de tu proyecto en Vercel.
2.  Ve a la pestaña **Settings** y luego a **Environment Variables**.
3.  Crea una nueva variable con el siguiente nombre y valor:
    *   **Name:** `API_KEY`
    *   **Value:** Pega aquí la `apiKey` que copiaste de tu `firebaseConfig`.
4.  Guarda los cambios. Vercel usará automáticamente esta clave durante el proceso de build.

**Para Pruebas Locales:**

Para que el comando `npm run build` funcione localmente, necesitas que la variable de entorno esté disponible. La forma más fácil es prefijar el comando en tu terminal:

```bash
API_KEY="tu-api-key-aqui" npm run build
```

### ✅ Paso 3: Habilitar los Servicios de Firebase

1.  **Habilitar Autenticación:**
    *   En el menú lateral izquierdo de la consola de Firebase, ve a **Authentication**.
    *   Haz clic en la pestaña **Sign-in method**.
    *   Habilita los proveedores **"Correo electrónico/Contraseña"** y **"Google"**.

2.  **Autorizar tu Dominio:**
    *   Todavía en **Authentication**, ve a la pestaña **Settings**.
    *   En la sección **Dominios autorizados**, haz clic en **"Agregar dominio"**. Debes agregar `localhost` (para pruebas locales) y el dominio donde desplegarás tu app (ej. `mi-portal.vercel.app`).

3.  **Crear la Base de Datos Firestore:**
    *   En el menú lateral izquierdo, ve a **Firestore Database**.
    *   Haz clic en **"Crear base de datos"**.
    *   Selecciona **"Iniciar en modo de producción"** y haz clic en "Siguiente".
    *   Elige una ubicación para tus servidores (ej. `us-central`) y haz clic en **"Habilitar"**.

4.  **Configurar las Reglas de Seguridad:**
    *   Una vez creada la base de datos, ve a la pestaña **Reglas**.
    *   Reemplaza todo el contenido con las siguientes reglas. Esto permite que cualquiera lea las propiedades y las opiniones, pero solo los usuarios autenticados pueden escribir sus propias reseñas. La escritura de propiedades está deshabilitada para los clientes.

    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        
        // Propiedades: Solo lectura para clientes.
        // La escritura debe ser manejada por un backend o panel de admin con credenciales privilegiadas.
        match /properties/{propertyId} {
          allow read: if true;
          allow write: if false;
        }

        // Reseñas: Lectura para todos, escritura solo para usuarios autenticados.
        match /reviews/{reviewId} {
          allow read: if true;
          allow create: if request.auth != null;
          allow update, delete: if request.auth.uid == resource.data.userId;
        }
      }
    }
    ```
    *   Haz clic en **"Publicar"**.

---

### 🚨 Solución de Problemas

Si la aplicación muestra un error de conexión, revisa esta lista punto por punto. El 99% de los problemas se resuelven aquí.

*   **[  ] ¿La variable de entorno `API_KEY` está configurada en Vercel?**
    *   Abre la configuración de tu proyecto en Vercel y verifica que la variable `API_KEY` exista y que su valor sea correcto. ¡Son sensibles a mayúsculas y minúsculas!

*   **[  ] ¿El proveedor de "Correo/Contraseña" está HABILITADO?**
    *   Ve a `Firebase Console > Authentication > Sign-in method`. El interruptor para "Correo electrónico/Contraseña" debe estar en azul (activado).

*   **[  ] ¿El proveedor de "Google" está HABILITADO?**
    *   Ve a `Firebase Console > Authentication > Sign-in method`. El interruptor para "Google" debe estar en azul (activado).

*   **[  ] ¿Has creado la base de datos de Firestore?**
    *   Ve a `Firebase Console > Firestore Database`. Deberías ver tus colecciones (`properties`, `reviews`), no un botón de "Crear base de datos".

*   **[  ] ¿Las reglas de Firestore son las correctas?**
    *   Ve a `Firebase Console > Firestore Database > Reglas`. El código debe ser idéntico al que se proporciona en el Paso 3.4 de esta guía.

*   **[  ] ¿Está tu dominio autorizado?**
    *   Ve a `Firebase Console > Authentication > Settings > Dominios autorizados`. Si estás probando localmente, `localhost` debe estar en la lista. Si ya desplegaste, la URL de tu app (ej. `nombre-app.vercel.app`) debe estar en la lista.

Una vez que completes todos estos pasos, tu aplicación se conectará a Firebase sin problemas.