import type { Modality, Testimonial, Plan, Unit, UnitBusinessHour } from './index';

const defaultBusinessHours: UnitBusinessHour[] = [
  { day: '1', hours: '05:00-23:00' },
  { day: '2', hours: '05:00-23:00' },
  { day: '3', hours: '05:00-23:00' },
  { day: '4', hours: '05:00-23:00' },
  { day: '5', hours: '05:00-22:00' },
  { day: '6', hours: '08:00-15:00' },
  { day: '0', hours: '08:00-13:00' },
];

export const modalitiesData: Modality[] = [
  { id: 'musculacao', title: 'Musculação', description: 'Estrutura completa para treinar melhor.', imageUrl: '/images/units/triunfo.jpg' },
  { id: 'aulas', title: 'Aulas coletivas', description: 'Mais energia e constância para sua rotina.', imageUrl: '/images/units/barao-do-bananal.jpg' },
  { id: 'professores', title: 'Professores presentes', description: 'Apoio técnico para seu treino.', imageUrl: '/images/units/vila-virginia.jpg' },
  { id: 'cardio', title: 'Cardio', description: 'Estrutura para saúde e condicionamento.', imageUrl: '/images/units/portinari.jpg' },
];

export const testimonialsData: Testimonial[] = [
  { id: 't1', name: 'Aluno Forbody', text: '"Ambiente organizado e equipe presente."', avatarUrl: '/images/units/triunfo.jpg', rating: 5, offsetClass: '' },
  { id: 't2', name: 'Aluno Forbody', text: '"Estrutura boa para manter constância."', avatarUrl: '/images/units/barao-do-bananal.jpg', rating: 5, offsetClass: 'md:mt-8' },
  { id: 't3', name: 'Aluno Forbody', text: '"Unidade bem localizada e equipe atenciosa."', avatarUrl: '/images/units/vila-virginia.jpg', rating: 5, offsetClass: 'md:mt-16' },
];

export const plansData: Plan[] = [
  { id: 'red', name: 'Plano RED', description: 'Musculação com apoio técnico.', ctaText: 'Escolher RED', features: ['Musculação', 'Aplicativo', 'Apoio técnico'], price: 99.90, priceSuffix: '/mês', checkoutUrl: '#' },
  { id: 'black', name: 'Plano BLACK', description: 'Plano completo para aproveitar mais.', isHighlighted: true, highlightBadge: 'Mais completo', ctaText: 'Escolher BLACK', features: ['Musculação', 'Aulas coletivas', 'Bioimpedância', 'Convidados', 'Acesso às unidades'], price: 109.90, priceSuffix: '/mês', checkoutUrl: '#' },
];

export const unitsData: Unit[] = [
  {
    id: 'u-triunfo', slug: 'triunfo', name: 'Triunfo', city: 'Ribeirão Preto', state: 'SP', evoId: 1, evoUnitId: 1, salesUrl: '#', studentAreaUrl: '#', locationUrl: '#', status: 'active', googleReviewsScore: 4.7, googleReviewsCount: 48, address: 'R. Triunfo, 385 - Santa Cruz do Jose Jacques, Ribeirão Preto - SP', whatsapp: '5516994374366', imageUrl: '/images/units/triunfo.jpg', instagram: '@forbody.triunfo', mapEmbedUrl: '', businessHours: defaultBusinessHours,
    galleryUrls: [
      { category: 'galeria', title: 'Galeria Triunfo 1', imageUrl: '/images/units/triunfo/galeria/galeria-1.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 2', imageUrl: '/images/units/triunfo/galeria/galeria-2.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 3', imageUrl: '/images/units/triunfo/galeria/galeria-3.jpg' },
      { category: 'forbodyshop', title: 'ForbodyShop Triunfo', imageUrl: '/images/units/triunfo/forbodyshop/forbodyshop-1.jpg' },
    ], teachers: [], googlePlaceId: ''
  },
  {
    id: 'u-barao', slug: 'barao-do-bananal', name: 'Barão do Bananal', city: 'Ribeirão Preto', state: 'SP', evoId: 2, evoUnitId: 2, salesUrl: '#', studentAreaUrl: '#', locationUrl: '#', status: 'active', googleReviewsScore: 4.6, googleReviewsCount: 30, address: 'Av. Barão do Bananal, 820 - Chácara São João, Ribeirão Preto - SP', whatsapp: '5516997122560', imageUrl: '/images/units/barao-do-bananal.jpg', instagram: '@forbody.barao', mapEmbedUrl: '', businessHours: defaultBusinessHours,
    galleryUrls: [
      { category: 'galeria', title: 'Galeria Barão do Bananal', imageUrl: '/images/units/barao-do-bananal/galeria/galeria-1.jpg' },
      { category: 'forbodyshop', title: 'ForbodyShop Barão do Bananal', imageUrl: '/images/units/barao-do-bananal/forbodyshop/forbodyshop-1.jpg' },
    ], teachers: [], googlePlaceId: ''
  },
  {
    id: 'u-vila-virginia', slug: 'vila-virginia', name: 'Vila Virgínia', city: 'Ribeirão Preto', state: 'SP', evoId: 3, evoUnitId: 3, salesUrl: '#', studentAreaUrl: '#', locationUrl: '#', status: 'active', googleReviewsScore: 4.5, googleReviewsCount: 25, address: 'R. Franco da Rocha, 1370 - Vila Virginia, Ribeirão Preto - SP', whatsapp: '5516992238286', imageUrl: '/images/units/vila-virginia.jpg', instagram: '@forbody.vilavirg', mapEmbedUrl: '', businessHours: defaultBusinessHours,
    galleryUrls: [
      { category: 'galeria', title: 'Galeria Vila Virgínia', imageUrl: '/images/units/vila-virginia/galeria/galeria-1.jpg' },
      { category: 'forbodyshop', title: 'ForbodyShop Vila Virgínia', imageUrl: '/images/units/vila-virginia/forbodyshop/forbodyshop-1.jpg' },
    ], teachers: [], googlePlaceId: ''
  },
  {
    id: 'u-portinari', slug: 'portinari', name: 'Portinari', city: 'Ribeirão Preto', state: 'SP', evoId: 4, evoUnitId: 4, salesUrl: '#', studentAreaUrl: '#', locationUrl: '#', status: 'active', googleReviewsScore: 4.4, googleReviewsCount: 18, address: 'Av. Nelson Ferreira De Melo, 365 - Candido Portinari, Ribeirão Preto - SP', whatsapp: '5516997102560', imageUrl: '/images/units/portinari.jpg', instagram: '@forbody.portinari', mapEmbedUrl: '', businessHours: defaultBusinessHours,
    galleryUrls: [
      { category: 'galeria', title: 'Galeria Portinari', imageUrl: '/images/units/portinari/galeria/galeria-1.jpg' },
      { category: 'forbodyshop', title: 'ForbodyShop Portinari', imageUrl: '/images/units/portinari/forbodyshop/forbodyshop-1.jpg' },
    ], teachers: [], googlePlaceId: ''
  },
  { id: 'u-nova-rp-1', slug: 'nova-unidade-ribeirao-preto-1', name: 'Nova Unidade Ribeirão Preto 1', city: 'Ribeirão Preto', state: 'SP', evoId: 0, salesUrl: '#', studentAreaUrl: '#', status: 'coming_soon', googleReviewsScore: 0, googleReviewsCount: 0, address: 'Endereço em breve', whatsapp: '', instagram: '', mapEmbedUrl: '', businessHours: [], galleryUrls: [], teachers: [], locationUrl: '#', googlePlaceId: '' },
  { id: 'u-nova-rp-2', slug: 'nova-unidade-ribeirao-preto-2', name: 'Nova Unidade Ribeirão Preto 2', city: 'Ribeirão Preto', state: 'SP', evoId: 0, salesUrl: '#', studentAreaUrl: '#', status: 'coming_soon', googleReviewsScore: 0, googleReviewsCount: 0, address: 'Endereço em breve', whatsapp: '', instagram: '', mapEmbedUrl: '', businessHours: [], galleryUrls: [], teachers: [], locationUrl: '#', googlePlaceId: '' },
  { id: 'u-nova-rp-3', slug: 'nova-unidade-ribeirao-preto-3', name: 'Nova Unidade Ribeirão Preto 3', city: 'Ribeirão Preto', state: 'SP', evoId: 0, salesUrl: '#', studentAreaUrl: '#', status: 'coming_soon', googleReviewsScore: 0, googleReviewsCount: 0, address: 'Endereço em breve', whatsapp: '', instagram: '', mapEmbedUrl: '', businessHours: [], galleryUrls: [], teachers: [], locationUrl: '#', googlePlaceId: '' }
];
