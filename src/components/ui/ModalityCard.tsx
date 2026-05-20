import React from 'react';
import { Modality } from '@/app';

export default function ModalityCard({ modality }: { modality: Modality }) {
  return (
    <div className="group relative h-[400px] overflow-hidden cursor-pointer border border-white/5">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        style={{ backgroundImage: `url('${modality.imageUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="text-2xl font-black italic uppercase tracking-wider mb-2 group-hover:text-red-600 transition-colors">{modality.title}</h3>
        <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">{modality.description}</p>
      </div>
    </div>
  );
}