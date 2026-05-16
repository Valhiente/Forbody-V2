import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-3xl font-black text-white tracking-tighter mb-6 block">
              FORBODY<span className="text-[var(--color-forbody-red)]">.</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              A maior e mais completa rede de academias. Transformando vidas através do movimento, saúde e performance.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-[var(--color-forbody-red)] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-forbody-red)] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-forbody-red)] transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Acesso Rápido</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Início</Link></li>
              <li><Link href="/unidades" className="text-gray-400 hover:text-white text-sm transition-colors">Encontre sua Unidade</Link></li>
              <li><Link href="/modalidades" className="text-gray-400 hover:text-white text-sm transition-colors">Modalidades</Link></li>
              <li><Link href="/planos" className="text-gray-400 hover:text-white text-sm transition-colors">Planos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Negócios</h4>
            <ul className="space-y-4">
              <li><Link href="/franquias" className="text-gray-400 hover:text-[var(--color-forbody-red)] text-sm transition-colors font-semibold">Seja um Franqueado</Link></li>
              <li><Link href="/trabalhe-conosco" className="text-gray-400 hover:text-white text-sm transition-colors">Trabalhe Conosco</Link></li>
              <li><Link href="/imprensa" className="text-gray-400 hover:text-white text-sm transition-colors">Imprensa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contato</h4>
            <ul className="space-y-4">
              <li className="text-gray-400 text-sm">contato@forbody.com.br</li>
              <li className="text-gray-400 text-sm">Central de Atendimento</li>
              <li className="text-gray-400 text-sm">FAQ e Suporte</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ForBody Academias. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacidade" className="text-gray-500 hover:text-white text-sm transition-colors">Política de Privacidade</Link>
            <Link href="/termos" className="text-gray-500 hover:text-white text-sm transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
