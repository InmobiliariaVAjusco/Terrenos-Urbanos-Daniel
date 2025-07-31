import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-900 mb-6 border-b pb-4">Aviso de Privacidad Integral</h1>
      <div className="prose prose-slate max-w-none text-justify">
        <p><strong>Fecha de última actualización:</strong> {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2 className="text-2xl font-semibold mt-6">1. Identidad y Domicilio del Responsable</h2>
        <p>
          · Inmuebles V · (en adelante "el Portal"), con domicilio ficticio para fines de este ejemplo en Av. Insurgentes Sur 123, Ciudad de México, es el responsable del tratamiento de sus datos personales.
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. Datos Personales que Recopilamos</h2>
        <p>
          El Portal puede recopilar los siguientes datos personales:
        </p>
        <ul>
          <li><strong>Datos de Identificación:</strong> Nombre completo.</li>
          <li><strong>Datos de Contacto:</strong> Correo electrónico.</li>
          <li><strong>Datos de Autenticación:</strong> Identificadores de usuario y contraseñas (cifradas), identificadores de proveedores de terceros como Google.</li>
          <li><strong>Datos de Navegación:</strong> Dirección IP, tipo de navegador, sistema operativo, y cookies para mejorar su experiencia de usuario.</li>
          <li><strong>Contenido Generado por el Usuario:</strong> Opiniones, comentarios y listados de propiedades que usted decida publicar.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">3. Finalidades del Tratamiento de Datos</h2>
        <p>
          Sus datos personales serán utilizados para las siguientes finalidades:
        </p>
        <p><strong>Finalidades Primarias (necesarias para el servicio):</strong></p>
        <ul>
          <li>Crear y gestionar su cuenta de usuario en el Portal.</li>
          <li>Permitirle publicar, editar y gestionar listados de propiedades.</li>
          <li>Facilitar la comunicación entre compradores y vendedores.</li>
          <li>Procesar y mostrar sus opiniones y reseñas.</li>
          <li>Brindar soporte técnico y atender sus solicitudes.</li>
          <li>Garantizar la seguridad y el buen funcionamiento del Portal.</li>
        </ul>
        <p><strong>Finalidades Secundarias (requieren su consentimiento):</strong></p>
        <ul>
          <li>Enviarle boletines informativos, promociones y oportunidades de inversión relevantes.</li>
          <li>Realizar encuestas de satisfacción y estudios de mercado.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">4. Uso de Cookies</h2>
        <p>
          Utilizamos cookies y tecnologías similares para mejorar la funcionalidad del sitio, recordar sus preferencias (como su sesión de inicio), y analizar el tráfico para optimizar nuestro servicio. Al utilizar el Portal, usted consiente el uso de estas tecnologías.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h2>
        <p>
          Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
        </p>
        <p>
          Para el ejercicio de cualquiera de los derechos ARCO, puede enviar una solicitud a través del correo electrónico: <a href="mailto:inmuebles135@gmail.com" className="text-green-600 hover:underline">inmuebles135@gmail.com</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Seguridad de los Datos</h2>
        <p>
          Hemos implementado medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra el daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6">7. Cambios al Aviso de Privacidad</h2>
        <p>
          El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; o por otras causas. Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a través de nuestro portal web.
        </p>
      </div>
    </div>
  );
};