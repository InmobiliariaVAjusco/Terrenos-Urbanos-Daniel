# · Inmuebles V · | Plataforma de Bienes Raíces

Esta es una plataforma moderna para la compra y venta de inmuebles, construida con React, TypeScript y Firebase. Utiliza una arquitectura estática optimizada para un despliegue rápido y seguro en plataformas como Vercel.

## Características

-   **Interfaz Moderna:** Construida con React y Tailwind CSS.
-   **Autenticación Segura:** Manejo de usuarios con Firebase Authentication (Email/Contraseña y Google).
-   **Imágenes Externas:** Las imágenes se cargan desde servicios externos para un desarrollo y visualización rápidos.
-   **Despliegue Sencillo:** Configurado para desplegarse fácilmente en Vercel.

---

## 🚀 Puesta en Marcha Rápida (para el nuevo propietario)

Sigue estos pasos para desplegar tu propia versión de la aplicación.

### 1. Configuración de Firebase

1.  Ve a la [Consola de Firebase](https://console.firebase.google.com/).
2.  Crea un nuevo proyecto (o usa uno existente).
3.  Dentro de tu proyecto, ve a **Configuración del proyecto** (el ícono de engranaje ⚙️).
4.  En la pestaña **General**, busca la sección "Tus apps" y registra una nueva **app web** (icono `</>`).
5.  Dale un nombre a tu app y Firebase te proporcionará un objeto de configuración (`firebaseConfig`). Copia el valor de `apiKey`. ¡Esa es tu llave!
6.  Abre el archivo `firebase.ts` en tu editor de código.
7.  Pega tu `apiKey` en el campo correspondiente dentro del objeto `firebaseConfig`, reemplazando `"TU_API_KEY_AQUI"`.
8.  Ve a la sección **Authentication** en el menú de la izquierda.
9.  En la pestaña **Sign-in method**, habilita los proveedores que desees usar (como mínimo **Correo electrónico/Contraseña** y **Google**).
10. En la pestaña **Settings**, agrega el dominio de tu futuro sitio de Vercel a la lista de **Dominios autorizados**.

### 2. Desplegar

¡Eso es todo! Ahora puedes desplegar tu proyecto en Vercel. El sitio estará en línea, conectado a *tu* proyecto de Firebase.