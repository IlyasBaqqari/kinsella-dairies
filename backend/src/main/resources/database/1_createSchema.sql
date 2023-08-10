-- SQL script to create the database and administrator profile

-- Initialise database
DROP DATABASE IF EXISTS kinsella_dairies;
CREATE SCHEMA IF NOT EXISTS kinsella_dairies DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

-- Initialise administrator profile
DROP USER IF EXISTS 'kinsella_dairies_admin'@localhost;
CREATE USER IF NOT EXISTS 'kinsella_dairies_admin'@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON kinsella_dairies.* TO 'kinsella_dairies_admin'@localhost IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
