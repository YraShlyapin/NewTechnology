export default `type Query {
    getAllDesigners: [Designer]
    getDesigner(id: ID): Designer
}

type Mutation {
    createDesigner(input: InputDesigner): Designer
}

type Designer {
    id: ID
    name: String
    image: String
}

input InputDesigner {
    id: ID
    name: String!
    image: String!
}`