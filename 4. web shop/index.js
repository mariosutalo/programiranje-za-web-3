import express from 'express'
import mysql from 'mysql2'

const dbConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'shop'
})

dbConnection.connect((error) => {
    if (error) {
        console.log('error connecting to db:', error)
        return
    }

    dbConnection.query(
        'select count(*) as productsCount from product',
        (error, results, fields) => {
            if (error) {
                console.log('error executing query', error)
                return
            }
            console.log('simple select data', results)
        }
    )
})

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', (req, res) => {
    const fakeProducts = [
        {
            image: '/assets/product images/image2.jpg',
            name: 'Asus rog motherboard',
            averageRating: 4.1,
            ratingCount: 10,
            price: 120.50,
            stock: 3
        },
        {
            image: '/assets/product images/image3.jpg',
            name: 'Asus rog motherboard',
            averageRating: 3.1,
            ratingCount: 10,
            price: 120.50,
            stock: 3
        },
        {
            image: '/assets/product images/image3.jpg',
            name: 'Asus rog motherboard',
            averageRating: 3.1,
            ratingCount: 10,
            price: 100.50,
            stock: 0
        },
        {
            image: '/assets/product images/image2.jpg',
            name: 'Asus rog motherboard',
            averageRating: 4.1,
            ratingCount: 10,
            price: 120.50,
            stock: 3
        },
        {
            image: '/assets/product images/image3.jpg',
            name: 'Asus rog motherboard',
            averageRating: 3.1,
            ratingCount: 10,
            price: 120.50,
            stock: 3
        },
        {
            image: '/assets/product images/image3.jpg',
            name: 'Asus rog motherboard',
            averageRating: 3.1,
            ratingCount: 10,
            price: 100.50,
            stock: 0
        }
    ]
    res.render('index', { products: fakeProducts, pageName: 'Home Page' })
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

app.listen(3000, (error) => {
    if (error) {
        console.log('server cant be started', error)
        return
    }
    console.log('server started')
})

