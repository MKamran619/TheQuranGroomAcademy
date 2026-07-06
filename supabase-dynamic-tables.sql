-- =============================================
-- Dynamic Site Settings, Nav Links, Footer Links
-- Run in Supabase SQL Editor
-- =============================================

-- 1. SITE SETTINGS (phone, email, address, socials, description)
create table if not exists site_settings (
  id         serial primary key,
  key        varchar(100) unique not null,
  value      text not null,
  created_at timestamptz default now()
);

alter table site_settings enable row level security;
create policy "Public read site_settings" on site_settings for select using (true);

insert into site_settings (key, value) values
  ('phone',            '+44 20 7946 0853'),
  ('phone_href',       '+442079460853'),
  ('email',            'info@thequrangroomacademy.com'),
  ('address_line1',    '128, City Road, London'),
  ('address_line2',    'EC1V 2NX, United Kingdom'),
  ('footer_tagline',   'Dedicated exclusively to women & children — qualified female teachers, personalised one-on-one classes from the comfort of your home.'),
  ('facebook_url',     'https://facebook.com/thequrangroomacademy'),
  ('instagram_url',    'https://instagram.com/thequrangroomacademy'),
  ('youtube_url',      'https://youtube.com/@thequrangroomacademy'),
  ('twitter_url',      'https://twitter.com/qurangrooma'),
  ('cta_button_label', 'Free Trial Class'),
  ('cta_button_link',  '/contact')
on conflict (key) do nothing;


-- 2. NAV LINKS
create table if not exists nav_links (
  id         serial primary key,
  label      varchar(100) not null,
  path       varchar(200) not null,
  sort_order int default 0,
  is_active  boolean default true
);

alter table nav_links enable row level security;
create policy "Public read nav_links" on nav_links for select using (true);

insert into nav_links (label, path, sort_order) values
  ('Home',       '/',        1),
  ('Courses',    '/courses', 2),
  ('Read Quran', '/quran',   3),
  ('Pricing',    '/pricing', 4),
  ('About',      '/about',   5),
  ('FAQ',        '/faq',     6),
  ('Contact',    '/contact', 7);


-- 3. FOOTER LINKS
create table if not exists footer_links (
  id         serial primary key,
  section    varchar(50) not null,  -- 'discover', 'courses', 'help'
  label      varchar(100) not null,
  path       varchar(200) not null,
  sort_order int default 0,
  is_active  boolean default true
);

alter table footer_links enable row level security;
create policy "Public read footer_links" on footer_links for select using (true);

insert into footer_links (section, label, path, sort_order) values
  -- Discover
  ('discover', 'About Us',   '/about',   1),
  ('discover', 'Our Method', '/about',   2),
  ('discover', 'Our Tutors', '/about',   3),
  ('discover', 'Blog',       '/about',   4),
  -- Courses
  ('courses',  'Noorani Qaida',              '/courses', 1),
  ('courses',  'Quran Reading',              '/courses', 2),
  ('courses',  'Quran Reading with Tajweed', '/courses', 3),
  ('courses',  'Hifz-ul-Quran',             '/courses', 4),
  ('courses',  'Islamic Studies',            '/courses', 5),
  ('courses',  'Quran Translation',          '/courses', 6),
  -- Help
  ('help',     'FAQ',              '/faq',     1),
  ('help',     'Contact Us',       '/contact', 2),
  ('help',     'Privacy Policy',   '/privacy', 3),
  ('help',     'Terms of Service', '/terms',   4);
