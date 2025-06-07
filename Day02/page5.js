// import http module to create the server
const http = require('http');

// create a server process
const server = http.createServer((request, response) => {
    // request is the http request sent by the client
    // response is the http response which will be sent to the client
    console.log('new request received');
    console.log(`http method: ${request.method}`);
    console.log(`url: ${request.url}`);
    console.log(request);
    
    // send the response to the client
    response.end('hello from server');

})

// start the server process on port no 4000
// '0.0.0.0': the networking incoming connections will be accepted
server.listen(4000, '0.0.0.0', () => {
    console.log(`server started on port 4000`);
})