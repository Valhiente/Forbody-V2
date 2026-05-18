"use client";

import React, { useState } from 'react';

export default function FranchiseForm() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    capital: '',
    city: ''
  });
  
  // Estados da simulação da API
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // SIMULAÇÃO DE API: Aguarda 2 segundos para simular envio ao servidor
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      /* 
        FUTURO: Quando for integrar com API real (ex: Formspree, CRM), o código será algo como:
        await fetch('https://formspree.io/f/seu-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      */

      setStatus('success');
      setFormData({ name: '', whatsapp: '', email: '', capital: '', city: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  // TELA DE SUCESSO PÓS-ENVIO
  if (status === 'success') {
    return (
      <div className="text-center py-10 px-6 animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">Apresentação Liberada!</h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Recebemos seus dados. Nossa diretoria de expansão entrará em contato em breve através do WhatsApp informado.
        </p>
        <button 
          onClick={() => setStatus('idle')} 
          className="px-8 py-3 border border-gray-700 text-gray-400 rounded hover:bg-white/5 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
        >
          Enviar Nova Solicitação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Nome Completo</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors" placeholder="Seu nome" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">WhatsApp</label>
          <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors" placeholder="(00) 00000-0000" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">E-mail Corporativo</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors" placeholder="email@exemplo.com" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Capital Disponível</label>
          <select required name="capital" value={formData.capital} onChange={handleChange} className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors appearance-none">
            <option value="">Selecione o valor de investimento</option>
            <option value="500k-1m">R$ 500.000 a R$ 1.000.000</option>
            <option value="1m-2m">R$ 1.000.000 a R$ 2.000.000</option>
            <option value="2m+">Acima de R$ 2.000.000</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Cidade/Estado de Interesse</label>
        <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors" placeholder="Ex: Ribeirão Preto, SP" />
      </div>
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-3 py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(227,6,19,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Processando...' : 'Solicitar Contato Comercial'}
        </button>
        {status === 'error' && <p className="text-red-500 text-xs mt-4 text-center">Ocorreu um erro ao enviar. Tente novamente.</p>}
        <p className="text-center text-gray-600 text-xs mt-4">Suas informações estão seguras. Não enviamos spam.</p>
      </div>
    </form>
  );
}