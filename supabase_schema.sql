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

-- Create saved_filters table with all fields
create table saved_filters (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  type text not null check (type in ('company', 'person')) default 'person',
  firm_types text[],
  -- Company-specific fields
  firm_name text,
  city text,
  country text,
  region text,
  background text,
  year_est text,
  total_staff text,
  pe_main_firm_strategy text,
  pe_geographic_exposure text,
  -- Person-specific fields
  position text,
  location text,
  responsibilities text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add index for saved_filters
create index saved_filters_user_id_idx on saved_filters(user_id);
