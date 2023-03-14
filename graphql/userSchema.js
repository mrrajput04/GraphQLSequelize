const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        user(id: Int!): User
        users(topic: String): [Users]
    },
    
    type User {
        id: Int
        username: String
        email: String
        firstName: String
        lastName: String
        password: String
    }
`);

module.exports = schema;