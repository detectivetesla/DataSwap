-- SQL Migration: Convert Role to ENUM and Fix RLS
-- Run this in your Supabase SQL Editor

-- 1. Create the ENUM type for roles
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('customer', 'admin');
    END IF;
END $$;

-- 2. Convert the role column to use the new ENUM type
-- This will make it a dropdown (select) in the Supabase Dashboard
ALTER TABLE public.users 
ALTER COLUMN role DROP DEFAULT;

ALTER TABLE public.users 
ALTER COLUMN role TYPE user_role 
USING role::user_role;

ALTER TABLE public.users 
ALTER COLUMN role SET DEFAULT 'customer'::user_role;

-- 3. Ensure RLS is enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies for Admin and User access
-- First, drop existing policies to avoid duplicates
DROP POLICY IF EXISTS "Admins can manage all users" ON public.users;
DROP POLICY IF EXISTS "Users can view own data" ON public.users;

-- Policy: Admins can do everything (Select, Insert, Update, Delete)
-- We check if the current user has the 'admin' role in the database
CREATE POLICY "Admins can manage all users" ON public.users
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Regular users can view their own record
CREATE POLICY "Users can view own data" ON public.users
FOR SELECT
USING (auth.uid() = id);

-- 5. Verification
-- Now when you tap on the 'role' column in the Supabase table view,
-- it should show a dropdown with 'customer' and 'admin' options.
