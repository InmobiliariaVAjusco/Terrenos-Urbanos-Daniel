import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { LandPlot, LandUse } from '../types';

interface SellFormProps {
  onAddLandPlot: (landPlot: LandPlot) => void;
}

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2l4.45 1.18a1 1 0 01.53 1.62l-3.2 3.118 1.174 4.436a1 1 0 01-1.52.928L12 15.347l-3.98 2.54a1 1 0 01-1.52-.928l1.174-4.436-3.2-3.118a1 1 0 01.53-1.62l4.45-1.18L11.033 2.744A1 1 0 0112 2z" clipRule="evenodd" />
    </svg>
);

export const SellForm: React.FC<SellFormProps> = ({ onAddLandPlot }) => {
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    sqft: '',
    frontage: '',
    depth: '',
    landUse: 'Residencial' as LandUse,
    services: '',
    description: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateDescription = async () => {
    setError(null);
    setIsGenerating(true);
    try {
      if (!process.env.API_KEY) {
        throw new Error("La clave de API no está configurada.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Crea una descripción de marketing atractiva y concisa para un terreno urbano en venta con las siguientes características:
        - Ubicación: ${formData.address || 'No especificada'}
        - Superficie total: ${formData.sqft || 'No especificada'} m²
        - Dimensiones: ${formData.frontage || 'No especificado'}m de frente por ${formData.depth || 'No especificado'}m de fondo
        - Uso de Suelo: ${formData.landUse || 'No especificado'}
        - Servicios disponibles: ${formData.services || 'No especificados'}

        Escribe en español de México. La descripción debe ser de 2 a 3 frases, destacando el potencial del terreno (para construir, para inversión, etc.), su ubicación y sus ventajas.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setFormData({ ...formData, description: response.text });
    } catch (err) {
      console.error("Error al generar descripción:", err);
      setError("No se pudo generar la descripción. Inténtelo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLandPlot: LandPlot = {
      id: Date.now(),
      address: formData.address,
      price: parseInt(formData.price, 10),
      sqft: parseInt(formData.sqft, 10),
      frontage: parseInt(formData.frontage, 10),
      depth: parseInt(formData.depth, 10),
      landUse: formData.landUse,
      services: formData.services.split(',').map(f => f.trim()).filter(f => f),
      description: formData.description,
      image: `https://picsum.photos/seed/land${Date.now()}/600/400`,
    };
    onAddLandPlot(newLandPlot);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-slate-200">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Poner un Terreno en Venta</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">Ubicación / Dirección</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700">Precio ($)</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
          </div>
           <div>
            <label htmlFor="sqft" className="block text-sm font-medium text-slate-700">Superficie (m²)</label>
            <input type="number" name="sqft" id="sqft" value={formData.sqft} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
          </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="frontage" className="block text-sm font-medium text-slate-700">Frente (m)</label>
            <input type="number" name="frontage" id="frontage" value={formData.frontage} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
          </div>
          <div>
            <label htmlFor="depth" className="block text-sm font-medium text-slate-700">Fondo (m)</label>
            <input type="number" name="depth" id="depth" value={formData.depth} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
          </div>
        </div>
         <div>
            <label htmlFor="landUse" className="block text-sm font-medium text-slate-700">Uso de Suelo</label>
            <select name="landUse" id="landUse" value={formData.landUse} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                <option>Residencial</option>
                <option>Comercial</option>
                <option>Mixto</option>
            </select>
         </div>
        <div>
          <label htmlFor="services" className="block text-sm font-medium text-slate-700">Servicios (separados por comas)</label>
          <input type="text" name="services" id="services" value={formData.services} onChange={handleChange} placeholder="Ej: Agua, Luz, Drenaje, Pavimento" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
          <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
           <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition">
             {isGenerating ? 'Generando...' : <><SparkleIcon /> Generar con IA</>}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="border-t border-slate-200 pt-6">
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition">
                Poner en Venta
            </button>
        </div>
      </form>
    </div>
  );
};