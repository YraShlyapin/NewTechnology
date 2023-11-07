import express from 'express'
import path from 'path'
import { createYoga, createSchema } from 'graphql-yoga'
import schema_file from './schemaGraphQL.js'
import { loadFiles } from '@graphql-tools/load-files'

import cors from 'cors'
import 'dotenv/config'

const port = process.env.PORT || 80
const host = process.env.HOST || 'localhost'



async function main() {

    const app = express()
    const db = [{name:"asd", id: 1, image: "https://"}]
    
    app.use(cors())

    const root = {
        Query: {
            getAllDesigners (_, _args){
                return db
            },
            getDesigner (_, {id}){
                return db.find(e => e.id == id)
            }
        },
        Mutation: {
            createDesigner (_, {input}){
                db.push(input)
                return input
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