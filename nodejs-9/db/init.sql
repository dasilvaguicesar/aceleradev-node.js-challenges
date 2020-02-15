CREATE TABLE IF NOT EXISTS students_production (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255),
  email VARCHAR(255),
  age INT,
  gender ENUM('Masculino', 'Feminino', 'Outro', 'Não quero informar'),
  class VARCHAR(255),
  is_employed BOOLEAN,
  city VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS students_test (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255),
  email VARCHAR(255),
  age INT,
  gender ENUM('Masculino', 'Feminino', 'Outro', 'Não quero informar'),
  class VARCHAR(255),
  is_employed BOOLEAN,
  city VARCHAR(255)
);
