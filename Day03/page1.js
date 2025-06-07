const http = require('http');

const server = http.createServer((request, response) => {
console.log(`method = ${request.method}, url = ${request.url}`)
    if(request.method == 'GET')
    {
        if(request.url == '/product') {
            console.log("Select * from product");      
        } else if(request.url == '/category') {
            console.log("Select * from category")
        }
    }else if(request.method == 'POST') {
        if(request.url == '/product') {
            console.log("insert into product")
        }else if(request.url == '/category') {
            console.log("insert into category")
        }
    }
    response.end("Hello from server.")
})

server.listen(4000, '0.0.0.0', () => {
    console.log("Server started on port 4000")
})