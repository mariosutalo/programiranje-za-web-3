import express from 'express'

const app = express()
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index', {productName: 'Gaming Pc'})
})

app.get('/products', (req, res) => {
    res.render('products')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})

app.get('/about', (req, res) => {
    res.render('about')
})





app.listen(3000)

