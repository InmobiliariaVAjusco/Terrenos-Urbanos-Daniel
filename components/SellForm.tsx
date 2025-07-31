
import React, { useState, useRef } from 'react';
import { Property, ListingType, PropertyCategory, PropertyStatus } from '../types';

interface SellFormProps {
  onAddProperty: (property: Omit<Property, 'publicationDate' | 'id'>) => void;
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

const propertyCategories: PropertyCategory[] = ['Casa', 'Departamento', 'Terreno', 'Rancho', 'Casa en condominio', 'Casa con terreno', 'Comercial', 'Mixto'];
const propertyStatuses: PropertyStatus[] = ['Disponible', 'Vendida', 'Rentada'];


export const SellForm: React.FC<SellFormProps> = ({ onAddProperty }) => {
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    sqft: '',
    frontage: '',
    depth: '',
    category: 'Casa' as PropertyCategory,
    listingType: 'Venta' as ListingType,
    services: '',
    description: '',
    status: 'Disponible' as PropertyStatus,
    isFeatured: false,
    rooms: '',
    bathrooms: '',
    feature1: '',
    feature2: '',
    feature3: '',
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for drag and drop image reordering
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
        setFormData({ ...formData, [name]: value });
    }
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

  const handleSortImages = () => {
    if (dragItemIndex.current === null || dragOverItemIndex.current === null) return;
    if (dragItemIndex.current === dragOverItemIndex.current) return;

    const items = [...imagePreviews];
    const draggedItem = items.splice(dragItemIndex.current, 1)[0];
    items.splice(dragOverItemIndex.current, 0, draggedItem);
    
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
    
    setImagePreviews(items);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.address || !formData.price || !formData.sqft || !formData.description || !formData.feature1 || !formData.feature2 || !formData.feature3) {
      setError('Por favor, completa todos los campos requeridos, incluyendo las 3 características principales.');
      return;
    }
    if (imagePreviews.length === 0) {
      setError('Por favor, sube al menos una imagen para el inmueble.');
      return;
    }

    setIsLoading(true);

    await new Promise(res => setTimeout(res, 500));
      
    const newProperty: Omit<Property, 'publicationDate' | 'id'> = {
      address: formData.address,
      price: parseInt(formData.price, 10),
      sqft: parseInt(formData.sqft, 10),
      frontage: parseInt(formData.frontage, 10),
      depth: parseInt(formData.depth, 10),
      category: formData.category,
      listingType: formData.listingType,
      services: formData.services.split(',').map(f => f.trim()).filter(f => f),
      description: formData.description,
      images: imagePreviews,
      status: formData.status,
      isFeatured: formData.isFeatured,
      rooms: formData.rooms ? parseInt(formData.rooms, 10) : undefined,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms, 10) : undefined,
      mainFeatures: [formData.feature1, formData.feature2, formData.feature3],
    };
    onAddProperty(newProperty);

    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-slate-200">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Publicar Nuevo Inmueble</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Tipo de Anuncio */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Anuncio</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="listingType" value="Venta" checked={formData.listingType === 'Venta'} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300"/>
              <span className="ml-2 text-slate-800">Venta</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="listingType" value="Renta" checked={formData.listingType === 'Renta'} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300"/>
              <span className="ml-2 text-slate-800">Renta</span>
            </label>
          </div>
        </div>

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
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">Categoría del Inmueble</label>
            <select name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                {propertyCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
         </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
            <label htmlFor="sqft" className="block text-sm font-medium text-slate-700">Superficie (m²)</label>
            <input type="number" name="sqft" id="sqft" value={formData.sqft} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
          </div>
          <div>
            <label htmlFor="services" className="block text-sm font-medium text-slate-700">Servicios (separados por comas)</label>
            <input type="text" name="services" id="services" value={formData.services} onChange={handleChange} placeholder="Ej: Agua, Luz, Drenaje" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-green-500 focus:border-green-500"/>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="rooms" className="block text-sm font-medium text-slate-700">Habitaciones (opcional)</label>
            <input type="number" name="rooms" id="rooms" value={formData.rooms} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-slate-700">Baños (opcional)</label>
            <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">3 Características Principales (para la tarjeta)</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" name="feature1" placeholder="Ej: 4 Recámaras" value={formData.feature1} onChange={handleChange} required className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                <input type="text" name="feature2" placeholder="Ej: Con Escrituras" value={formData.feature2} onChange={handleChange} required className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                <input type="text" name="feature3" placeholder="Ej: Estilo Rústico" value={formData.feature3} onChange={handleChange} required className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
            </div>
        </div>

        <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700">Estado del Inmueble</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                {propertyStatuses.map(stat => <option key={stat} value={stat}>{stat}</option>)}
            </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Imágenes del Inmueble (Arrastra para reordenar)</label>
           <div className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="flex text-sm text-slate-600 justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                  <span>Sube una o más imágenes</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => handleImagesChange(e.target.files)} accept="image/*" multiple />
                </label>
              </div>
              <p className="text-xs text-slate-500">La primera imagen será la principal</p>
            </div>
          </div>
            {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                    {imagePreviews.map((image, index) => (
                        <div 
                          key={index} 
                          className="relative group aspect-square cursor-grab active:cursor-grabbing"
                          draggable
                          onDragStart={() => (dragItemIndex.current = index)}
                          onDragEnter={() => (dragOverItemIndex.current = index)}
                          onDragEnd={handleSortImages}
                          onDragOver={(e) => e.preventDefault()}
                        >
                            <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-10 pointer-events-none">
                              {index + 1}
                            </div>
                            <img src={image} alt={`Vista previa ${index + 1}`} className="w-full h-full object-cover rounded-md shadow-md" />
                            <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 -m-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 z-20" aria-label={`Eliminar imagen ${index + 1}`}>
                               <CloseIcon />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descripción Completa</label>
          <textarea name="description" id="description" rows={5} value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="border-t border-slate-200 pt-6 space-y-4">
            <div className="relative flex items-start">
                <div className="flex items-center h-5">
                <input
                    id="isFeatured"
                    name="isFeatured"
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 border-slate-300 rounded focus:ring-green-500"
                />
                </div>
                <div className="ml-3 text-sm">
                <label htmlFor="isFeatured" className="font-medium text-slate-700">Destacar en el carrusel principal</label>
                <p className="text-slate-500">Marcar esta opción mostrará la propiedad en la página de inicio.</p>
                </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
                {isLoading && <UploadingSpinner />}
                {isLoading ? 'Publicando Inmueble...' : 'Publicar Inmueble'}
            </button>
        </div>
      </form>
    </div>
  );
};