DROP DATABASE IF EXISTS business_db;

CREATE DATABASE busincess_db; 

USE business_db

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL 
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  roles_id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
); 
