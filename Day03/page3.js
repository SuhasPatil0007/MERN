const express = require('express')

const products = [
    {id: 1, name: "product 1", price: 100},
    {id: 2, name: "product 2", price: 200},
    {id: 3, name: "product 3", price: 300},
    {id: 4, name: "product 4", price: 400},
    {id: 5, name: "product 5", price: 500},
]

const categories = []

const app = express()

app.get('/', (request, response) => {
    console.log("GET req hit")

    response.send()
})

app.get('/product', (request, response) => {
    console.log("GET /product")

    response.send(products)
})

app.post('/product', (request, response) => {
    console.log("POST /product")

    const {name, price} = request.query

    console.log(`query string parameters name = ${name}, price = ${price}`)
    console.log(request.query)

    products.push({name, price, id: products.length+1})

    response.send()
})

app.post('/category/:title/:description', (request, response) => {
    console.log(request.params)

    const {title, description} = request.params

    categories.push({title, description, id: categories.length + 1})

    response.send()
})

app.get('/category', (request, response) => {
    console.log("GET /catagory")

    response.send(categories)
})

app.listen(4000, '0.0.0.0', () => {
    console.log("Server started at port 4000")
})