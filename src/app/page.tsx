import Link from 'next/link';
import { ArrowRight, Zap, Dumbbell, Users, MapPin, Star } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION - Explosive, Energetic */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
          {/* Placeholder for dynamic hero background image */}
          <div className="w-full h-full bg-[#111] animate-pulse-slow relative">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(227,6,19,0.15),_transparent_50%)]" />
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start pt-20">
          <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full mb-6 var(--animate-fade-in)">
             <Zap size={16} className="text-[var(--color-forbody-red)]" />
             <span className="text-xs font-bold uppercase tracking-widest text-white">O seu limite é só o começo</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6 var(--animate-slide-up)">
            DESPERTE SUA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-forbody-red)] to-red-600">
              MELHOR VERSÃO.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 font-medium var(--animate-slide-up) delay-100">
            Estrutura de ponta, equipamentos premium e a energia que você precisa para alcançar resultados reais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto var(--animate-slide-up) delay-200">
            <Link href="/unidades" className="cta-button text-lg px-8 py-4">
              ENCONTRE SUA UNIDADE <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link href="/planos" className="flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
              VER PLANOS
            </Link>
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="bg-[var(--color-forbody-red)] py-4 overflow-hidden relative z-30">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <Star className="text-black fill-current mr-4" size={20} />
              <span className="text-black font-black text-xl uppercase tracking-wider">
                MATRÍCULA ZERO NESTE MÊS
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Por que a <span className="text-[var(--color-forbody-red)]">ForBody?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Tudo que você precisa para treinar pesado e com qualidade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="premium-card p-8 group">
              <div className="w-14 h-14 bg-[var(--color-forbody-red)]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--color-forbody-red)] group-hover:text-white transition-colors">
                <Dumbbell size={32} className="text-[var(--color-forbody-red)] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Equipamentos Premium</h3>
              <p className="text-gray-400 leading-relaxed">Máquinas importadas e biomecânica perfeita para o seu desenvolvimento muscular máximo.</p>
            </div>
            
            <div className="premium-card p-8 group">
              <div className="w-14 h-14 bg-[var(--color-forbody-red)]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--color-forbody-red)] group-hover:text-white transition-colors">
                <Users size={32} className="text-[var(--color-forbody-red)] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Profissionais Focados</h3>
              <p className="text-gray-400 leading-relaxed">Equipe altamente treinada para corrigir, motivar e garantir que você treine certo e seguro.</p>
            </div>

            <div className="premium-card p-8 group">
              <div className="w-14 h-14 bg-[var(--color-forbody-red)]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--color-forbody-red)] group-hover:text-white transition-colors">
                <Zap size={32} className="text-[var(--color-forbody-red)] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Aulas Exclusivas</h3>
              <p className="text-gray-400 leading-relaxed">Do HIIT ao Pilates. Modalidades variadas que mantêm seu corpo em constante evolução e quebra de platô.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA ENCONTRAR UNIDADE */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-forbody-red)]/10 via-black to-black opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
              Sua nova<br/>segunda casa.
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-lg">
              Com dezenas de unidades espalhadas, sempre tem uma ForBody perto de você pronta para te receber.
            </p>
            <Link href="/unidades" className="cta-button text-lg">
              <MapPin className="mr-2" size={20} /> VER UNIDADES NO MAPA
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <div className="w-full max-w-md aspect-square rounded-2xl glass-effect p-4 border border-white/10 relative overflow-hidden flex items-center justify-center">
              {/* Placeholder for Map or Unit Image */}
              <div className="absolute inset-0 bg-[#141414] opacity-80" />
              <MapPin size={64} className="text-gray-600 relative z-10" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent z-10">
                <p className="text-white font-bold text-lg">Descubra a mais próxima de você</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
