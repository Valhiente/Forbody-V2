import React from 'react';
import RoiCalculator from '@/components/RoiCalculator';
import FranchiseForm from '@/components/FranchiseForm';

export default function FranchiseB2B() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-200">
      
      {/* 1. HERO SECTION - CORPORATIVO PREMIUM */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-red-600"></div>
              <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Modelo de Negócio ForBody</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-6 leading-tight text-white">
              Solidez, Tecnologia e <span className="text-red-600 font-bold italic">Rentabilidade.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Junte-se à rede fitness que mais cresce. Um modelo de franquia blindado, projetado para multiplicadores de capital, com gestão orientada a dados e ecossistema proprietário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#formulario" className="px-8 py-4 bg-red-600 text-white text-center font-bold hover:bg-red-700 transition-colors rounded-sm uppercase tracking-wide shadow-lg shadow-red-900/20">
                Seja um Franqueado
              </a>
              <a href="#numeros" className="px-8 py-4 bg-transparent border border-gray-700 text-center text-gray-300 font-semibold hover:bg-white/5 hover:border-gray-500 transition-colors rounded-sm uppercase tracking-wide">
                Ver Indicadores
              </a>
            </div>
          </div>
          <div className="relative hidden lg:block">
            {/* Imagem de Fundo Premium (Abstrato Corporativo) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent z-10"></div>
            <div className="h-[500px] w-full bg-[#111] rounded border border-gray-800 shadow-2xl overflow-hidden relative flex flex-col justify-end p-8">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity grayscale"></div>
              <div className="relative z-20 backdrop-blur-md bg-black/60 border border-white/10 p-6 rounded-md inline-block max-w-sm">
                <div className="text-3xl font-light text-white mb-1">R$ 1.5M+</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Faturamento Médio Anual Previsto</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MÉTRICAS / NÚMEROS (Baseado no legacy_html Mercado) */}
      <section id="numeros" className="py-24 px-6 bg-[#0d0d0d] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">Métricas de <span className="text-red-600 font-bold italic">Performance</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Números que comprovam a eficiência operacional do nosso ecossistema e a segurança para o seu investimento a longo prazo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Margem */}
            <div className="bg-[#141414] border border-gray-800 p-10 rounded hover:border-red-600/40 transition-colors group">
              <div className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity text-red-600">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 className="text-5xl font-light text-white mb-2">35%</h3>
              <div className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-4">Margem de Lucro</div>
              <p className="text-gray-500 text-sm leading-relaxed">Operação enxuta e tecnologia embarcada (App + Coach AI) reduzem o custo fixo operacional da unidade.</p>
            </div>
            
            {/* Card 2: Payback */}
            <div className="bg-[#141414] border border-gray-800 p-10 rounded hover:border-red-600/40 transition-colors group">
              <div className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity text-red-600">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="text-5xl font-light text-white mb-2">18-24</h3>
              <div className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-4">Meses de Payback</div>
              <p className="text-gray-500 text-sm leading-relaxed">Retorno rápido do capital investido suportado pelo nosso método agressivo de pré-vendas estruturadas.</p>
            </div>
            
            {/* Card 3: Crescimento */}
            <div className="bg-[#141414] border border-gray-800 p-10 rounded hover:border-red-600/40 transition-colors group">
              <div className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity text-red-600">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
              </div>
              <h3 className="text-5xl font-light text-white mb-2">+120%</h3>
              <div className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-4">Crescimento da Rede</div>
              <p className="text-gray-500 text-sm leading-relaxed">Escala validada em mercados regionais, transformando franqueados de uma unidade em multifranqueados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIFERENCIAIS DA FRANQUEADORA (Suporte B2B) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">O Poder da Franquia <span className="text-red-600 font-bold italic">ForBody</span></h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Ao investir, você não abre apenas uma academia. Você acopla sua operação a um hub corporativo de tecnologia, marketing digital de alta conversão e suporte jurídico/financeiro.
            </p>
            <ul className="space-y-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="ml-5">
                  <h4 className="text-white font-semibold text-lg">Ecossistema Tecnológico</h4>
                  <p className="text-gray-500 mt-1 text-sm leading-relaxed">App proprietário, controle de acessos facial e esteira de e-mails automatizada para retenção (LTV).</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="ml-5">
                  <h4 className="text-white font-semibold text-lg">Marketing Centralizado</h4>
                  <p className="text-gray-500 mt-1 text-sm leading-relaxed">Nossa matriz roda as campanhas de captação digital locais, entregando leads quentes diretamente para o seu balcão.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="ml-5">
                  <h4 className="text-white font-semibold text-lg">Universidade Corporativa</h4>
                  <p className="text-gray-500 mt-1 text-sm leading-relaxed">Treinamento constante para seus professores e recepcionistas. Garantia de padronização no atendimento.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {/* Imagens corporativas para gerar autoridade e confiança */}
             <div className="h-[300px] bg-[#111] rounded border border-gray-800 overflow-hidden relative">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700"></div>
             </div>
             <div className="h-[300px] bg-[#111] rounded border border-gray-800 overflow-hidden relative mt-16">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700"></div>
             </div>
          </div>
        </div>
      </section>
      
      {/* CALCULADORA DE ROI INTERATIVA */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:text-center">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">Projete seus <span className="text-red-600 font-bold italic">Resultados</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Utilize nossa calculadora interativa baseada em dados reais das nossas unidades operacionais.</p>
          </div>
          <RoiCalculator />
        </div>
      </section>

      {/* 4. FORMULÁRIO DE CAPTAÇÃO / LEAD B2B */}
      <section id="formulario" className="py-24 px-6 bg-[#0a0a0a] border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto bg-[#111] border border-gray-800 p-10 md:p-16 rounded-xl shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-3">Receba a Apresentação Oficial</h2>
            <p className="text-gray-400">Preencha os dados abaixo para conversar diretamente com nossa diretoria de expansão.</p>
          </div>
          <FranchiseForm />
        </div>
      </section>

    </main>
  );
}