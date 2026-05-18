import React from 'react';

type HeadingVariant = 'b2c-hero' | 'b2c-section' | 'b2b-hero' | 'b2b-section' | 'unit-hero' | 'unit-section';
type ElementTag = 'h1' | 'h2' | 'h3' | 'h4';

interface HeadingProps {
  as?: ElementTag;
  variant?: HeadingVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Heading({ as: Tag = 'h2', variant = 'b2c-section', children, className = '' }: HeadingProps) {
  const variants: Record<HeadingVariant, string> = {
    // B2C: Agressivo, Caixa Alta, Itálico, Black
    'b2c-hero': "text-6xl md:text-9xl font-black italic tracking-tighter uppercase text-gradient-b2c",
    'b2c-section': "text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white",
    
    // B2B: Luxuoso, Clean, Peso Médio/Light, Tracking fechado
    'b2b-hero': "text-5xl md:text-6xl font-medium tracking-tight leading-tight text-white",
    'b2b-section': "text-3xl md:text-4xl font-medium tracking-tight text-white",
    
    // UNIDADE: Acolhedor, Caixa Baixa (Capitalize), Bold mas não Black
    'unit-hero': "text-4xl md:text-5xl font-bold tracking-normal text-black capitalize",
    'unit-section': "text-2xl md:text-3xl font-bold tracking-normal text-gray-900",
  };

  // Processador de Highlight automático (Transforma <em> em vermelho da marca)
  const processChildren = () => {
    if (typeof children !== 'string') return children;
    return children; 
    // Em uma implementação avançada, poderíamos fazer parse de strings para colorir palavras chave, 
    // mas vamos manter o controle com o desenvolvedor passando <span>.
  };

  return <Tag className={`${variants[variant]} ${className}`}>{children}</Tag>;
}