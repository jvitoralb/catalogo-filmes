## Catalogo Filmes

Uma REST API que faz o controle de um catálogo de filmes, onde esse catálogo só pode ser acessado caso o usuário seja autenticado. Esse projeto foi construido como parte de um processo seletivo.

A Stack do app consiste em:
- TypeScript
- Nest.js
- TypeORM
- Swagger
- Docker
- Redis
- PostgreSQL

Com a exceção de Docker - `6m de exp.`, TypeScript - `2 anos de exp.` , PostgreSQL - `1 ano de exp.` e Swagger - `6m de exp.`, essa foi a minha primeira vez trabalhando com essas tecnologias, e posso dizer que gostei bastante, especialmente do framework Nestjs, que com certeza vou aprofundar os estudos sobre.

Para interagir com a API, acesse o [Swagger UI](https://catalogo-filmes.onrender.com/api)

### API

#### Auth
Aqui é onde o usuário faz a sua autenticação. Como o servico de Auth tem contato o serviço User, é por aqui que acontece o registo - `signup` do usuário, ou o acesso - `login` à sua conta. 

`/auth`:
- `POST /signup`:
    - Requer um corpo com email e senha.
    - Retorna um JWT se o email for único, caso contrário retorna um `BadRequest`.
- `POST /login`:
    - Requer um corpo com email e senha.
    - Retorna um JWT se os dados estiverem corretos, caso contrário retorna um `BadRequest`.

#### Movies
Aqui é onde o usuário tem acesso - quando portando o `Authorization header`, aos catálogo de filmes, podendo bucar, criar atualizar e deletar.

`/movies`:
- `POST /`:
    - Requer um corpo com título, descrição e ano.
    - Retorna um objeto com as informações do filme, caso falte alguma informação retorna um `BadRequest`.
- `GET /`:
    - Retorna um arranjo com todos os filmes registrados.
    - Caso não tenha nada do banco de dados, retorna um aranjo vazio.
- `GET /:id`:
    - Retorna o filme que corresponde ao `:id` enviado.
    - Caso não conste no banco de dados, retorna um `BadRequest`.
- `PUT /:id`:
    - Requer um corpo com título, descrição e ano, caso falte alguma informação no corpo retorna um `BadRequest`.
    - Retorna o filme que corresponde ao `:id` após as mudanças, caso o `:id` não conste no banco de dados, retorna um `BadRequest`.
- `DELETE /:id`:
    - Não retorna corpo algum.
    - Caso o `:id` não conste no banco de dados, retorna um `BadRequest`.
