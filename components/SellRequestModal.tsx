
import React, { useState, useCallback, useRef } from 'react';
import { Modal } from './Modal';
import { FORM_SUBMIT_EMAIL } from '../constants';

interface SellRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellRequestModal: React.FC<SellRequestModalProps> = ({ isOpen, onClose }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const getSuccessUrl = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.search = ''; // Clear existing query params
      url.searchParams.set('form-submitted', 'true');
      return url.toString();
    }
    return '';
  };

  const handleCloseAndReset = useCallback(() => {
    if (formRef.current) formRef.current.reset();
    imagePreviews.forEach(URL.revokeObjectURL);
    setImagePreviews([]);
    onClose();
  }, [imagePreviews, onClose]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    imagePreviews.forEach(URL.revokeObjectURL);
    if (e.target.files) {
      const newPreviews = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    } else {
      setImagePreviews([]);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={handleCloseAndReset}>
      <div className="p-8">
        <form
          ref={formRef}
          action={`https://formsubmit.co/${FORM_SUBMIT_EMAIL}`}
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* FormSubmit Config Fields */}
          <input type="hidden" name="_next" value={getSuccessUrl()} />
          <input type="hidden" name="_subject" value="Nueva Solicitud de Venta de Propiedad" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="true" />

          <h2 className="text-3xl font-bold text-slate-800 text-center -mb-2">Vende tu Propiedad con Nosotros</h2>
          <p className="text-slate-600 text-center">Completa el formulario y un asesor se pondrá en contacto contigo.</p>
          
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-slate-700 border-b pb-2 mb-3">1. Información de Contacto</legend>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nombre Completo *</label>
              <input type="text" name="Nombre" id="name" required className="mt-1 block w-full input-style"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Correo Electrónico</label>
                <input type="email" name="Correo" id="email" className="mt-1 block w-full input-style"/>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Teléfono / WhatsApp *</label>
                <input type="tel" name="Teléfono" id="phone" required className="mt-1 block w-full input-style"/>
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-slate-700 border-b pb-2 mb-3">2. Detalles del Inmueble</legend>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-700">Dirección Completa *</label>
              <input type="text" name="Dirección" id="address" required className="mt-1 block w-full input-style"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                 <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700">Tipo de Propiedad</label>
                 <input type="text" name="Tipo de Propiedad" id="propertyType" placeholder="Ej: Casa, Terreno" className="mt-1 block w-full input-style"/>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-700">Precio de Venta Sugerido (MXN)</label>
                <input type="text" name="Precio Sugerido" id="price" placeholder="Ej: 1,500,000" className="mt-1 block w-full input-style"/>
              </div>
            </div>
             <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descripción (recámaras, baños, m², etc.)</label>
              <textarea name="Descripción" id="description" rows={3} className="mt-1 block w-full input-style"></textarea>
            </div>
          </fieldset>
          
          <fieldset>
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
            <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cotización de mi publicación
            </button>
          </div>
        </form>
      </div>
      <style>{`.input-style { color: #1e293b; background-color: white; border: 1px solid #cbd5e1; border-radius: 0.375rem; padding: 0.5rem 0.75rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); outline: none; } .input-style::placeholder { color: #94a3b8; } .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); border-color: #22c55e; --tw-ring-color: #22c55e; }`}</style>
    </Modal>
  );
};