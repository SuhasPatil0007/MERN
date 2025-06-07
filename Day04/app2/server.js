const express = require('express')

const app = express()

const productRouter = require('./routes/products')

app.use('/product', productRouter)

app.listen(4000, '0.0.0.0', () => {
    console.log("Server started at port 4000")
})