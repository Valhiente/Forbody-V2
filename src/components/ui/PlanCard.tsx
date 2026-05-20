import React from 'react';
import type { Plan } from '@/app';
import { formatCurrency } from '@/lib/utils';

export default function PlanCard({ plan }: { plan: Plan }) {
  const isHighlighted = plan.isHighlighted;
  const priceParts = formatCurrency(plan.price);

  return (
    <div className={`${isHighlighted ? 'bg-[#111] border-2 border-red-600 shadow-[0_0_40px_rgba(227,6,19,0.15)] md:-translate-y-4' : 'bg-[#0a0a0a] border border-gray-800 hover:border-gray-600'} p-8 md:p-10 flex flex-col relative transform transition-colors`}>
      
      {isHighlighted && plan.highlightBadge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white font-bold uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-sm">Mais Escolhido</div>
      )}

      <h3 className={`text-2xl font-black italic uppercase tracking-widest mb-2 ${isHighlighted ? 'text-red-600' : 'text-white'}`}>{plan.name}</h3>
      <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
      
      <div className="mb-8 border-b border-gray-800 pb-8">
        {isHighlighted && <div className="text-xs text-red-600 font-black uppercase tracking-widest mb-1 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> {plan.highlightBadge}</div>}
        
        {plan.originalPrice && <div className="text-sm text-gray-400 line-through mb-1">De R$ {plan.originalPrice.toFixed(2).replace('.', ',')}</div>}
        <div className="flex items-end gap-1">
          <span className="text-2xl font-bold text-gray-300">{plan.installments ? `${plan.installments}x R$` : 'R$'}</span>
          <span className="text-6xl font-black italic tracking-tighter text-white">{priceParts.int}</span>
          <span className="text-2xl font-bold text-gray-300">,{priceParts.dec}</span>
          {plan.priceSuffix && <span className="text-gray-500 text-sm mb-2 ml-1 font-bold">{plan.priceSuffix}</span>}
        </div>
        {plan.priceDisclaimer && <div className="text-gray-400 text-xs font-bold mt-2 uppercase tracking-wider">{plan.priceDisclaimer}</div>}
      </div>
      
      <ul className="space-y-4 mb-10 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className={`flex items-center gap-3 text-sm ${isHighlighted && idx === 0 ? 'text-gray-100 font-medium' : 'text-gray-300'}`}><svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>{feature}</li>
        ))}
      </ul>
      
      <a 
        href={plan.checkoutUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center w-full py-4 font-black uppercase tracking-widest transition-all skew-x-[-10deg] ${isHighlighted ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(227,6,19,0.3)]' : 'border-2 border-white hover:bg-white hover:text-black'}`}
      >
        <span className="skew-x-[10deg] block">{plan.ctaText}</span>
      </a>
    </div>
  );
}