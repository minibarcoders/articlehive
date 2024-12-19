-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create guides table
create table public.guides (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  image_url text,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  author text not null,
  read_time text not null
);

-- Create reviews table
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  rating numeric not null check (rating >= 0 and rating <= 5),
  image_url text,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  author text not null,
  read_time text not null,
  pros text[] not null default '{}',
  cons text[] not null default '{}'
);

-- Set up RLS policies
alter table public.guides enable row level security;
alter table public.reviews enable row level security;

-- Allow public read access
create policy "Allow public read access on guides"
  on public.guides for select
  to public
  using (true);

create policy "Allow public read access on reviews"
  on public.reviews for select
  to public
  using (true);

-- Allow authenticated users to insert/update/delete
create policy "Allow authenticated users to modify guides"
  on public.guides for all
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated users to modify reviews"
  on public.reviews for all
  to authenticated
  using (true)
  with check (true);