-- SQL script to create the database tables

-- Drop tables if they already exist
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;

-- Create accounts table
CREATE TABLE accounts (
    accountID SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    number VARCHAR(14) NOT NULL,
    address_1 VARCHAR(50) NOT NULL,
    address_2 VARCHAR(50) NULL,
    town VARCHAR(25) NOT NULL,
    postcode VARCHAR(9) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(5) NOT NULL
);

-- Create payments table
CREATE TABLE payments (
    paymentID SERIAL PRIMARY KEY,
    payment_type VARCHAR(4) NOT NULL,
    card_details VARCHAR(24)
);

-- Create orders table
CREATE TABLE orders (
    orderID SERIAL PRIMARY KEY,
    order_details LONGTEXT NOT NULL,
    total DECIMAL(10,2) UNSIGNED NOT NULL,
    date VARCHAR(8) NOT NULL,
    accountID BIGINT(20) UNSIGNED NULL,
    paymentID BIGINT(20) UNSIGNED NULL,
    CONSTRAINT FK_accountID FOREIGN KEY (accountID) REFERENCES accounts(accountID),
    CONSTRAINT FK_paymentID FOREIGN KEY (paymentID) REFERENCES payments(paymentID)
);

-- Create products table
CREATE TABLE products (
    productID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(5,2) UNSIGNED NOT NULL,
    image_URL LONGTEXT NULL,
    stock INT NOT NULL
);
