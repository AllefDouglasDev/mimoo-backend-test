# Passos

 - [x] Configurar AWS Cognito
 - [x] Criar tabela no DynamoDB
 - [x] Criar uma função do IAM para a função do Lambda
 - [x] Criar funções lambda
    - [x] Função GetTools
    - [x] Função PostTool
    - [x] Função DeleteTool
 - [x] Criar API Gateway
 - [x] Adicionar autorizador do Cognito ao API Gateway

# Informações

### Nome do app

  VUTTR

### O que é o IAM

  Cada função do Lambda tem uma função do IAM associada a ela. Essa função define com quais outros serviços da AWS a função tem permissão para interagir.

### Código para alterar senha do usuário na AWS Cognito

  aws cognito-idp admin-set-user-password --user-pool-id <user-pool-id> --username <nome-do-usuario> --password <senha> --permanent

### Dados teste

  {
    "title": "Notion",
    "link": "https://notion.so",
    "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.",
    "tags": [
      "organization",
      "planning",
      "collaboration",
      "writing",
      "calendar"
    ]
  }

  {
    "title": "json-server",
    "link": "https://github.com/typicode/json-server",
    "description": "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
    "tags": [
      "api",
      "json",
      "schema",
      "node",
      "github",
      "rest"
    ]
  }

  {
    "title": "fastify",
    "link": "https://www.fastify.io/",
    "description": "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
    "tags": [
      "web",
      "framework",
      "node",
      "http2",
      "https",
      "localhost"
    ]
  }