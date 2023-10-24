import express from 'express'
import 'dotenv/config'

const port = process.env.PORT || 80
const host = process.env.HOST || 'localhost'

let app = express()

app.use(express.static('../client'))

app.get('/', async (req, res) => {
    res.send('index.html')
})

app.listen(port, host, () => {
    console.log(`сервер запущен на http://${host}:${port}`)
})