import type { Modality, Testimonial, Plan, Metric, Differential, Promotion, Unit } from './index';

// ==========================================
// BASE DE DADOS SIMULADA (MOCK DB - SUPABASE READY)
// ==========================================

export const activePromoData: Promotion = {
  id: 'promo-1', title: 'Condição Especial', tagline: 'Matrícula Zero', price: '1º Mês por R$ 9,90', isActive: true,
};

export const modalitiesData: Modality[] = [
  { id: 'musculacao', title: 'Musculação', description: 'Equipamentos importados com biomecânica perfeita.', imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'cross-training', title: 'Cross Training', description: 'Box oficial para treinos de alta intensidade e LPO.', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'fight-club', title: 'Fight Club', description: 'Octógono e tatame para Boxe, Muay Thai.', imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'cardio-hitech', title: 'Cardio Hi-Tech', description: 'Equipamentos com telas touch e percursos virtuais.', imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export const testimonialsData: Testimonial[] = [
  { id: 't1', name: 'Rafael S.', text: '"Estrutura impecável. O maquinário é importado, a iluminação te deixa no clima do treino."', avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80', rating: 5, offsetClass: '' },
  { id: 't2', name: 'Carlos M.', text: '"A melhor academia da região, sem dúvidas. Os professores realmente corrigem sua postura."', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', rating: 5, offsetClass: 'md:mt-8' },
  { id: 't3', name: 'Mariana C.', text: '"Treinava em outra rede e mudei pra ForBody pela vibe. O ambiente é focado em resultado, surreal."', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', rating: 5, offsetClass: 'md:mt-16' },
];

export const plansData: Plan[] = [
  { id: 'red', name: 'Plano RED', description: 'O essencial para o seu treino na sua unidade preferida.', ctaText: 'Assinar RED', checkoutUrl: 'https://evo-totem.w12app.com.br/fourbodyacademia/2/page/landing-page', features: ['Acesso total à musculação', 'Acesso em horário livre', 'Acesso a uma única unidade'], price: 99.90, originalPrice: 119.90, priceSuffix: '/mês' },
  { id: 'black', name: 'Plano BLACK', description: 'O mais completo. Acesso ilimitado a todo o ecossistema Forbody.', isHighlighted: true, highlightBadge: 'Mais Escolhido', ctaText: 'Assinar BLACK Agora', checkoutUrl: 'https://evo-totem.w12app.com.br/fourbodyacademia/2/page/landing-page', features: ['Musculação e Aulas Coletivas', 'Acesso a todas as unidades da rede', 'Avaliação física inclusa', 'Leve 5 convidados por mês para treinar'], price: 129.90, installments: 12, priceDisclaimer: 's/ juros no cartão' },
];

export const unitsData: Unit[] = [
  { id: 'u1', slug: 'ribeirao-preto', name: 'Ribeirão Preto', city: 'Ribeirão Preto', state: 'SP', evoId: 1, googleReviewsScore: 4.9, googleReviewsCount: 342, address: 'Av. Presidente Vargas, 1000 - Alto da Boa Vista', whatsapp: '16999999999', instagram: '@forbody.ribeirao', mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118386.6432924194!2d-47.886001!3d-21.196324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b620b7a8d5dbdb%3A0x6b8bc73426e6d1e4!2sRibeir%C3%A3o%20Preto%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr', businessHours: [{ day: 'Seg a Sex', hours: '05:00 - 23:00' }, { day: 'Sábados', hours: '08:00 - 18:00' }, { day: 'Domingos e Feriados', hours: '08:00 - 14:00' }], galleryUrls: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], teachers: [{ name: 'Lucas M.', role: 'Head Coach Lutas', avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80' }, { name: 'Sarah S.', role: 'Head Musculação', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' }] },
  { id: 'u2', slug: 'franca', name: 'Franca', city: 'Franca', state: 'SP', evoId: 2, googleReviewsScore: 4.8, googleReviewsCount: 215, address: 'Av. Doutor Ismael Alonso Y Alonso, 2000', whatsapp: '16988888888', instagram: '@forbody.franca', mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118386.6432924194!2d-47.886001!3d-21.196324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b620b7a8d5dbdb%3A0x6b8bc73426e6d1e4!2sFranca%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr', businessHours: [{ day: 'Seg a Sex', hours: '05:00 - 23:00' }, { day: 'Sábados', hours: '08:00 - 18:00' }], galleryUrls: ['https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], teachers: [] },
  { id: 'u3', slug: 'barretos', name: 'Barretos', city: 'Barretos', state: 'SP', evoId: 3, googleReviewsScore: 5.0, googleReviewsCount: 120, address: 'Av. Professor Roberto Frade Monte, 500', whatsapp: '17977777777', instagram: '@forbody.barretos', mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118386.6432924194!2d-47.886001!3d-21.196324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b620b7a8d5dbdb%3A0x6b8bc73426e6d1e4!2sBarretos%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr', businessHours: [{ day: 'Seg a Sex', hours: '05:30 - 22:30' }, { day: 'Sábados', hours: '08:00 - 14:00' }], galleryUrls: ['https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], teachers: [] }
];

export const metricsData: Metric[] = [
  { id: 'margin', value: '35%', label: 'Margem de Lucro', description: 'Operação enxuta e tecnologia embarcada (App + Coach AI).', iconSvg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
  { id: 'payback', value: '18-24', label: 'Meses de Payback', description: 'Retorno rápido suportado por pré-vendas estruturadas.', iconSvg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { id: 'growth', value: '+120%', label: 'Crescimento da Rede', description: 'Escala validada em mercados regionais.', iconSvg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg> }
];

export const differentialsData: Differential[] = [
  { id: 'tech', title: 'Ecossistema Tecnológico', description: 'App proprietário e controle de acessos facial.' },
  { id: 'mkt', title: 'Marketing Centralizado', description: 'Campanhas de captação digital rodando direto da matriz.' },
  { id: 'edu', title: 'Universidade Corporativa', description: 'Treinamento constante para seus professores.' }
];