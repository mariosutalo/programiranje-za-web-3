import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello from our first express page')
})

app.listen(3000)

