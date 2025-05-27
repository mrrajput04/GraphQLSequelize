# GraphQLSequelize

A Node.js project implementing a GraphQL API with Sequelize ORM, providing CRUD (Create, Read, Update, Delete) operations for your data models.

## Features

- **GraphQL API**: Flexible and efficient data querying and mutation with GraphQL.
- **Sequelize ORM**: Easily interact with relational databases using Sequelize.
- **CRUD Operations**: Create, Read, Update, and Delete records via GraphQL endpoints.
- **Modular Structure**: Organized codebase for scalability and maintainability.
- **JavaScript**: 100% JavaScript codebase.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A supported relational database (e.g., PostgreSQL, MySQL, SQLite)

### Installation

```bash
git clone https://github.com/mrrajput04/GraphQLSequelize.git
cd GraphQLSequelize
npm install
# or
yarn install
```

### Configuration

Set up your environment variables for database connection. Create a `.env` file in the root directory:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
```

You may have additional environment variables based on your setup.

### Database Migration

Run database migrations (if applicable):

```bash
npx sequelize db:migrate
```

### Running the Application

```bash
npm start
# or
yarn start
```

The server will start on `http://localhost:4000` (default).

### Access GraphQL Playground

Navigate to `http://localhost:4000/graphql` to access the GraphQL Playground and interact with the API.

## Example CRUD GraphQL Queries

### Create

```graphql
mutation {
  createUser(input: { name: "Alice", email: "alice@example.com" }) {
    id
    name
    email
  }
}
```

### Read

```graphql
query {
  users {
    id
    name
    email
  }
}
```

### Update

```graphql
mutation {
  updateUser(id: 1, input: { name: "Alice Smith" }) {
    id
    name
    email
  }
}
```

### Delete

```graphql
mutation {
  deleteUser(id: 1) {
    success
    message
  }
}
```

## Project Structure

```
.
├── src/
│   ├── models/
│   ├── resolvers/
│   ├── schema/
│   └── index.js
├── config/
├── .env
├── package.json
└── README.md
```

- `models/`: Sequelize models
- `resolvers/`: GraphQL resolvers for CRUD logic
- `schema/`: GraphQL type definitions
- `index.js`: Main server entry point

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

---

*Happy hacking!*
