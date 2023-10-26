import { buildSchema } from 'graphql'

const schema = buildSchema(`
    type Designer {
        id: ID
        name: String
        image: String
    }

    input InputDesigner {
        id: ID
        name: String!
        image: String!
    }

    type Query {
        getAllDesigners: [Designer]
        getDesigner(id: ID): Designer
    }

    type Mutation {
        createDesigner(input: InputDesigner): Designer
    }
`)

export default schema