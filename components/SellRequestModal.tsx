import React, { useState, useCallback, useRef } from 'react';
import { Modal } from './Modal';
import { FORM_SUBMIT_EMAIL } from '../constants';

interface SellRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadingSpinner = () => <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

export const SellRequestModal: React.FC<SellRequestModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = useCallback(() => {
    if (formRef.current) formRef.current.reset();
    imagePreviews.forEach(URL.revokeObjectURL);
    setImagePreviews([]);
    setStatus('idle');
    setError('');
  }, [imagePreviews]);

  const handleClose = () => {
    if (status === 'success') {
      handleReset();
    }
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    imagePreviews.forEach(URL.revokeObjectURL);
    if (e.target.files) {
      const newPreviews = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    } else {
      setImagePreviews([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('submitting');
    setError('');
    
    const formData = new FormData(formRef.current);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        throw new Error(data.message || 'Ocurrió un error en el servidor. Intenta de nuevo.');
      }
    } catch (err: any) {
      console.error("Error al enviar el formulario:", err);
      setStatus('error');
      setError(err.message || 'No se pudo enviar la solicitud. Revisa tu conexión a internet.');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">¡Solicitud Enviada!</h2>
            <p className="text-slate-600 mt-2">Gracias por tu interés. Un asesor revisará tu información y se pondrá en contacto contigo a la brevedad.</p>
            <button
              onClick={handleClose}
              className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Cerrar
            </button>
          </div>
        );
      case 'error':
        return (
          <div className="text-center p-8">
             <div className="w-20 h-20 mx-auto mb-4 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Hubo un Error</h2>
            <p className="text-slate-600 mt-2 bg-red-50 p-3 rounded-md border border-red-200">{error}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Intentar de Nuevo
            </button>
          </div>
        );
      default: // 'idle' or 'submitting'
        return (
          <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 text-center -mb-2">Vende tu Propiedad con Nosotros</h2>
              <p className="text-slate-600 text-center">Completa el formulario y un asesor se pondrá en contacto contigo.</p>
              
              <fieldset className="space-y-4" disabled={status === 'submitting'}>
                  <legend className="text-lg font-semibold text-slate-700 border-b pb-2 mb-3">1. Información de Contacto</legend>
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nombre Completo *</label>
                      <input type="text" name="name" id="name" required className="mt-1 block w-full input-style"/>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Correo Electrónico</label>
                          <input type="email" name="email" id="email" className="mt-1 block w-full input-style"/>
                      </div>
                      <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Teléfono / WhatsApp *</label>
                          <input type="tel" name="phone" id="phone" required className="mt-1 block w-full input-style"/>
                      </div>
                  </div>
              </fieldset>

              <fieldset className="space-y-4" disabled={status === 'submitting'}>
                  <legend className="text-lg font-semibold text-slate-700 border-b pb-2 mb-3">2. Detalles del Inmueble</legend>
                  <div>
                      <label htmlFor="address" className="block text-sm font-medium text-slate-700">Dirección Completa *</label>
                      <input type="text" name="address" id="address" required className="mt-1 block w-full input-style"/>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                         <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700">Tipo de Propiedad</label>
                         <input type="text" name="propertyType" id="propertyType" placeholder="Ej: Casa, Terreno" className="mt-1 block w-full input-style"/>
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-slate-700">Precio de Venta Sugerido (MXN)</label>
                        <input type="text" name="price" id="price" placeholder="Ej: 1,500,000" className="mt-1 block w-full input-style"/>
                      </div>
                  </div>
                   <div>
                      <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descripción (recámaras, baños, m², etc.)</label>
                      <textarea name="description" id="description" rows={3} className="mt-1 block w-full input-style"></textarea>
                  </div>
              </fieldset>
              
              <fieldset disabled={status === 'submitting'}>
                  <legend className="text-lg font-semibold text-slate-700 border-b pb-2 mb-3">3. Sube algunas Fotos</legend>
                  <div className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                              <span>Selecciona tus imágenes</span>
                              <input id="file-upload" name="attachment" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" multiple />
                          </label>
                      </div>
                  </div>
                   {imagePreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {imagePreviews.map((preview, index) => (
                              <div key={index} className="relative group aspect-square">
                                  <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md shadow-md" />
                              </div>
                          ))}
                      </div>
                  )}
              </fieldset>
              
              <div className="pt-6 border-t">
                  <button type="submit" disabled={status === 'submitting'} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed">
                       {status === 'submitting' && <UploadingSpinner />}
                       {status === 'submitting' ? 'Enviando Solicitud...' : 'Enviar Solicitud'}
                  </button>
              </div>
          </form>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="p-8">
            {renderContent()}
        </div>
        <style>{`.input-style { color: #1e293b; background-color: white; border: 1px solid #cbd5e1; border-radius: 0.375rem; padding: 0.5rem 0.75rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); outline: none; } .input-style::placeholder { color: #94a3b8; } .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); border-color: #22c55e; --tw-ring-color: #22c55e; }`}</style>
    </Modal>
  );
};