import Link from 'next/link';
import { unitsData } from '@/app/data';
import { getUnitStatusBadgeClasses, getUnitStatusLabel, isPubliclyVisible } from '@/utils/unit-status';

function whatsappLink(phone?: string) {
  if (!phone) return undefined;

  const digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;

  return `https://wa.me/${digits}`;
}

export default function UnitsPage() {
  const publicUnits = unitsData.filter(isPubliclyVisible);
  const activeUnits = publicUnits.filter((unit) => unit.status === 'active');
  const comingSoonUnits = publicUnits.filter((unit) => unit.status === 'coming_soon');
  const maintenanceUnits = publicUnits.filter((unit) => unit.status === 'maintenance');

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative pt-20 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.36em] text-red-600">UNIDADES FORBODY</p>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Escolha onde começa seu resultado</h1>
          <p className="mt-6 text-base text-slate-300 sm:text-lg">Matrícula, localização e contato direto com a unidade em poucos cliques.</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Sem desculpa. Escolha sua unidade.</p>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto pb-14">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">Unidades em funcionamento</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-400">Todas as unidades ativas com matrícula, localização e WhatsApp próprio.</p>
          </div>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.16em] text-slate-200">{activeUnits.length} unidades</span>
        </div>

        <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
          {activeUnits.map((unit) => {
            const unitWhatsappLink = whatsappLink(unit.whatsapp);

            return (
              <article
                key={unit.slug}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-6 transition hover:border-red-600"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-red-600" />
                <div className="relative ml-4 flex h-full flex-col justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-600">ATIVA</p>
                    <h3 className="mt-4 text-2xl font-black text-white">{unit.name}</h3>
                    <p className="mt-3 text-sm text-slate-400">{unit.city}, {unit.state}</p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">{unit.address}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-slate-400">Escolha como quer seguir</p>
                    <Link
                      href={`/unidades/${unit.slug}`}
                      className="inline-flex w-full items-center justify-center rounded-full bg-white/5 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-black"
                    >
                      Ver detalhes
                    </Link>

                    {unitWhatsappLink && (
                      <a
                        href={unitWhatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-full border border-red-600/40 bg-red-600 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-red-700"
                      >
                        Falar no WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {maintenanceUnits.length > 0 && (
        <section className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto pb-14">
          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tight text-white">Unidades em manutenção</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-400">Unidades temporariamente indisponíveis, mas ainda acompanhadas pelo time Forbody.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {maintenanceUnits.map((unit) => (
              <Link
                key={unit.slug}
                href={`/unidades/${unit.slug}`}
                className="group relative overflow-hidden rounded-[2rem] border border-orange-600/20 bg-white/5 p-6 transition hover:border-orange-500"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-orange-500/70" />
                <div className="relative ml-4 flex h-full flex-col justify-between gap-6">
                  <div>
                    <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${getUnitStatusBadgeClasses(unit.status)}`}>
                      {getUnitStatusLabel(unit.status)}
                    </p>
                    <h3 className="mt-4 text-2xl font-black text-white">{unit.name}</h3>
                    <p className="mt-3 text-sm text-slate-400">{unit.city}, {unit.state}</p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-500">Indisponível temporariamente.</p>
                  </div>

                  <span className="inline-flex w-full items-center justify-center rounded-full border border-orange-600/20 bg-orange-600/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-orange-300">Ver aviso</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto pb-20">
        <div className="mb-10">
          <h2 className="text-3xl font-black tracking-tight text-white">Em breve novas unidades</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-400">Fique de olho: novas unidades Forbody chegando em breve com a energia da nossa academia.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {comingSoonUnits.map((unit) => (
            <Link
              key={unit.slug}
              href={`/unidades/${unit.slug}`}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-red-600"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-red-600/30" />
              <div className="relative ml-4 flex h-full flex-col justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">EM BREVE</p>
                  <h3 className="mt-4 text-2xl font-black text-white">{unit.name}</h3>
                  <p className="mt-3 text-sm text-slate-400">{unit.city}, {unit.state}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">Endereço em breve</p>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-200 transition group-hover:border-red-600 group-hover:text-red-500">Quero ser avisado</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
