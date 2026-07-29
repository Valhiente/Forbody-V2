update public.units
set
  business_hours = '[
    {"day":"1","hours":"05:00-23:00"},
    {"day":"2","hours":"05:00-23:00"},
    {"day":"3","hours":"05:00-23:00"},
    {"day":"4","hours":"05:00-23:00"},
    {"day":"5","hours":"05:00-22:00"},
    {"day":"6","hours":"08:00-15:00"},
    {"day":"0","hours":"08:00-13:00"}
  ]'::jsonb,
  updated_at = now()
where status = 'active';

update public.units
set whatsapp = case slug
  when 'triunfo' then '5516994374366'
  when 'barao-do-bananal' then '5516997122560'
  when 'vila-virginia' then '5516992238286'
  when 'portinari' then '5516997102560'
  else whatsapp
end,
updated_at = now()
where slug in ('triunfo', 'barao-do-bananal', 'vila-virginia', 'portinari');

update public.units
set gallery_urls = '[
  {"category":"galeria","title":"Galeria Triunfo 1","imageUrl":"/images/units/triunfo/galeria/galeria-1.webp"},
  {"category":"galeria","title":"Galeria Triunfo 2","imageUrl":"/images/units/triunfo/galeria/galeria-2.webp"},
  {"category":"galeria","title":"Galeria Triunfo 3","imageUrl":"/images/units/triunfo/galeria/galeria-3.webp"},
  {"category":"galeria","title":"Galeria Triunfo 4","imageUrl":"/images/units/triunfo/galeria/galeria-4.webp"},
  {"category":"galeria","title":"Galeria Triunfo 5","imageUrl":"/images/units/triunfo/galeria/galeria-5.webp"},
  {"category":"galeria","title":"Galeria Triunfo 6","imageUrl":"/images/units/triunfo/galeria/galeria-6.webp"},
  {"category":"galeria","title":"Galeria Triunfo 7","imageUrl":"/images/units/triunfo/galeria/galeria-7.webp"},
  {"category":"galeria","title":"Galeria Triunfo 8","imageUrl":"/images/units/triunfo/galeria/galeria-8.webp"},
  {"category":"galeria","title":"Galeria Triunfo 9","imageUrl":"/images/units/triunfo/galeria/galeria-9.webp"},
  {"category":"forbodyshop","title":"ForbodyShop Triunfo","imageUrl":"/images/forbodyshop/forbodyshop-oficial.webp"}
]'::jsonb,
updated_at = now()
where slug = 'triunfo';

update public.units
set gallery_urls = '[
  {"category":"galeria","title":"Galeria Barão do Bananal 1","imageUrl":"/images/units/barao-do-bananal/galeria/galeria-1.webp"},
  {"category":"galeria","title":"Galeria Barão do Bananal 2","imageUrl":"/images/units/barao-do-bananal/galeria/galeria-2.webp"},
  {"category":"galeria","title":"Galeria Barão do Bananal 3","imageUrl":"/images/units/barao-do-bananal/galeria/galeria-3.webp"},
  {"category":"galeria","title":"Galeria Barão do Bananal 4","imageUrl":"/images/units/barao-do-bananal/galeria/galeria-4.webp"},
  {"category":"galeria","title":"Galeria Barão do Bananal 5","imageUrl":"/images/units/barao-do-bananal/galeria/galeria-5.webp"},
  {"category":"galeria","title":"Galeria Barão do Bananal 6","imageUrl":"/images/units/barao-do-bananal/galeria/galeria-6.webp"}
]'::jsonb,
updated_at = now()
where slug = 'barao-do-bananal';

update public.units
set gallery_urls = '[
  {"category":"galeria","title":"Galeria Vila Virgínia","imageUrl":"/images/units/vila-virginia/galeria/galeria-1.jpg"},
  {"category":"forbodyshop","title":"ForbodyShop Vila Virgínia","imageUrl":"/images/forbodyshop/forbodyshop-oficial.webp"}
]'::jsonb,
updated_at = now()
where slug = 'vila-virginia';

update public.units
set gallery_urls = '[
  {"category":"galeria","title":"Galeria Portinari 1","imageUrl":"/images/units/portinari/galeria/galeria-1.webp"},
  {"category":"galeria","title":"Galeria Portinari 2","imageUrl":"/images/units/portinari/galeria/galeria-2.webp"},
  {"category":"galeria","title":"Galeria Portinari 3","imageUrl":"/images/units/portinari/galeria/galeria-3.webp"},
  {"category":"galeria","title":"Galeria Portinari 4","imageUrl":"/images/units/portinari/galeria/galeria-4.webp"},
  {"category":"galeria","title":"Galeria Portinari 5","imageUrl":"/images/units/portinari/galeria/galeria-5.webp"}
]'::jsonb,
updated_at = now()
where slug = 'portinari';

update public.units
set
  name = 'Campo Belo',
  gallery_urls = '[
    {"category":"galeria","title":"Galeria Campo Belo 1","imageUrl":"/images/units/campo-belo/galeria/galeria-1.webp"},
    {"category":"galeria","title":"Galeria Campo Belo 2","imageUrl":"/images/units/campo-belo/galeria/galeria-2.webp"},
    {"category":"galeria","title":"Galeria Campo Belo 3","imageUrl":"/images/units/campo-belo/galeria/galeria-3.webp"},
    {"category":"galeria","title":"Galeria Campo Belo 4","imageUrl":"/images/units/campo-belo/galeria/galeria-4.webp"},
    {"category":"galeria","title":"Galeria Campo Belo 5","imageUrl":"/images/units/campo-belo/galeria/galeria-5.webp"}
  ]'::jsonb,
  updated_at = now()
where slug = 'campo-belo';
