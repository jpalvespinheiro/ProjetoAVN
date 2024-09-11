# Projeto de Backend - Sistema de Gerenciamento de Clientes e Operadores

## Descrição

Este projeto é um sistema de gerenciamento de clientes e operadores desenvolvido em Node.js com TypeScript. Foi ultilizado o Sequelize para a interação com um banco de dados MySQL e inclui funcionalidades de CRUD (Create, Read, Update, Delete) para operadores e clientes, além da importação de dados via arquivos CSV.

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Sequelize**
- **MySQL**
- **dotenv**
- **cors**

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20)
- [MySQL](https://www.mysql.com/) (versão 8.3 )

## Instalação

1. **Clone o repositório:**
   ```bash
   https://github.com/jpalvespinheiro/ProjetoAVN.git

   cd backendAVN


2. **Instale as Dependências:**

    npm install

3. **Batch das tabelas do banco de dados**

    CREATE DATABASE projetoavn;


-- Criação da tabela Operators
    CREATE TABLE Operators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    );

-- Criação da tabela Clients
    CREATE TABLE Clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    operator_id INT,
    FOREIGN KEY (operator_id) REFERENCES Operators(id) ON DELETE SET NULL
    );


4. **Arquivo .env**

    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=nome_do_banco

5. **Endpoints Criados**

    Operadores

    GET /api/operators - Lista todos os operadores.
    POST /api/operators - Cria um novo operador.
    PUT /api/operators/:id - Atualiza um operador existente.
    DELETE /api/operators/:id - Deleta um operador.


    Clientes

    GET /api/clients - Lista todos os clientes.
    POST /api/clients - Cria um novo cliente.
    PUT /api/clients/:id - Atualiza um cliente existente.
    DELETE /api/clients/:id - Deleta um cliente.
    POST /api/clients/import - Importa clientes via CSV.

6. **Rodar o projeto**

    npm run dev









