export default `scalar Date

schema {
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
    deleteSelectedUser(id_user: [ID]): [User],
    setAutoincrementForUser(id: Int): Boolean
}

type User {
    id_user: ID
    name: String
    image: String
    birthday: Date
}

input InputUser {
    name: String!
    image: String!
    birthday: Date!
}`