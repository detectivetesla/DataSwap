-- Seed Data for Bundles
-- Cleaning up existing bundles
DELETE FROM bundles;

-- MTN Bundles
INSERT INTO bundles (network, name, data_amount, price_ghc, is_active) VALUES
('MTN', '1GB Data', '1GB', 5.00, true),
('MTN', '2.5GB Data', '2.5GB', 10.00, true),
('MTN', '5GB Data', '5GB', 20.00, true),
('MTN', '10GB Data', '10GB', 40.00, true),
('MTN', '20GB Data', '20GB', 75.00, true);

-- Telecel Bundles
INSERT INTO bundles (network, name, data_amount, price_ghc, is_active) VALUES
('Telecel', '1GB Data', '1GB', 4.50, true),
('Telecel', '3GB Data', '3GB', 12.00, true),
('Telecel', '5GB Data', '5GB', 18.00, true),
('Telecel', '10GB Data', '10GB', 35.00, true);

-- AirtelTigo Bundles
INSERT INTO bundles (network, name, data_amount, price_ghc, is_active) VALUES
('AirtelTigo', '1.5GB Data', '1.5GB', 5.00, true),
('AirtelTigo', '4GB Data', '4GB', 12.00, true),
('AirtelTigo', '7GB Data', '7GB', 20.00, true),
('AirtelTigo', '15GB Data', '15GB', 40.00, true);
