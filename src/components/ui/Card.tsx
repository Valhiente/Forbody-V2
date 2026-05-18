import React from 'react';

type CardVariant = 'b2c-explosive' | 'b2b-luxury' | 'unit-clean';

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ variant = 'b2c-explosive', children, className = '' }: CardProps) {
  const baseStyles = "relative overflow-hidden transition-all duration-500";
  
  const variants: Record<CardVariant, string> = {
    // B2C: Escuro profundo, bordas finas hard, hover vermelho cortante
    'b2c-explosive': "bg-[#0a0a0a] border border-gray-800 p-8 group hover:border-[#e30613]/50 shadow-xl",
    
    // B2B: Grafite, Glassmorphism, Bordas contidas, Glow interno sutil no hover
    'b2b-luxury': "bg-[#141414] border border-gray-800 p-10 rounded-sm hover:border-[#99040d]/40 glow-b2b group",
    
    // UNIDADE: Branco/Claro, Cantos bem arredondados, Sombras suaves, Acolhedor
    'unit-clean': "bg-white p-8 md:p-12 rounded-2xl shadow-unit border border-gray-100",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</div>
  );
}
