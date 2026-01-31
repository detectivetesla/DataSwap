-- SQL Migration: Add Agent Price and Validity to Bundles
-- Run this in your Supabase SQL Editor

-- 1. Add new columns to the bundles table
ALTER TABLE public.bundles 
ADD COLUMN IF NOT EXISTS agent_price_ghc DECIMAL(15, 2),
ADD COLUMN IF NOT EXISTS validity_days INTEGER DEFAULT 30;

-- 2. Populate new columns with initial data from existing columns where applicable
UPDATE public.bundles 
SET agent_price_ghc = price_ghc 
WHERE agent_price_ghc IS NULL;

-- 3. (Optional) Convert existing validity TEXT to validity_days if possible
-- This is a best-effort conversion.
UPDATE public.bundles
SET validity_days = CAST(substring(validity FROM '^[0-9]+') AS INTEGER)
WHERE validity ~ '^[0-9]+';
