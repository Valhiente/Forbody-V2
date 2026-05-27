'use client';

export default function AdminSitePage() {
  const sections = [
    {
      id: 'home',
      title: 'Editar Home',
      description: 'Configure a página inicial do site ForBody',
      items: [
        'Headline principal',
        'Subtítulo',
        'CTA principal',
        'Imagem principal',
      ],
      buttonLabel: 'Configurar Home',
    },
    {
      id: 'footer',
      title: 'Rodapé',
      description: 'Gerenciar informações do rodapé',
      items: [
        'Texto institucional',
        'Contatos',
        'Links sociais',
        'Políticas e termos',
      ],
      buttonLabel: 'Configurar Rodapé',
    },
    {
      id: 'themes',
      title: 'Temas Visuais',
      description: 'Escolha o tema visual do site',
      items: [
        'Preto + Vermelho ForBody',
        'Escuro Premium',
        'Alto Contraste',
      ],
      buttonLabel: 'Escolher Tema',
    },
    {
      id: 'banners',
      title: 'Banners e Campanhas',
      description: 'Gerenciar banners e campanhas',
      items: [
        'Banner da home',
        'Banner promocional',
        'Chamada de matrícula',
      ],
      buttonLabel: 'Gerenciar Banners',
    },
    {
      id: 'carousel',
      title: 'Carrossel da Home',
      description: 'Planejar slides e CTAs',
      items: [
        'Slides principais',
        'Ordem dos slides',
        'CTA por slide',
      ],
      buttonLabel: 'Planejar Carrossel',
    },
    {
      id: 'images',
      title: 'Imagens do Site',
      description: 'Gerenciar todas as imagens',
      items: [
        'Imagem da home',
        'Imagens das unidades',
        'Campanhas e promoções',
      ],
      buttonLabel: 'Gerenciar Imagens',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Site</p>
        <h1 className="mt-4 text-4xl font-black text-white">Gerenciar Site</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-400">
          Central de controle visual do site ForBody. Configure home, rodapé, temas, banners, carrossel e imagens da plataforma.
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex flex-col rounded-3xl border border-white/10 bg-[#0d0d0d] p-8 shadow-sm shadow-black/20 transition hover:border-red-600/20 hover:bg-red-600/5"
          >
            {/* Section Title */}
            <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            <p className="mt-2 text-sm text-gray-400">{section.description}</p>

            {/* Items List */}
            <ul className="mt-6 space-y-3 flex-1">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-red-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Action Button */}
            <button
              disabled
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl border border-red-600/30 bg-red-600/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-red-400 transition hover:border-red-600/50 hover:bg-red-600/20 disabled:opacity-50"
            >
              {section.buttonLabel}
            </button>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="rounded-3xl border border-yellow-600/20 bg-yellow-600/5 p-6">
        <p className="text-sm text-gray-300">
          <span className="font-bold text-yellow-500">ℹ️ Nota:</span> Os controles visuais estão em construção. 
          Configurações e salvamento estarão disponíveis em breve.
        </p>
      </div>
    </div>
  );
}
