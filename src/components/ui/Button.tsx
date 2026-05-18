import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'b2c-primary' | 'b2b-primary' | 'b2b-outline' | 'unit-primary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ variant = 'b2c-primary', href, children, className = '', ...props }: ButtonProps) {
  // Dicionário de Estilos do Design System
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants: Record<ButtonVariant, string> = {
    // B2C: Explosivo, Itálico, Skew (Distorcido), Red Glow
    'b2c-primary': "px-10 py-5 bg-[#e30613] hover:bg-[#ff0a18] text-white font-black uppercase tracking-widest text-lg rounded-none skew-x-[-10deg] transform hover:scale-105 glow-b2c",
    
    // B2B: Luxo, Reto, Preto/Grafite, Autoridade
    'b2b-primary': "px-8 py-4 bg-[#99040d] text-white text-center font-bold hover:bg-[#e30613] rounded-sm uppercase tracking-wide shadow-b2b",
    'b2b-outline': "px-8 py-4 bg-transparent border border-gray-700 text-center text-gray-300 font-semibold hover:bg-white/5 hover:border-gray-500 rounded-sm uppercase tracking-wide",
    
    // UNIDADE: Acolhedor, Arredondado, Clean, Comunidade
    'unit-primary': "px-12 py-5 bg-[#e30613] hover:bg-[#cc0511] text-white font-bold uppercase tracking-wider text-sm rounded-md shadow-unit hover:-translate-y-1",
    
    // GENÉRICO: Links sutis
    'ghost': "px-4 py-2 bg-transparent text-gray-400 hover:text-white underline decoration-2 underline-offset-4 font-semibold uppercase tracking-wider text-xs",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  // Renderização condicional do skew text para B2C
  const content = variant === 'b2c-primary' ? (
    <span className="skew-x-[10deg] block">{children}</span>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>{content}</button>
  );
}