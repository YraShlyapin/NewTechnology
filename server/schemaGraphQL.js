export default `schema {
    query: Query
    mutation: Mutation
}

type Query {
    getAllDesigners: [Designer]
    getDesigner(id_designer: ID): Designer
}

type Mutation {
    createDesigner(input: InputDesigner): Designer
    deleteDesigner(id_designer: ID): Designer
}

type Designer {
    id_designer: ID
    name: String
    image: String
}

input InputDesigner {
    id_designer: ID
    name: String!
    image: String!
}`