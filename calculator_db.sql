DROP DATABASE IF EXISTS calculator_db;
CREATE DATABASE calculator_db;

USE calculator_db;

CREATE TABLE equations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  equation VARCHAR(255) NOT NULL,
  result DECIMAL(10, 2) NOT NULL
);

