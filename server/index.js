import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import schema from './schemaGraphQL.js'

import cors from 'cors'
import 'dotenv/config'

const port = process.env.PORT || 80
const host = process.env.HOST || 'localhost'

const app = express()

app.use(cors())

const db = [{name:"asd", id: 1, image: "https://"}]

const root = {
    getAllDesigners (){
        return db
    },
    getDesigner ({id}){
        return db.find(designer => designer.id == id)
    },
    createDesigner ({input}){
        let designer = input
        designer.id = new Date()
        db.push(designer)
        return designer
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.use(express.static('../client'))

app.get('/', async (req, res) => {
    res.send('index.html')
})

app.listen(port, host, () => {
    console.log(`сервер запущен на http://${host}:${port}`)
})

process.on("SIGINT", () => {
    console.log('сервер выключен')
    process.exit()
})