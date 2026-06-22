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
    googleReviews: [
      { authorName: 'João Victor Silva', rating: 5, text: 'Academia muito boa, equipamentos bem cuidados, com muita variedade e professores muito bons e atenciosos.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Jhoseph93', rating: 5, text: 'Estrutura excelente para treino de musculação e uma ótima opção para quem gosta de artes marciais.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'André Luis Castro Vani Silva', rating: 5, text: 'Custo-benefício excelente, aparelhos modernos, atendimento acima da média e ambiente climatizado.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Wildes Barbosa', rating: 5, text: 'Ambiente organizado, impecavelmente limpo, aparelhos novos e instrutores preparados e dispostos a ajudar.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Sebastião Perez', rating: 5, text: 'Academia com aparelhos muito novos, bastante instrutores para auxiliar e excelente localização.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Samuel Valim', rating: 5, text: 'Aparelhos novos e instrutores atenciosos. Me ajudaram no treino mesmo estando só de passagem.', relativeTimeDescription: 'Avaliação Google' },
    ],
    galleryUrls: [
      { category: 'galeria', title: 'Galeria Triunfo 1', imageUrl: '/images/units/triunfo/galeria/galeria-1.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 2', imageUrl: '/images/units/triunfo/galeria/galeria-2.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 3', imageUrl: '/images/units/triunfo/galeria/galeria-3.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 4', imageUrl: '/images/units/triunfo/galeria/galeria-4.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 5', imageUrl: '/images/units/triunfo/galeria/galeria-5.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 6', imageUrl: '/images/units/triunfo/galeria/galeria-6.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 7', imageUrl: '/images/units/triunfo/galeria/galeria-7.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 8', imageUrl: '/images/units/triunfo/galeria/galeria-8.jpg' },
      { category: 'galeria', title: 'Galeria Triunfo 9', imageUrl: '/images/units/triunfo/galeria/galeria-9.jpg' },
      { category: 'forbodyshop', title: 'ForbodyShop Triunfo', imageUrl: '/images/units/triunfo/forbodyshop/forbodyshop-1.jpg' },
    ], teachers: [], googlePlaceId: 'ChIJXZTIhbq_uZQRvvgjq08MRcc'
  },
  {
    id: 'u-barao', slug: 'barao-do-bananal', name: 'Barão do Bananal', city: 'Ribeirão Preto', state: 'SP', evoId: 2, evoUnitId: 2, salesUrl: '#', studentAreaUrl: '#', locationUrl: '#', status: 'active', googleReviewsScore: 4.6, googleReviewsCount: 30, address: 'Av. Barão do Bananal, 820 - Chácara São João, Ribeirão Preto - SP', whatsapp: '5516997122560', imageUrl: '/images/units/barao-do-bananal.jpg', instagram: '@forbody.barao', mapEmbedUrl: '', businessHours: defaultBusinessHours,
    googleReviews: [
      { authorName: 'Marcelo Custodio', rating: 5, text: 'Academia muito boa. Ampla, com bastante aparelhos e funcionários atenciosos.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Meire Teixeira', rating: 5, text: 'Atendimento faz toda a diferença. Adoro a academia e recomendo.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Kalil Schindler', rating: 5, text: 'Excelente ambiente, profissionais qualificados e aparelhos novos.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Jane Alexandrini', rating: 5, text: 'Excelente atendimento, variedade de equipamentos, ambiente limpo e estacionamento amplo.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Joyce Gomes', rating: 5, text: 'Academia climatizada, acolhedora, com estacionamento próprio e excelente atendimento.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Rodjunio Alessio', rating: 5, text: 'Ótimo ambiente, aparelhos bons e grande variedade.', relativeTimeDescription: 'Avaliação Google' },
    ],
    galleryUrls: [
      { category: 'galeria', title: 'Galeria Barão do Bananal', imageUrl: '/images/units/barao-do-bananal/galeria/galeria-1.jpg' },
      { category: 'forbodyshop', title: 'ForbodyShop Barão do Bananal', imageUrl: '/images/units/barao-do-bananal/forbodyshop/forbodyshop-1.jpg' },
    ], teachers: [], googlePlaceId: 'ChIJwVOXprm_uZQREFsgGHIf8y4'
  },
  {
    id: 'u-vila-virginia', slug: 'vila-virginia', name: 'Vila Virgínia', city: 'Ribeirão Preto', state: 'SP', evoId: 3, evoUnitId: 3, salesUrl: '#', studentAreaUrl: '#', locationUrl: '#', status: 'active', googleReviewsScore: 4.5, googleReviewsCount: 25, address: 'R. Franco da Rocha, 1370 - Vila Virginia, Ribeirão Preto - SP', whatsapp: '5516992238286', imageUrl: '/images/units/vila-virginia.jpg', instagram: '@forbody.vilavirg', mapEmbedUrl: '', businessHours: defaultBusinessHours,
    googleReviews: [
      { authorName: 'Andreia Bueno', rating: 5, text: 'Profissionais super educados e atenciosos, aparelhos excelentes e horários flexíveis para atender todo mundo.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Bianca Mundin', rating: 5, text: 'Me senti super acolhida desde o primeiro dia. Pessoal muito atencioso, aparelhos bons e profissionais excelentes.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Rafael Barbosa', rating: 5, text: 'Ambiente agradável, organizado e motivador. Simplesmente excelente.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'José Ramos', rating: 5, text: 'Minha experiência está sendo excelente. Aqui encontrei acompanhamento e apoio para continuar evoluindo.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Caroline Cristina Oliveira Ribeiro', rating: 5, text: 'Aparelhos novos, ambiente animado, profissionais incríveis e resultados reais na saúde.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Luciana Fernandes', rating: 5, text: 'Profissionais simpáticos, tratamento excelente com os alunos e aparelhos muito bem cuidados.', relativeTimeDescription: 'Avaliação Google' },
    ],
    galleryUrls: [
      { category: 'galeria', title: 'Galeria Vila Virgínia', imageUrl: '/images/units/vila-virginia/galeria/galeria-1.jpg' },
      { category: 'forbodyshop', title: 'ForbodyShop Vila Virgínia', imageUrl: '/images/units/vila-virginia/forbodyshop/forbodyshop-1.jpg' },
    ], teachers: [], googlePlaceId: 'ChIJjx8pfwC_uZQRt8MeuNMo8aA'
  },
  {
    id: 'u-portinari', slug: 'portinari', name: 'Portinari', city: 'Ribeirão Preto', state: 'SP', evoId: 4, evoUnitId: 4, salesUrl: '#', studentAreaUrl: '#', locationUrl: '#', status: 'active', googleReviewsScore: 4.4, googleReviewsCount: 18, address: 'Av. Nelson Ferreira De Melo, 365 - Candido Portinari, Ribeirão Preto - SP', whatsapp: '5516997102560', imageUrl: '/images/units/portinari.jpg', instagram: '@forbody.portinari', mapEmbedUrl: '', businessHours: defaultBusinessHours,
    googleReviews: [
      { authorName: 'Giovanna Zipparro', rating: 5, text: 'Ambiente limpo, organizado, espaçoso e com equipamentos modernos. Equipe extremamente atenciosa e educada.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Grete Ferreira', rating: 5, text: 'Ambiente acolhedor, equipe maravilhosa e atendimento extremamente carinhoso.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Marcelo Martinho', rating: 5, text: 'Academia top, professoras excelentes.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Wesley A', rating: 5, text: 'Muitos equipamentos, todos funcionando perfeitamente, ambiente tranquilo e excelente estrutura para cardio.', relativeTimeDescription: 'Avaliação Google' },
      { authorName: 'Rodrigo Felício', rating: 5, text: 'Academia top de linha, equipamentos de ponta, estacionamento prático e limpeza impecável.', relativeTimeDescription: 'Avaliação Google' },
    ],
    galleryUrls: [
      { category: 'galeria', title: 'Galeria Portinari', imageUrl: '/images/units/portinari/galeria/galeria-1.jpg' },
      { category: 'forbodyshop', title: 'ForbodyShop Portinari', imageUrl: '/images/units/portinari/forbodyshop/forbodyshop-1.jpg' },
    ], teachers: [], googlePlaceId: 'ChIJNegEDqjBuZQRsXJxQT9NpTo'
  },
  { id: 'u-nova-rp-1', slug: 'nova-unidade-ribeirao-preto-1', name: 'Nova Unidade Ribeirão Preto 1', city: 'Ribeirão Preto', state: 'SP', evoId: 0, salesUrl: '#', studentAreaUrl: '#', status: 'coming_soon', googleReviewsScore: 0, googleReviewsCount: 0, address: 'Endereço em breve', whatsapp: '', instagram: '', mapEmbedUrl: '', businessHours: [], galleryUrls: [], teachers: [], locationUrl: '#', googlePlaceId: '' },
  { id: 'u-nova-rp-2', slug: 'nova-unidade-ribeirao-preto-2', name: 'Nova Unidade Ribeirão Preto 2', city: 'Ribeirão Preto', state: 'SP', evoId: 0, salesUrl: '#', studentAreaUrl: '#', status: 'coming_soon', googleReviewsScore: 0, googleReviewsCount: 0, address: 'Endereço em breve', whatsapp: '', instagram: '', mapEmbedUrl: '', businessHours: [], galleryUrls: [], teachers: [], locationUrl: '#', googlePlaceId: '' },
  { id: 'u-nova-rp-3', slug: 'nova-unidade-ribeirao-preto-3', name: 'Nova Unidade Ribeirão Preto 3', city: 'Ribeirão Preto', state: 'SP', evoId: 0, salesUrl: '#', studentAreaUrl: '#', status: 'coming_soon', googleReviewsScore: 0, googleReviewsCount: 0, address: 'Endereço em breve', whatsapp: '', instagram: '', mapEmbedUrl: '', businessHours: [], galleryUrls: [], teachers: [], locationUrl: '#', googlePlaceId: '' }
];
