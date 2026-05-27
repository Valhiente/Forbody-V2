'use client';

import Button from '@/components/ui/Button';

interface SectionItem {
  icon: string;
  label: string;
}

interface AdminSection {
  id: string;
  title: string;
  description: string;
  items: SectionItem[];
  buttonLabel: string;
}

const sections: AdminSection[] = [
  {
    id: 'home',
    title: 'Editar Home',
    description: 'Configure a página inicial do site ForBody',
    items: [
      { icon: '📝', label: 'Headline principal' },
      { icon: '📝', label: 'Subtítulo' },
      { icon: '🎯', label: 'CTA principal' },
      { icon: '🖼️', label: 'Imagem principal' },
    ],
    buttonLabel: 'Configurar Home',
  },
  {
    id: 'footer',
    title: 'Rodapé',
    description: 'Gerenciar informações do rodapé',
    items: [
      { icon: '📄', label: 'Texto institucional' },
      { icon: '📞', label: 'Contatos' },
      { icon: '🔗', label: 'Links sociais' },
      { icon: '⚖️', label: 'Políticas e termos' },
    ],
    buttonLabel: 'Configurar Rodapé',
  },
  {
    id: 'themes',
    title: 'Temas Visuais',
    description: 'Escolha o tema visual do site (preview sem aplicar)',
    items: [
      { icon: '⚫', label: 'Preto + Vermelho ForBody' },
      { icon: '🌙', label: 'Escuro Premium' },
      { icon: '♿', label: 'Alto Contraste' },
    ],
    buttonLabel: 'Escolher Tema',
  },
  {
    id: 'banners',
    title: 'Banners e Campanhas',
    description: 'Gerenciar banners e campanhas',
    items: [
      { icon: '🎨', label: 'Banner da home' },
      { icon: '🎉', label: 'Banner promocional' },
      { icon: '📢', label: 'Chamada de matrícula' },
    ],
    buttonLabel: 'Gerenciar Banners',
  },
  {
    id: 'carousel',
    title: 'Carrossel da Home',
    description: 'Planejar slides e CTAs',
    items: [
      { icon: '🎬', label: 'Slides principais' },
      { icon: '↔️', label: 'Ordem dos slides' },
      { icon: '🎯', label: 'CTA por slide' },
    ],
    buttonLabel: 'Planejar Carrossel',
  },
  {
    id: 'images',
    title: 'Imagens do Site',
    description: 'Gerenciar todas as imagens',
    items: [
      { icon: '🖼️', label: 'Imagem da home' },
      { icon: '🏢', label: 'Imagens das unidades' },
      { icon: '📸', label: 'Campanhas e promoções' },
    ],
    buttonLabel: 'Gerenciar Imagens',
  },
];

export default function AdminSitePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Site</p>
        <h1 className="mt-4 text-4xl font-black text-white">Gerenciador do Site</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-400">
          Central de controle visual do site ForBody. Configure home, rodapé, temas, banners, carrossel e imagens da
          plataforma.
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex flex-col rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl shadow-black/40 transition-all duration-300 hover:border-red-600/30 hover:shadow-red-600/10"
          >
            {/* Section Title */}
            <h2 className="text-xl font-black text-white">{section.title}</h2>
            <p className="mt-2 text-sm text-gray-400">{section.description}</p>

            {/* Divider */}
            <div className="my-4 h-px bg-gradient-to-r from-red-600/20 to-transparent" />

            {/* Items List */}
            <div className="space-y-3 flex-1">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg bg-black/30 px-3 py-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <Button variant="b2b-primary" disabled className="mt-6 w-full">
              {section.buttonLabel}
            </Button>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="rounded-3xl border border-red-600/20 bg-[#111] p-6 text-sm text-gray-400">
        <p className="font-semibold text-red-500">Status:</p>
        <p>
          Estrutura visual criada. Funcionalidades de edição, salvamento e upload serão adicionadas nas próximas fases.
        </p>
      </div>
    </div>
  );
}
