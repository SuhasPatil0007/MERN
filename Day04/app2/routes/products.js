const express = require('express')

const router = express.Router()

const products = []

router.get('/', (request, response) => {
    console.log("GET /product hit")

    response.send(products)
})

router.post('/', (request, response) => {
    const {title, price} = request.body

    products.push({title, price, id: products.length + 1, })
    response.send("product added")
})

module.exports = router
