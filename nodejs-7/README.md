# Criando uma API de animais para adoção

Vamos criar uma API REST para gerenciar animais disponíveis para adoção. Nesse desafio, vamos criar um CRUD (Create, Read, Update, Delete) para a entidade `animals`.

## Tópicos

Neste desafio, você aprenderá:

- NodeJS
- APIs REST com Express
- MySQL
- Sequelize
- Testar APIs

## Requisitos
​
Para este desafio, você precisará de:

- NodeJS LTS (8.12.0+)
- Jest (npm install jest -g)
- Docker

## Detalhes

O arquivo `docker-compose.yml` está configurado com o necessário para iniciar o banco de dados MariaDB, já com o banco `codenation`. Para iniciar o banco, execute o comando:

```
$ docker-compose up -d
```

Nenhuma tabela foi criada nesse banco e parte do desafio é prover o esquema da tabela `animals` através do ORM Sequelize. A estrutura da tabela deve seguir o proposto:

```
id: INT (Primary Key, Unique Key, Auto incremento)
pet_name: VARCHAR(255)
description: TEXT
animal_type: ENUM('Cão', 'Gato', 'Outros')
pet_age: INT
pet_size: ENUM('Grande', 'Médio', 'Pequeno')
sex: ENUM('Macho', 'Fêmea')
color: VARCHAR(255)
image_url: VARCHAR(255)
```

Para criar a tabela `animals` no banco `codenation`, você deverá primeiro implementar o esquema da tabela no arquivo `src/model/animals.js`, corrigir as credenciais de acesso ao banco no arquivo `model/index.js` e executar o seguinte comando na sequência:

```
$ node bin/syncDB
```


A API deve conter os seguintes endpoints:

## /v1/animals

Método: GET

Retorna a lista de animais para adoção cadastrados.

Resposta:

StatusCode: 200
```json
{
  total: 1,
  data: [
    {
      id: Number,
      pet_name: String,
      description: String,
      animal_type: String,
      pet_age: Number,
      pet_size: String,
      sex: String,
      color: String,
      image_url: String,
      createdAt: Date,
      updatedAt: Date
    }
  ]
}
```

## /v1/animals/:animalId

Método: GET

Retorna o animal cadastrado para o parâmetro referido (animalId)

Resposta:

StatusCode: 200
```json
{
  id: Number,
  pet_name: String,
  description: String,
  animal_type: String,
  pet_age: Number,
  pet_size: String,
  sex: String,
  color: String,
  image_url: String,
  createdAt: Date,
  updatedAt: Date
}
```

## /v1/animals

Método: POST

Cria um novo cadastro de animal (todos os campos são obrigatórios, exceto o campo `pet_age`).

Corpo aceito:
```json
{
  pet_name: String,
  description: String,
  animal_type: String,
  pet_age: Number,
  pet_size: String,
  sex: String,
  color: String,
  image_url: String,
}
```

Resposta:
StatusCode: 201
```json
{
  id: Number,
  pet_name: String,
  description: String,
  animal_type: String,
  pet_age: Number,
  pet_size: String,
  sex: String,
  color: String,
  image_url: String,
  createdAt: Date,
  updatedAt: Date
}
```

## /v1/animals/:animalId

Método: PATCH

Atualiza os dados de cadastro do animal referido no parâmetro `animalId`. Os campos a serem atualizados são opcionais, com exceção do campo `id`, claro.

Corpo aceito:
```json
{
  pet_name: String,
  description: String,
  animal_type: String,
  pet_age: Number,
  pet_size: String,
  sex: String,
  color: String,
  image_url: String,
}
```

Resposta:
StatusCode: 200
```json
{}
```

## /v1/animals/:animalId

Método: DELETE

Remove o recurso determinado pelo parâmetro `animalId`.

Resposta:
StatusCode: 204

Obs.: Tente usar o mínimo de bibliotecas possível.
