const express = require('express')

const products = []
const cars = []

const app = express()

// middleware
app.use(express.json())

app.use(express.urlencoded())

app.use((request, response, next) => {
    console.log("Inside middleware 1")

    next()
})

app.use((request, response, next) => {
    console.log("Inside middleware 2")

    next()

})

function middleware3(request, response, next) {
    console.log("Inside middleware 3")

    next()
}

app.use(middleware3)

app.get('/', (request, response) => {
    console.log("/ GET called")

    response.send("Welcome to express app 4000")
})

app.get('/product', (request, response) => {
    console.log("GET /product")

    response.send(products)
})

app.post('/product', (request, response) => {
    const{title, price, color, size, weight} = request.body
    products.push({id: products.length + 1, title, price, color, size, weight})
    console.log("POST /product")

    response.send("Product added")
})

app.get('/car', (request, response) => {
    console.log("GET /car")

    response.send(cars)
})

app.post('/car', (request, response) => {
    const{name, model, price} = request.body
    cars.push({id: cars.length + 1, name, model, price})

    response.send("Car added")
})

app.listen(4000, '0.0.0.0', () => {
    console.log("Hello from server 4000")
})