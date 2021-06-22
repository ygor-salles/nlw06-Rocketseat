# Projeto backend

## Configurações e dependencias iniciais na criação do projeto:

* Instalando o nodeJS
```bash
yarn init -y
```

* Instalando o typescript
```bash
yarn add typescript -D
```

* Instalando o arquivo de confirguração typescript
```bash
yarn tsc --init
```
* Em tsconfig.json definir o strict como false

* Instalar lib para ajudar o node a entender o import e from para não usar precisar usar const require(). Verificar pois em versões novas do node não precisa

* Instalar ts-node para o javascript entender o typescript
```bash
yarn add ts-node-dev -D
```
## Instalando o framework de servidor web ExpressJS

* Instalando o expressJS
```bash
yarn add express
```

* Instalando os tipos(typescript) do expressJS
```bash
yarn add @types/express -D
```

* No package.json adicionar em baixo de license o script de startar servidor:
```json
"scripts": {
    "dev": "ts-node-dev src/server.ts"
},
```

* Criar uma pasta src com arquivo server.ts - Escolher a porta que irá startar o server, neste exemplo é 3333

```ts
import express from 'express';

const app = express();

app.listen(3333, () => console.log('Server is running 3333'));
```

* O projeto express já está rodando na porta 3333 o express com utilização do typescript. Basta rodar no terminar com o comando:

```bash
yarn dev
```

* Caso queira subir o projeto para o github ou qualquer outro repositório remoto criar um arquivo na raiz do projeto com o nome .gitIgnore 
* Dentro desse arquivo colocar: /node_modules  (Para que não suba a pasta node_modules para o git).

## Instalando ORM e dependencias para conectar ao banco

* Instalando o TypeORM (neste exemplo será usado o ORM Typeorm e banco PostgreSQL):
```bash
yarn add typeorm reflect-metadata pg
```

* Na raiz do projeto criar um arquivo com o nome de ormconfig.json, onde ficará as configurações com o banco de dados:

```json
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "usuario_banco",
    "password": "senha_banco",
    "database": "nome_banco"
}
```

* Dentro de src criar o diretório database/index.ts, no index.ts colocar a seguinte configuração:
```ts
import { createConnection } from 'typeorm';
createConnection();
```

* Em server.ts chamar o database:
```ts
import express from 'express';
import './database';
const app = express();

app.listen(3333, () => console.log('Serve is runing 3333'));
```

* Dentro de database criar o diretório migrations

* Em package.json no objeto scripts recém criado, criar tb o atributo typeorm o qual defini a CLI:
```json
"scripts": {
    "dev": "ts-node-dev src/server.ts",
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
},
```

* Dentro do arquivo ormconfig.json criar o CLI (ferramenta para criar migrations pelo terminal, e definir em que local será criado os arquivos .ts das migrations):
```json
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "usuario_banco",
    "password": "senha_banco",
    "database": "nome_banco",
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}
```

* Para validar se a CLI do typeorm está rfuncionando executar o comando:
```bash
yarn typeorm -help
```

## Configuração para utilização de decorators no typescript, necessário pois o typeorm utiliza-se dos decorators

* Dentro de tsconfig.json, descomentar as linhas:
```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

## Adicionar a biblioteca uuid e os tipos do uuid, opcional. Para geração de IDs das tabelas dos bancos:
```bash
yarn add uuid
```

```bash
yarn add @types/uuid -D
```

## Criando Migrations

```bash
yarn typeorm migration:create -n nomeMigration
```

## Rodando migration

```bash
yarn typeorm migration:run
```

## Caso necessário reverter a última migration

```bash
yarn typeorm migration:revert
```

## Instalação das dependencias:

```bash
yarn
```
## Rodar o projeto:

```bash
yarn dev
```
