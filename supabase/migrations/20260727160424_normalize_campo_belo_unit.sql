update public.units
set
  slug = 'campo-belo',
  location_url = 'https://www.google.com/maps/search/?api=1&query=R.%20Anderson%20Cipriano%20da%20Silva%2C%20160%20-%20Jardim%20Sao%20Domingos%2C%20Campinas%20-%20SP%2C%2013053-322',
  updated_at = now()
where id = 'u-Campo-Belo-Campinas-SP'
  and status = 'active';
