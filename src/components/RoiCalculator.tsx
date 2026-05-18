"use client";

import React, { useState } from 'react';

export default function RoiCalculator() {
  // Estados para os inputs da calculadora
  const [members, setMembers] = useState(1200);
  const [ticket, setTicket] = useState(149);
  const [investment, setInvestment] = useState(1500000);

  // Constantes de negócio baseadas na ForBody
  const profitMargin = 0.35; // Margem de lucro de 35% conforme documentado

  // Cálculos dinâmicos
  const monthlyRevenue = members * ticket;
  const monthlyProfit = monthlyRevenue * profitMargin;
  const annualProfit = monthlyProfit * 12;
  const paybackMonths = investment / monthlyProfit;

  // Formatador de moeda BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
      {/* Efeito de brilho de fundo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Lado Esquerdo: Controles (Sliders) */}
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-medium text-white mb-2">Simulador de <span className="text-red-600 italic font-bold">Retorno</span></h3>
            <p className="text-gray-400 text-sm">Ajuste as variáveis abaixo para simular a performance financeira da sua futura unidade.</p>
          </div>

          {/* Slider: Alunos */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Alunos Ativos</label>
              <span className="text-xl font-light text-white">{members} alunos</span>
            </div>
            <input 
              type="range" min="500" max="3000" step="50" value={members} 
              onChange={(e) => setMembers(Number(e.target.value))}
              className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
            />
          </div>

          {/* Slider: Ticket Médio */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Ticket Médio (Mensalidade)</label>
              <span className="text-xl font-light text-white">{formatCurrency(ticket)}/mês</span>
            </div>
            <input 
              type="range" min="89" max="299" step="10" value={ticket} 
              onChange={(e) => setTicket(Number(e.target.value))}
              className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
            />
          </div>

          {/* Slider: Investimento */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Investimento Inicial</label>
              <span className="text-xl font-light text-white">{formatCurrency(investment)}</span>
            </div>
            <input 
              type="range" min="800000" max="3000000" step="100000" value={investment} 
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
            />
          </div>
        </div>

        {/* Lado Direito: Resultados Financeiros */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-8 flex flex-col justify-center">
          <div className="space-y-8">
            
            <div className="border-b border-gray-800 pb-6">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Faturamento Mensal Estimado</div>
              <div className="text-4xl font-light text-white">{formatCurrency(monthlyRevenue)}</div>
            </div>
            
            <div className="border-b border-gray-800 pb-6">
              <div className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-2">Lucro Líquido Estimado (Mês)</div>
              <div className="text-5xl font-medium text-white tracking-tight">{formatCurrency(monthlyProfit)}</div>
              <div className="text-sm text-gray-500 mt-2">Baseado na eficiência operacional de {profitMargin * 100}%</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Lucro Anual</div>
                <div className="text-xl font-light text-white">{formatCurrency(annualProfit)}</div>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Payback (Retorno)</div>
                <div className="text-xl font-light text-white">
                  {isFinite(paybackMonths) ? `${Math.ceil(paybackMonths)} meses` : 'N/A'}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}