// import express package
const express = require('express')

// create a new express application
const app = express()

// route collection
app.get('/', (request, response) => {
    // this function will be called only when
    // http method: GET
    // url path: '/'
    console.log("/GET req hit")

    response.send("hello from server")
})

app.post('/', (request, response) => {
    console.log("/POST req hit")

    response.send()
})

app.put('/', (request, response) => {
    console.log("/PUT req hit")

    response.send()
})

app.listen(4000, '0.0.0.0', () => {
    console.log("Server started at port 4000")
})