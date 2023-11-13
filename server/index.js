import express from 'express'
import path from 'path'

import * as db from './mysql.js'

import { createYoga, createSchema } from 'graphql-yoga'
import schema_file from './schemaGraphQL.js'

import cors from 'cors'
import 'dotenv/config'

const port = process.env.PORT || 80
const host = process.env.HOST || 'localhost'



async function main() {

    const app = express()
    
    app.use(cors())

    const root = {
        Query: {
            getAllDesigners(_, _args) {
                return db.getDesigners()
            },
            getDesigner(_, {id_designer}) {
                return db.getOneDesigner(id_designer)
            }
        },
        Mutation: {
            createDesigner(_, {input}) {
                return db.addDesigner(input)
            },
            deleteDesigner(_, {id_designer}) {
                return db.deleteDesigner(id_designer)
            }
        }
    }

    const schema = createSchema({
        typeDefs: schema_file,
        resolvers: root
    })
    
    const yoga = createYoga({
        schema,
    })
    
    app.use(yoga.graphqlEndpoint, yoga)
    
    app.use(express.static('../client'))
    
    app.use(async (req, res) => {
        res.sendFile(path.resolve(path.resolve(),'..','client','index.html'))
    })
    
    app.listen(port, host, () => {
        console.log(`сервер запущен на http://${host}:${port}`)
    })
    
    process.on("SIGINT", () => {
        console.log('сервер выключен')
        process.exit()
    })
}

main().catch((err) => console.log(err))