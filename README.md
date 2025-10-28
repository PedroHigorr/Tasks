<p align="center">
  
  <a href="https://www.linkedin.com/in/pedrohigor1287/" target="_blank">
    
    <img src="assets/pedro.higor.logo.svg" width="120" alt="Pedro Higor Logo" />

  </a>
</p>

# Task Management API

API robusta para gerenciamento de tarefas, desenvolvida com NestJS, TypeScript e Prisma ORM, focada em autenticação e segurança com JWT.

## Status do Projeto

🚧 🟢 Concluído 🚧 

---

## 🛠️ Tecnologias Utilizadas

* **Core:** Node.js
* **Framework:** NestJS
* **Linguagem:** TypeScript
* **Banco de Dados:** Prisma ORM (conectado ao *PostgreSQL* )
* **Autenticação:** JWT (JSON Web Tokens)
* **Validação:** Class-validator / Class-transformer

---

## 📋 Funcionalidades (Endpoints)

* `POST /users` - Criação de novos usuários (com hash de senha)
* `POST /auth/login` - Autenticação de usuário e retorno de token JWT
* `POST /task` - Criação de novas tarefas (Endpoint protegido)
* `GET /task/ :id` - Busca tasks por id (Endpoint protegido)
* `GET /task/all` - Listagem de todas as tarefas do usuário autenticado (Endpoint protegido)
* `PUT /task/:id` - Atualização de uma tarefa (Endpoint protegido)
* `DELETE /task/:id` - Deleção de uma tarefa (Endpoint protegido)

---

## 🖥️ Como Rodar o Projeto Localmente


**1. Clone o repositório:**
`git clone https://github.com/PedroHigorr/Tasks.git`

**2. Instale as dependências:**
`cd tasks`
`npm install`

**3. Configure o Banco de Dados (.env):**
Este projeto usa Prisma. Você precisa criar um arquivo `.env` na raiz do projeto com a sua `DATABASE_URL`.
`DATABASE_URL="postgresql://user:password@localhost:5432/nomedobanco"`

**4. Outras variaveis de ambiente presentes na .env:**
`JWT_SECRET: (segredo da JWT)`
`JWT_EXPIRATION_TIME= 3600 (Tempo de expiração da JWT)`

**5. Rode as migrações do Prisma:**
`npx prisma migrate dev`

**6. Inicie o servidor:**
`npm run start:dev`



O servidor estará rodando em `http://localhost:3000` (ou qual for a sua porta).

---

## 👨‍💻 Autor

**Pedro Higor**
* LinkedIn: [Pedro Higot](https://www.linkedin.com/in/pedrohigor1287/)
* Email: (pedro.higor92@gmail.com)