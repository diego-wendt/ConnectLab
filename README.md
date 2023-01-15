# ConnectLab - Backend

Este projeto é o Backend de uma aplicação chamada ConnectLab, eé um gerenciador de Iot. Este projeto foi desenvolvido em NestJs/Postgres/TypeORM e foi apresentado como o segundo projeto avaliativo do segundo módulo do curso DevInHouse - Intelbras, oferecido pela instituição de ensino SENAI/SC.

Este projeto fornece dados para uma aplicação Frontend de mesmo nome desenvolvida em React ao final do primeiro módulo deste mesmo curso.

## Funcionalidades

- Cadastro, exclusão, alteração de dados e de senha do usuário.
- Listagem de dispositivos disponíveis para o usuário adicionar aos seus dispositivos.
- Cadastro, exclusão, edição, acionamento e listagem de um ou mais dispositivos vinculados ao usuário (com filtro e/ou paginação).
- Autenticação por usuário e senha e proteção de rotas por Token JWT.

## Stack utilizada

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,nestjs,ts,postgres" />
  </a>
</p>

- [Node.Js] - Software para execução de aplicações Javascript.
- [TypeScript] - Linguagem baseada em JavaScript com ferramentas adicionais que facilitam a escrita e a leitura de código.
- [NestJs] - Framework Node.Js para criação de aplicações Back-End eficientes e escaláveis.
- [Postgres] - Banco de dados relacional open source.
- [UUID] - Gerador de códigos de identificação únicos.
- [TypeORM] - Framework para conversão de código TypeScript em SQL.
- [Insomnia] - Aplicação para executar requisições HTTP.
- [Jwt] - Ferramenta para criação de token JWT.
- [Passport] - Ferramenta para autenticação de usuários.
- [BCrypt] - Biblioteca para encriptação de dados.
- [Class-Validator] - Ferramenta para validação de dados baseada em @Decorators.
- [Class-Transformer] - Ferramenta para manipulação de dados.
- [Dotenv-Flow] - Dependência para uso de múltiplas variáveis .env.

[node.js]: https://nodejs.org/en/
[typescript]: https://www.typescriptlang.org/
[nestjs]: https://nestjs.com
[postgres]: https://www.postgresql.org/
[uuid]: https://www.npmjs.com/package/uuid
[typeorm]: https://typeorm.io/
[insomnia]: https://insomnia.rest
[jwt]: https://jwt.io/
[passport]: https://github.com/jaredhanson/passport
[bcrypt]: https://www.npmjs.com/package/bcrypt
[class-validator]: https://github.com/typestack/class-validator
[class-transformer]: https://github.com/typestack/class-transformer
[dotenv-flow]: https://www.npmjs.com/package/dotenv-flow

## Instalação

```bash
# Clone o projeto
$ git clone https://github.com/diego-wendt/ConnectLab.git

# Entre no diretório do projeto
$ cd ConnectLab

# Instale as dependências do projeto
$ npm install

# Inicie o servidor
$ npm run start
```

## Documentação da API

### Endpoints - Usuário

#### Criar usuário:

| Parâmetro       | Tipo     | Descrição.             | Modelo de dado                                                                 |
| :-------------- | :------- | :--------------------- | ------------------------------------------------------------------------------ |
| `name`          | `string` | Nome do usuário.       | String de 3 a 50 caracteres.                                                   |
| `email`         | `string` | Email do usuário       | E-mail válido com até 50 caracteres.                                           |
| `url` \*        | `string` | Imagem para perfil.    | Endereço com url de imagem.                                                    |
| `phone` \*      | `string` | Telefone do usuário    | Apenas números, com 10 ou 11 algarismos. Ex: 00123456789 ou 0012345678         |
| `password`      | `string` | Senha a ser cadastrada | Mínimo 8 caracteres, 1 número, 1 letra minúscula, 1 letra maíuscula, 1 símbolo |
| `password2`     | `string` | Confirmação de senha   | Confirmação da senha anterior                                                  |
| `street`        | `string` | Nome da rua            | Até 50 caracteres.                                                             |
| `number`        | `number` | Número do imóvel       | Apenas números, até 6 algarismos.                                              |
| `complement` \* | `string` | Complemento            | Até 50 caracteres.                                                             |
| `neighborhood`  | `string` | Bairro                 | Até 50 caracteres.                                                             |
| `city`          | `string` | Cidade                 | Até 50 caracteres.                                                             |
| `state`         | `string` | Estado                 | Até 2 caracteres.                                                              |
| `zipCode`       | `string` | CEP                    | Apenas números, 8 algarismos.                                                  |

Propriedades marcadas com \* são opcionais e podem ser enviadas com campo vazio, mas as propriedades devem ser incluídas no JSON.

Exemplo: "phone":"".

```json
POST - http://localhost:3000/auth/signup

Headers: {
	"Content-Type": "application/json"
}

{
  "name": "Fulano da Silva",
  "email": "umemail@qualquer.com",
  "url": "https://exemplodeendereco.com/imagem.png",
  "phone": "55123456789",
  "password": "Ab@12345",
  "password2": "Ab@12345",
  "address": {
    "street": "Rua das Acácias",
    "number": "14",
    "complement": "Lado do 71",
    "neighborhood": "Vila do Chaves",
    "city": "Acapulco",
    "state": "AC",
    "zipCode": "12345678"
  }
}
```

##### Resultado esperado:

```json
{ "message": "Device successfully registered." }
```

#### Listar um usuário:

```json
GET - http://localhost:3000/user/

Headers: {
	"Authorization": "Bearer token"
}
```

##### Resultado esperado:

```json
{
  "id": "fa6776fc-84ae-48eb-983a-2f3f4b4dfc96",
  "name": "Fulano da Silva",
  "email": "umemail@qualquer.com",
  "url": "https://exemplodeendereco.com/imagem.png",
  "phone": "55123456789",
  "active": true,
  "createdAt": "2023-01-13T01:21:19.164Z",
  "updatedAt": "2023-01-13T05:45:11.117Z",
  "deletedAt": null,
  "address": {
    "id": "3ec8e468-7ba3-43be-af2e-307d731e5f36",
    "street": "Rua das Acácias",
    "number": "14",
    "complement": "Lado do 71",
    "neighborhood": "Vila do Chaves",
    "city": "Acapulco",
    "state": "AC",
    "zipCode": "12345678"
  }
}
```

#### Atualizar os dados do usuário:

```json
PUT - http://localhost:3000/user

Headers: {
  "Authorization": "Bearer token",
	"Content-Type": "application/json"
}

{
  "name": "Fulano da Silva",
  "url": "https://exemplodeendereco.com/imagem.png",
  "phone": "55123456789",
  "address": {
    "street": "Rua das Acácias",
    "number": "14",
    "complement": "Lado do 71",
    "neighborhood": "Vila do Chaves",
    "city": "Acapulco",
    "state": "AC",
    "zipCode": "12345678"
  }
}
```

##### Resultado esperado:

```json
{
  "id": "fa6776fc-84ae-48eb-983a-2f3f4b4dfc96",
  "name": "Fulano da Silva",
  "email": "umemail@qualquer.com",
  "url": "https://exemplodeendereco.com/imagem.png",
  "phone": "55123456789",
  "active": true,
  "createdAt": "2023-01-13T01:21:19.164Z",
  "updatedAt": "2023-01-13T05:45:11.117Z",
  "deletedAt": null,
  "address": {
    "id": "3ec8e468-7ba3-43be-af2e-307d731e5f36",
    "street": "Rua das Acácias",
    "number": "14",
    "complement": "Lado do 71",
    "neighborhood": "Vila do Chaves",
    "city": "Acapulco",
    "state": "AC",
    "zipCode": "12345678"
  }
}
```

#### Alterar senha do usuário:

```json
PUT - http://localhost:3000/auth/changepassword

Headers: {
  "Authorization": "Bearer token",
	"Content-Type": "application/json"
}

{
  "email": "umemail@qualquer.com",
	"password":"Ab@12345",
	"newPassword":"Ab@09876",
	"newPassword2":"Ab@09876"
}
```

##### Resultado esperado:

```json
{ "message": "Your password has been successfully changed." }
```

#### Remover o usuário:

```json
DELETE - http://localhost:3000/user/

Headers: {"Authorization": "Bearer token"}
```

##### Resultado esperado:

```json
{ "message": "User sucefully removed." }
```

### Endpoints - Autenticação

#### Autenticar o usuário:

```json
POST - http://localhost:3000/auth/login

Headers: {"Content-Type": "application/json"}

{
  "email": "umemail@qualquer.com",
	"password":"Ab@12345"
}
```

##### Resultado esperado:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhNjc3NmZjLTg0YWUtNDhlYi05ODNhLTJmM2Y0YjRkZmM5NiIsImVtYWlsIjoiZGllZ29fd2VuZHRAaG90bWFpbC5jbSIsInVybCI6Ind3dy51b2FzZGFkYXNsLmNvbS5iciIsImZpcnN0TmFtZSI6ImRpYWRhc2RzYWVnbyIsImlhdCI6MTY3MzcwOTAzMCwiZXhwIjoxNjczNzE1MDMwfQ.A5zDeubi2ZCHSy4n0pW73sNv-ET3IEe6RlDZMPxJam0"
}
```

### Endpoints - Dispositivos

#### Listar todos modelos de dispotivos disponíveis:

```json
GET - localhost:3000/devices/models

Headers: {"Authorization": "Bearer token"}
```

##### Resultado esperado:

```json
[
	{
		"id_model": "631b2f046f2d2f24a7c0c948",
		"name": "Lâmpada LED",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://url.endereco.imagem"
	},
  ...
]
```

#### Cadastrar dispositivo:

| Parâmetro  | Tipo     | Descrição.                         | Modelo de dado                                                                                |
| :--------- | :------- | :--------------------------------- | --------------------------------------------------------------------------------------------- |
| `name`     | `string` | Nome do usuário.                   | String de 3 a 50 caracteres.                                                                  |
| `model_id` | `string` | Id do modelo de dispositivo        | Dado obtido do endpoint "Listar todos modelos de dispotivos disponíveis".                     |
| `place`    | `string` | Local de instalação do dispositivo | Dado obtido do endpoint "Listar locais para instalar dispositivos." Apenas letras maiúsculas. |

```json
POST - localhost:3000/devices

Headers: {
  "Authorization": "Bearer token",
	"Content-Type": "application/json"
}

{
	"name":"Lâmpada da sala.",
	"model_id":"631b2f046f2d2f24a7c0c948",
	"place":"CASA"
}
```

##### Resultado esperado:

```json
{ "message": "Device successfully registered." }
```

#### Detalhar um dispositivo:

```json
GET - localhost:3000/devices/device

Headers: {
  "Authorization": "Bearer token",
	"Content-Type": "application/json"
}

{"id_device":"bf57f4d1-deed-4baf-8c4d-26a2184e1783"}
```

##### Resultado esperado:

```json
{
  "id_device": "bf57f4d1-deed-4baf-8c4d-26a2184e1783",
  "name": "Lampada da sala",
  "virtual_id": "E21DC39CE467BD4",
  "ip_address": "75.246.25.54",
  "mac_address": "7E:22:FB:EE:C1:E1",
  "signal": "-48 dbm",
  "switch_state": false,
  "place": 0,
  "model": {
    "id_model": "631b2f046f2d2f24a7c0c948",
    "name": "Lâmpada LED",
    "type": "Energia",
    "madeBy": "Intelbras",
    "photoUrl": "https://url.endereco.imagem"
  }
}
```

#### Listar vários dispositivos:

```json
GET - localhost:3000/devices/?page&size&place

Headers: {
  "Authorization": "Bearer token",
	"Content-Type": "application/json"
}
```

| Parâmetro | Tipo     | Descrição                               | Detalhes                                                                                                        |
| :-------- | :------- | :-------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `page`    | `number` | Número da página a ser exibida.         | Caso não informado, o padrão é 0.                                                                               |
| `size`    | `number` | Quantidade de itens por página.         | Caso não informado, o padrão é 10.                                                                              |
| `place`   | `string` | Local que o dispositivo está instalado. | Caso não informado, retorna dispositivos de todos os locais. Locais baseado no enum e apenas letras maiúsculas. |

##### Resultado esperado:

```json
{
	"devices": [
		[
			{
				"id_device": "0647bea8-6e64-4cde-a670-42cb3b94f2a2",
				"name": "Lampada da sala",
				"virtual_id": "85C4739D6D77058",
				"ip_address": "198.153.29.177",
				"mac_address": "C9:9C:F9:43:88:68",
				"signal": "-36 dbm",
				"switch_state": false,
				"place": 1,
				"model": {
					"id_model": "631b2f046f2d2f24a7c0c948",
					"name": "Lâmpada LED",
					"type": "Energia",
					"madeBy": "Intelbras",
					"photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/160115-1000-1000/ews_407_front_cor.jpg?v=637564221001370000"
				}
			}
    ...
		],
		13
	],
	"pagination": {
		"totalDevices": 13,
		"totalPages": 5,
		"take": 3,
		"skip": 0
	}
}
```

#### Alterar estado do dispositivo:

```json
PATCH - http://localhost:3000/devices

Headers: {
  "Authorization": "Bearer token",
	"Content-Type": "application/json"
}

{"id_device":"7d1dc67c-009c-4e60-84ed-a9e2b08b009f"}
```

##### Resultado esperado:

```json
{
  "id_device": "7d1dc67c-009c-4e60-84ed-a9e2b08b009f",
  "name": "Lampada da sala",
  "virtual_id": "3C4693D0353918E",
  "ip_address": "85.249.67.72",
  "mac_address": "F2:31:69:9D:EC:47",
  "signal": "-48 dbm",
  "switch_state": true,
  "place": 2
}
```

#### Excluir o dispositivo:

```json
DELETE - http://localhost:3000/devices

Headers: {
  "Authorization": "Bearer token",
	"Content-Type": "application/json"
}

{"id_device":"7d1dc67c-009c-4e60-84ed-a9e2b08b009f"}
```

##### Resultado esperado:

```json
{"message": "Device successfully removed."}
```

#### Listar locais para instalar dispositivos:

```json
GET - localhost:3000/devices/places

Headers: {"Authorization": "Bearer token",}
```

##### Resultado esperado:

```json
{
  "places": {
    "0": "CASA",
    "1": "ESCRITORIO",
    "2": "FABRICA",
    "CASA": 0,
    "ESCRITORIO": 1,
    "FABRICA": 2
  }
}
```

## Variáveis de Ambiente

Para executar este projeto, você vai precisar adicionar as seguintes variáveis no arquivo .env do seu ambiente:

```json
DB_DIALECT=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
```

## Autor

- [@Diego Wendt](https://www.github.com/diego-wendt)
