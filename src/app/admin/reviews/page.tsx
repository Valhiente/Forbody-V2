const cards = [
  { title: 'Avaliações', description: 'Monitorar comentários e classificações do público.' },
  { title: 'Respostas', description: 'Responder dúvidas e feedbacks diretamente do painel.' },
  { title: 'Métricas', description: 'Visão geral de reputação, avaliações e tendências.' },
];

export default function AdminReviewsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Reviews</p>
        <h1 className="mt-4 text-4xl font-black text-white">Feedback e Reviews</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-400">
          Acompanhe a reputação da rede ForBody e monitore a experiência dos clientes nas unidades.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 shadow-sm shadow-black/20">
            <h2 className="text-xl font-bold text-white">{card.title}</h2>
            <p className="mt-3 text-sm text-gray-400">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-red-600/20 bg-[#111] p-6 text-sm text-gray-400">
        <p className="font-semibold text-white">Próximos passos:</p>
        <p>Integração com review feeds, análises de satisfação e respostas automáticas.</p>
      </div>
    </div>
  );
}
