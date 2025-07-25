import React, { useState, useCallback } from 'react';
import { Property, PropertyType } from '../types';

interface SellFormProps {
  onAddProperty: (property: Omit<Property, 'publicationDate'>) => void;
}

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const UploadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const SellForm: React.FC<SellFormProps> = ({ onAddProperty }) => {
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    sqft: '',
    frontage: '',
    depth: '',
    propertyType: 'Residencial' as PropertyType,
    services: '',
    description: '',
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImagesChange = async (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      const base64Promises = newFiles.map(fileToBase64);
      try {
        const newPreviews = await Promise.all(base64Promises);
        setImagePreviews(prev => [...prev, ...newPreviews]);
      } catch (err) {
        console.error("Error converting files to Base64", err);
        setError("Hubo un error al procesar las imágenes.");
      }
    }
  };
  
  const handleRemoveImage = (indexToRemove: number) => {
      setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.address || !formData.price || !formData.sqft || !formData.description) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }
    if (imagePreviews.length === 0) {
      setError('Por favor, sube al menos una imagen para el inmueble.');
      return;
    }

    setIsLoading(true);

    // Simulate a short delay for UX
    await new Promise(res => setTimeout(res, 500));
      
    const newProperty: Omit<Property, 'publicationDate'> = {
      id: Date.now(),
      address: formData.address,
      price: parseInt(formData.price, 10),
      sqft: parseInt(formData.sqft, 10),
      frontage: parseInt(formData.frontage, 10),
      depth: parseInt(formData.depth, 10),
      propertyType: formData.propertyType,
      services: formData.services.split(',').map(f => f.trim()).filter(f => f),
      description: formData.description,
      images: imagePreviews, // Use the Base64 previews directly
    };
    onAddProperty(newProperty);

    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-slate-200">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Poner un Inmueble en Venta</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">Ubicación / Dirección</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-green-500 focus:border-green-500"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700">Precio ($)</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
          </div>
           <div>
            <label htmlFor="sqft" className="block text-sm font-medium text-slate-700">Superficie (m²)</label>
            <input type="number" name="sqft" id="sqft" value={formData.sqft} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
          </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="frontage" className="block text-sm font-medium text-slate-700">Frente (m)</label>
            <input type="number" name="frontage" id="frontage" value={formData.frontage} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
          </div>
          <div>
            <label htmlFor="depth" className="block text-sm font-medium text-slate-700">Fondo (m)</label>
            <input type="number" name="depth" id="depth" value={formData.depth} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
          </div>
        </div>
         <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700">Tipo de Inmueble</label>
            <select name="propertyType" id="propertyType" value={formData.propertyType} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                <option>Residencial</option>
                <option>Comercial</option>
                <option>Mixto</option>
            </select>
         </div>
        <div>
          <label htmlFor="services" className="block text-sm font-medium text-slate-700">Servicios (separados por comas)</label>
          <input type="text" name="services" id="services" value={formData.services} onChange={handleChange} placeholder="Ej: Agua, Luz, Drenaje, Pavimento" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-green-500 focus:border-green-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Imágenes del Inmueble</label>
            {imagePreviews.length > 0 && (
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                    {imagePreviews.map((image, index) => (
                        <div key={index} className="relative group aspect-square">
                            <img src={image} alt={`Vista previa ${index + 1}`} className="w-full h-full object-cover rounded-md shadow-md" />
                            <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 -m-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100" aria-label={`Eliminar imagen ${index + 1}`}>
                               <CloseIcon />
                            </button>
                        </div>
                    ))}
                </div>
            )}
           <div className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              <div className="flex text-sm text-slate-600 justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                  <span>Sube una o más imágenes</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => handleImagesChange(e.target.files)} accept="image/*" multiple />
                </label>
                <p className="pl-1">o arrástralas y suéltalas</p>
              </div>
              <p className="text-xs text-slate-500">PNG, JPG, GIF</p>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descripción</label>
          <textarea name="description" id="description" rows={5} value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="border-t border-slate-200 pt-6">
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
                {isLoading && <UploadingSpinner />}
                {isLoading ? 'Publicando Inmueble...' : 'Poner en Venta'}
            </button>
        </div>
      </form>
    </div>
  );
};