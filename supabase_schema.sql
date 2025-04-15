-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Create favorite_companies table
create table favorite_companies (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  company_id text not null,
  name text not null,
  type text,
  aum text,
  added_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, company_id)
);

-- Add indexes for better query performance
create index favorite_companies_user_id_idx on favorite_companies(user_id);
create index favorite_companies_company_id_idx on favorite_companies(company_id);
