import React from 'react';
import Link from 'next/link';

const instagramUrl = 'https://www.instagram.com/forbodyacademia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-black italic tracking-tighter text-white">
                FOR<span className="text-red-600">BODY</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              Academia com estrutura completa, professores presentes, planos acessíveis e ambiente preparado para acompanhar sua evolução todos os dias.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/unidades" className="rounded-sm border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-red-600 hover:bg-red-600/10">
                Ver unidades
              </Link>
              <Link href="/franquias" className="rounded-sm bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700">
                Seja um franqueado
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-red-600 transition-colors">Home</Link></li>
              <li><Link href="/unidades" className="hover:text-red-600 transition-colors">Unidades</Link></li>
              <li><Link href="/franquias" className="hover:text-red-600 transition-colors">Seja um franqueado</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contato</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:contato@forbodyacademia.com.br" className="hover:text-red-600 transition-colors">contato@forbodyacademia.com.br</a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram Forbody">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Forbody. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-gray-600 text-xs">
            <Link href="/unidades" className="hover:text-white transition-colors">Unidades</Link>
            <Link href="/franquias" className="hover:text-white transition-colors">Franquias</Link>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
