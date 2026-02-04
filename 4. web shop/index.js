import express from 'express'

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





app.listen(3000)

