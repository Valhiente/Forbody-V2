"use client";

import React, { useState } from 'react';

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
  const emailPattern = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
  return emailPattern.test(email.trim().toLowerCase());
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

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function FranchiseForm() {
  const [formData, setFormData] = useState<FranchiseLeadFormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [startedAt] = useState(() => Date.now());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: name === 'whatsapp' ? formatPhone(value) : value,
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
    setFeedbackMessage('Enviando proposta...');

    try {
      const response = await fetch('/api/franquia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          whatsapp: formData.whatsapp.trim(),
          city: formData.city.trim(),
          capital: formData.capital.trim(),
          message: formData.message.trim(),
          origin: 'Forbody-V2 /franquias',
          website: '',
          startedAt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar proposta.');
      }

      setStatus('success');
      setFeedbackMessage(`Obrigado, ${formData.name.trim()}! Sua proposta foi enviada com sucesso.`);
      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setFeedbackMessage(error instanceof Error ? error.message : 'Erro de conexão. Tente novamente.');
    }
  };

  const isLoading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
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
            <option value="Até R$ 50.000">Até R$ 50.000</option>
            <option value="R$ 50.000 a R$ 100.000">R$ 50.000 a R$ 100.000</option>
            <option value="R$ 100.000 a R$ 200.000">R$ 100.000 a R$ 200.000</option>
            <option value="R$ 200.000 a R$ 500.000">R$ 200.000 a R$ 500.000</option>
            <option value="Mais de R$ 500.000">Mais de R$ 500.000</option>
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
        <label htmlFor="message" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Apresentação Pessoal / Dúvidas</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full resize-none bg-[#111] border border-gray-800 rounded px-4 py-3.5 text-white focus:outline-none focus:border-red-600 focus:bg-[#141414] transition-colors"
          placeholder="Conte um pouco sobre sua trajetória profissional e seu interesse na franquia ForBody"
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
