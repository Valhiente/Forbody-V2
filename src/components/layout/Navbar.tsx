import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black text-white tracking-tighter">
              FORBODY
              <span className="text-[var(--color-forbody-red)]">.</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">Início</Link>
            <Link href="/unidades" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">Unidades</Link>
            <Link href="/franquias" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">Franquias</Link>
            <Link href="/unidades" className="cta-button">
              Matricule-se
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-white p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
