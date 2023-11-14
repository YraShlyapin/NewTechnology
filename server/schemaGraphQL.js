export default `schema {
    query: Query
    mutation: Mutation
}

type Query {
    getAllUsers: [User]
    getUser(id_user: ID): User
}

type Mutation {
    createUser(input: InputUser): User
    deleteUser(id_user: ID): User
    deleteSelectedUser(id_user: [ID]): [User]
}

type User {
    id_user: ID
    name: String
    image: String
}

input InputUser {
    id_user: ID
    name: String!
    image: String!
}`