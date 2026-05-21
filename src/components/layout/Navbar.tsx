"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Efeito para detectar o scroll e aplicar o background escuro/blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Unidades', path: '/unidades/triunfo' },
    { name: 'Investidor', path: '/investidor' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-black/90 backdrop-blur-md border-white/10 py-4 shadow-lg' : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-1 z-50 group">
          <span className="text-2xl font-black italic tracking-tighter text-white group-hover:text-gray-300 transition-colors">
            FOR<span className="text-red-600">BODY</span>
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.name} 
                href={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive ? 'text-red-600' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* BOTÃO CTA DESKTOP */}
        <div className="hidden md:block">
          <a 
            href="https://evo-totem.w12app.com.br/fourbodyacademia/2/page/landing-page/login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-white text-black font-black uppercase tracking-widest text-xs transition-all hover:bg-red-600 hover:text-white skew-x-[-10deg]"
          >
            <span className="skew-x-[10deg] block">Área do Aluno</span>
          </a>
        </div>

        {/* MENU MOBILE (HAMBURGUER) */}
        <button 
          className="md:hidden text-white z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {/* OVERLAY MENU MOBILE */}
      <div className={`fixed inset-0 bg-[#050505] z-40 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center gap-8 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-2xl font-black italic uppercase tracking-widest ${pathname === link.path ? 'text-red-600' : 'text-white'}`}
          >
            {link.name}
          </Link>
        ))}
        <a 
          href="https://evo-totem.w12app.com.br/fourbodyacademia/2/page/landing-page/login" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-8 px-10 py-4 bg-red-600 text-white font-black uppercase tracking-widest transition-all skew-x-[-10deg]"
        >
          <span className="skew-x-[10deg] block">Área do Aluno</span>
        </a>
      </div>

    </header>
  );
}