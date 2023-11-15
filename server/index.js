import express from 'express'
import path from 'path'

import * as db from './mysql.js'

import { createYoga, createSchema } from 'graphql-yoga'
import { DateTimeResolver } from 'graphql-scalars'
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
            getAllUsers(_, _args) {
                return db.getUsers()
            },
            getUser(_, {id_user}) {
                return db.getOneUser(id_user)
            }
        },
        Mutation: {
            createUser(_, {input}) {
                return db.addUser(input)
            },
            deleteUser(_, {id_user}) {
                return db.deleteUser(id_user)
            },
            deleteSelectedUser(_, {id_user}) {
                let users = []
                for (let id of id_user) {
                    let user = db.deleteUser(id)
                    if (user) users.push(user)
                }
                return users
            },
            setAutoincrementForUser(_, {id}){
                db.setAutoIncrement(id)
                return true
            }
        },
        Date: DateTimeResolver
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