import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    users: [User!]!
  }
  
  type User {
    id: ID!
    name: String!
  }
`);
