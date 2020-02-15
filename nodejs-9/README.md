# Criando uma API de estudantes da Codenation

A Codenation precisa de uma API REST para gerenciar os alunos dos Bootcamps. Nesse desafio, vamos criar um CRUD (Create, Read, Update, Delete) para a entidade `students`.

## Tópicos

Neste desafio você aprenderá:

- NodeJS
- APIs REST com Express
- MySQL
- Testar APIs

## Requisitos
​
Para este desafio você precisará de:

- NodeJS LTS (8.12.0+)
- Jest (npm install jest -g)
- Docker
- Docker Compose

## Detalhes

O arquivo `docker-compose.yml` está configurado com o necessário para iniciar o banco de dados MariaDB, já com o banco `codenation` e as tabelas `students_production` e `students_test` (para fins de testes de integração), seguindo o seguinte esquema:

```
id: INT (Primary Key, Unique Key, Auto incremento)
name: VARCHAR(255)
surname: VARCHAR(255)
email: VARCHAR(255)
age: INT
gender: ENUM('Masculino', 'Feminino', 'Outro', 'Não quero informar')
class: VARCHAR(255)
isEmployed: BOOLEAN
city: VARCHAR(255)
```

Para iniciar o banco, execute o comando:

```
$ docker-compose up -d
```

Você deve implementar a solução no arquivo `/src/controllers/index.js`, onde tem os métodos com os parâmetros de `request` e `response`. No arquivo `/db/helper.js` tem alguns métodos que podem ser úteis na construção das queries e na execução assíncrona delas, leia esse arquivo com atenção. Também deixamos o arquivo `/test/server.test.js` para caso você queira implementar seus próprios testes de integração para a API desenvolvida no desafio. Esse arquivo não será levado em consideração para a nota do desafio, mas lembre-se da importância de escrever testes!

**Observação:**

Para submeter o desafio, o banco de dados definido pelo arquivo docker-compose.yml deve estar rodando (docker-compose up -d). 

Um excelente desafio para você! 🔥🔥🔥

## A API deve conter os seguintes endpoints:

#### /v1/students

Método: GET

Retorna a lista de estudantes cadastrados.

Resposta:

StatusCode: 200
```json
{
  total: 1,
  data: [
    {
      id: Number,
      name: String,
      surname: String,
      email: String,
      age: Number,
      gender: String,
      class: String,
      isEmployed: Boolean,
      city: String
    }
  ]
}
```

### /v1/students/:studentId

Método: GET

Retorna o estudante cadastro para o parâmetro referido (studentId)

Resposta:

StatusCode: 200
```json
{
  id: Number,
  name: String,
  surname: String,
  email: String,
  age: Number,
  gender: String,
  class: String,
  isEmployed: Boolean,
  city: String
}
```

### /v1/students

Método: POST

Cria um novo cadastro de estudante (todos os campos são obrigatórios).

Corpo aceito:
```json
{
  name: String,
  surname: String,
  email: String,
  age: Number,
  gender: String,
  class: String,
  isEmployed: Boolean,
  city: String
}
```

Resposta:
StatusCode: 201
```json
{
  success: 'A new record has been created.'
}
```

### /v1/students/:studentId

Método: PATCH

Atualiza os dados de cadastro do estudante referido no parâmetro `studentId`. Os campos a serem atualizados são opcionais, com exceção do campo `id`, claro.

Corpo aceito:
```json
{
  name: String,
  surname: String,
  email: String,
  age: Number,
  gender: String,
  class: String,
  isEmployed: Boolean,
  city: String
}

Resposta:
StatusCode: 200
```json
{
  success: 'The record has been updated.'
}
```

### /v1/students/:studentId

Método: DELETE

Remove o recurso determinado pelo parâmetro `studentId`.

Resposta:
StatusCode: 204

```json
{}
```

Obs.: Tente usar o mínimo de bibliotecas possível
