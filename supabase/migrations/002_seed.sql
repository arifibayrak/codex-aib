insert into startups (id, name, website, hq_country)
values
  ('11111111-1111-1111-1111-111111111111', 'HelioGrid', 'https://heliogrid.ai', 'US'),
  ('22222222-2222-2222-2222-222222222222', 'CarePulse', 'https://carepulse.health', 'UK')
on conflict do nothing;
