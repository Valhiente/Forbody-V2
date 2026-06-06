"use client";

import React, { useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjknoabd';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FranchiseLeadFormData {
  name: string;
  whatsapp: string;
  email: string;
  city: string;
  capital: string;
  message: string;
}

const initialFormData: FranchiseLeadFormData = {
  name: '',
  whatsapp: '',
  email: '',
  city: '',
  capital: '',
  message: '',
};

function validateName(name: string) {
  return name.trim().split(/\s+/).length >= 2;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
}

function validatePhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

function validateInvestment(value: string) {
  return value.trim().length > 0;
}

function buildErrorMessage(formData: FranchiseLeadFormData) {
  const errors: string[] = [];

  if (!validateName(formData.name)) errors.push('Insira seu Nome e Sobrenome.');
  if (!validateEmail(formData.email)) errors.push('Email inválido.');
  if (!validatePhone(formData.whatsapp)) errors.push('Telefone inválido.');
  if (!validateInvestment(formData.capital)) errors.push('Selecione o Capital para Investimento.');

  return errors.join(' ');
}

export default function FranchiseForm() {
  const [formData, setFormData] = useState<FranchiseLeadFormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationMessage = buildErrorMessage(formData);

    if (validationMessage) {
      setStatus('error');
      setFeedbackMessage(validationMessage);
      return;
    }

    setStatus('loading');
    setFeedbackMessage('Enviando...');

    const payload = new FormData();
    payload.append('Nome Completo', formData.name.trim());
    payload.append('Email', formData.email.trim());
    payload.append('Telefone', formData.whatsapp.trim());
    payload.append('Cidade/Estado', formData.city.trim());
    payload.append('Capital Estimado', formData.capital.trim());
    payload.append('Mensagem', formData.message.trim());
    payload.append('Origem', 'Forbody-V2 /franquias');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Formspree request failed');
      }

      setStatus('success');
      setFeedbackMessage(`Obrigado, ${formData.name.trim()}! Proposta enviada com sucesso.`);
      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setFeedbackMessage('Erro de conexão. Tente novamente.');
    }
  };

  const isLoading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Nome Completo</label>
          <input
            required
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors"
            placeholder="Seu nome e sobrenome"
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Telefone / WhatsApp</label>
          <input
            required
            id="whatsapp"
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors"
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Email</label>
          <input
            required
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors"
            placeholder="email@exemplo.com"
          />
        </div>

        <div>
          <label htmlFor="capital" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Capital Disponível para Investimento</label>
          <select
            required
            id="capital"
            name="capital"
            value={formData.capital}
            onChange={handleChange}
            className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors appearance-none"
          >
            <option value="">Selecione...</option>
            <option value="ate-250k">Até R$ 250.000</option>
            <option value="250k-500k">R$ 250.000 a R$ 500.000</option>
            <option value="acima-500k">Acima de R$ 500.000</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Cidade/Estado de Interesse</label>
        <input
          required
          id="city"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors"
          placeholder="Ex: Ribeirão Preto, SP"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Mensagem / Dúvidas</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full resize-none bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors"
          placeholder="Conte um pouco sobre seu interesse na franquia ForBody"
        />
      </div>

      {feedbackMessage && (
        <div
          className={`rounded border px-4 py-3 text-sm ${
            status === 'success'
              ? 'border-green-500/30 bg-green-500/10 text-green-300'
              : status === 'error'
                ? 'border-red-500/30 bg-red-500/10 text-red-300'
                : 'border-white/10 bg-white/5 text-gray-300'
          }`}
        >
          {feedbackMessage}
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(227,6,19,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Enviando...' : 'Enviar Proposta de Franquia'}
        </button>
        <p className="text-center text-gray-600 text-xs mt-4">Suas informações estão seguras. Não enviamos spam.</p>
      </div>
    </form>
  );
}
