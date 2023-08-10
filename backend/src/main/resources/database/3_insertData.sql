-- SQL script to insert initial data into tables

-- Create admin account in accounts table
INSERT INTO accounts(first_name, last_name, number, address_1, town, postcode, password, role)
VALUES ('Craig', 'Panton', '01234567890', '1 Kinsella Farm', 'Galston', 'AB1 2BC', 'fec00d8f940e22fa169573de0a7f7959f0b56192bf9b9734388f97b6357b05d4', 'admin');

-- Create default product listings in products table
INSERT INTO products(name, price, image_url, stock)
VALUES
    ('Whole Milk (1 Pint)',1.50,'/productImages/whole_milk_pint.jpg',100),
    ('Semi Skimmed Milk (1 Pint)',1.25,'/productImages/semi_milk_pint.jpg',100),
    ('Skimmed Milk (1 Pint)',1.25,'/productImages/skimmed_milk_pint.jpg',100),
    ('Organic Whole Milk (1 Pint)',2.50,'/productImages/organic_whole_milk_pint.jpg',100),
    ('Organic Semi Skimmed Milk (1 Pint)',2.25,'/productImages/organic_semi_milk_pint.jpg',100),
    ('Organic Skimmed Milk (1 Pint)',2.25,'/productImages/organic_skimmed_milk_pint.jpg',100),
    ('Eggs (6)',2.75,'/productImages/eggs_six.png',100),
    ('Orange Juice (1 Pint)',2.75,'/productImages/orange_juice_pint.jpg',100);