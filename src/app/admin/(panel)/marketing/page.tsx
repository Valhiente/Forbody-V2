import Link from 'next/link';
import { hasAdminPermission, requirePermission } from '@/lib/admin-auth';
import { MarketingHeader } from './components';

const primaryModules = [
  { number: '01', title: 'Página inicial', description: 'Altere a chamada principal, texto de apoio, botão e imagem do topo.', href: '/admin/marketing/home', action: 'Editar página inicial' },
  { number: '02', title: 'Cards da Home', description: 'Gerencie Estrutura, Professores e Aulas coletivas, com até três imagens em cada card.', href: '/admin/marketing/cards', action: 'Editar cards e imagens' },
  { number: '03', title: 'Planos', description: 'Atualize nomes, preços, descrições e benefícios dos planos RED e BLACK.', href: '/admin/marketing/planos', action: 'Editar planos' },
  { number: '04', title: 'Parceiros', description: 'Atualize logos, nomes, links e visibilidade das empresas parceiras.', href: '/admin/marketing/parceiros', action: 'Editar parceiros' },
  { number: '05', title: 'Promoções', description: 'Crie, publique ou desative campanhas promocionais exibidas na página inicial.', href: '/admin/marketing/promocoes', action: 'Editar promoções' },
];

export default async function MarketingHubPage() {
  const admin = await requirePermission('marketing.read');
  const canAccessUnits = hasAdminPermission(admin, 'units.read');
  const canAccessReviews = hasAdminPermission(admin, 'reviews.read');

  return (
    <div className="space-y-8 pb-12">
      <MarketingHeader
        eyebrow="Central de conteúdo"
        title="Marketing"
        description="Escolha exatamente a parte do site que deseja atualizar. Cada módulo salva suas próprias alterações sem interferir nas demais áreas."
        backHref=""
      />

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-black text-white">Conteúdo da página inicial</h2>
          <p className="mt-1 text-sm text-zinc-500">Textos, imagens e informações comerciais que aparecem na Home.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {primaryModules.map((module) => (
            <Link key={module.href} href={module.href} className="group flex min-h-56 flex-col rounded-3xl border border-white/10 bg-[#0b0b0b] p-6 transition hover:-translate-y-1 hover:border-red-600/50 hover:bg-red-600/[0.04]">
              <span className="text-xs font-black tracking-[0.28em] text-red-500">{module.number}</span>
              <h3 className="mt-5 text-2xl font-black text-white">{module.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{module.description}</p>
              <span className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-red-400 transition group-hover:text-red-300">{module.action} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-black text-white">Outras áreas públicas</h2>
          <p className="mt-1 text-sm text-zinc-500">Acessos diretos para conteúdos relacionados ao site.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {canAccessUnits ? (
            <Link href="/admin/unidades" className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-6 transition hover:border-red-600/40">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-500">Unidades</p>
              <h3 className="mt-3 text-xl font-black text-white">Dados e galerias das unidades</h3>
              <p className="mt-2 text-sm text-zinc-400">Endereço, horários, contatos, links, status e fotos de cada academia.</p>
            </Link>
          ) : null}
          {canAccessReviews ? (
            <Link href="/admin/reviews" className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-6 transition hover:border-red-600/40">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-500">Avaliações</p>
              <h3 className="mt-3 text-xl font-black text-white">Google Reviews</h3>
              <p className="mt-2 text-sm text-zinc-400">Acompanhe notas, quantidade de avaliações e integração das unidades.</p>
            </Link>
          ) : null}
        </div>
      </section>

      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-sm leading-relaxed text-blue-100">
        Dica: entre somente no módulo que deseja alterar. O botão de salvar de cada página atualiza apenas aquele conteúdo.
      </div>
    </div>
  );
}
