-- Tables for saved filters and favorites

-- Create table for saved filters
CREATE TABLE IF NOT EXISTS public.saved_filters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  firm_types TEXT[] DEFAULT '{}',
  company_name TEXT,
  position TEXT,
  location TEXT,
  responsibilities TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS saved_filters_user_id_idx ON public.saved_filters(user_id);

-- Add RLS policies for saved_filters
ALTER TABLE public.saved_filters ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to select their own filters
CREATE POLICY saved_filters_select_policy ON public.saved_filters 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to insert their own filters
CREATE POLICY saved_filters_insert_policy ON public.saved_filters 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own filters
CREATE POLICY saved_filters_update_policy ON public.saved_filters 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy to allow users to delete their own filters
CREATE POLICY saved_filters_delete_policy ON public.saved_filters 
  FOR DELETE USING (auth.uid() = user_id);

-- Create table for favorites
CREATE TABLE IF NOT EXISTS public.favorite_persons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_id TEXT NOT NULL,
  name TEXT NOT NULL,
  position TEXT,
  company TEXT,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, contact_id)
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS favorite_persons_user_id_idx ON public.favorite_persons(user_id);

-- Add RLS policies for favorite_persons
ALTER TABLE public.favorite_persons ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to select their own favorites
CREATE POLICY favorite_persons_select_policy ON public.favorite_persons 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to insert their own favorites
CREATE POLICY favorite_persons_insert_policy ON public.favorite_persons 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own favorites
CREATE POLICY favorite_persons_update_policy ON public.favorite_persons 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy to allow users to delete their own favorites
CREATE POLICY favorite_persons_delete_policy ON public.favorite_persons 
  FOR DELETE USING (auth.uid() = user_id); 