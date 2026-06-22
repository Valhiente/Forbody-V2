import type { Modality, Testimonial, Plan, Metric, Differential, Promotion, Unit } from './index';

export const activePromoData: Promotion = {
  id: 'promo-1',
  title: 'Condição Especial',
  tagline: 'Matrícula Zero',
  price: '1º Mês por R$ 9,90',
  isActive: true,
};

export const modalitiesData: Modality[] = [
  { id: 'musculacao', title: 'Musculação', description: 'Estrutura completa para treinar melhor.', imageUrl: '/images/units/triunfo.jpg' },
];

export const testimonialsData: Testimonial[] = [
  { id: 't1', name: 'Aluno Forbody', text: '"Ambiente organizado."', avatarUrl: '/images/units/triunfo.jpg', rating: 5 },
];

export const plansData: Plan[] = [
  { id: 'red', name: 'Plano RED', description: 'Plano de entrada.', ctaText: 'Escolher RED', features: ['Musculação'], price: 99.90, checkoutUrl: '#' },
  { id: 'black', name: 'Plano BLACK', description: 'Plano completo.', ctaText: 'Escolher BLACK', features: ['Musculação', 'Aulas coletivas'], price: 109.90, checkoutUrl: '#' },
];

export const unitsData: Unit[] = [
  {
    id: 'u1',
    slug: 'ribeirao-preto',
    name: 'Ribeirão Preto',
    city: 'Ribeirão Preto',
    state: 'SP',
    evoId: 1,
    googleReviewsScore: 4.9,
    googleReviewsCount: 342,
    address: 'Av. Presidente Vargas, 1000 - Alto da Boa Vista',
    whatsapp: '16999999999',
    instagram: '@forbody.ribeirao',
    mapEmbedUrl: '',
    businessHours: [
      { day: '1', hours: '05:00-23:00' },
      { day: '2', hours: '05:00-23:00' },
      { day: '3', hours: '05:00-23:00' },
      { day: '4', hours: '05:00-23:00' },
      { day: '5', hours: '05:00-22:00' },
      { day: '6', hours: '08:00-15:00' },
      { day: '0', hours: '08:00-13:00' },
    ],
    galleryUrls: [
      { category: 'galeria', title: 'Galeria Ribeirão Preto', imageUrl: '/images/units/triunfo.jpg' },
      { category: 'forbodyshop', title: 'ForbodyShop Ribeirão Preto', imageUrl: '/images/units/triunfo.jpg' },
    ],
    teachers: [],
  },
];

export const metricsData: Metric[] = [
  { id: 'margin', value: '35%', label: 'Margem de Lucro', description: 'Operação enxuta.', iconSvg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18" /></svg> },
];

export const differentialsData: Differential[] = [
  { id: 'tech', title: 'Tecnologia', description: 'Gestão e operação integradas.' },
];
