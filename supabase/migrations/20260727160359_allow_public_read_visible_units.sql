create policy "Public visible units are viewable"
on public.units
for select
to anon, authenticated
using (status is distinct from 'hidden');
