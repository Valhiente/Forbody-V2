import React from 'react';
import { Differential } from '@/types';

export default function FeatureItem({ feature }: { feature: Differential }) {
  return (
    <li className="flex items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 mt-1">
        {/* Ícone padrão de check para diferenciais */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div className="ml-5">
        <h4 className="text-white font-semibold text-lg">{feature.title}</h4>
        <p className="text-gray-500 mt-1 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </li>
  );
}