# express

## REST

- it is a design pattern which involves
  - http method: used to let the server know what operation the client wants to perform
    - GET: client wants to get an entity or list of entities
    - POST: client wants to insert a new row in the database
    - PUT or PATCH: client wants to update the existing data
    - DELETE: client wants to delete existing data
  - url: used to let the server know the type of entity needs to deal with
- e.g.
  - GET /product: client wants to get a list of products
  - POST /user/login: client wants to check if the user exists in the database
  - DELETE /product/1: client wants to delete a product with id as 1

## express

- framework used to developer web server using JS language
- it is a third party library (by default it is not installed when node got installed)
- express used http server behind scene
- install express
  - `npm install express`
- alternatives to express framework
  - fastify
  - koa
  - hapi
  - restify

## route

- mapping of
  - http method
  - url path
  - event handler

```javascript
const app = express()

// here .get is representing the http method GET
// here '/' is representing the url path
// here (request, response) => {...} is representing the event handle
app.get('/', (request, response) => {})
```

## sending the input to the routes

### using query string

- query string is a string with the parameters used as input to the API
- use query string to send the values if the values are optional
- on client side, the query string will be passed using format `?key1=value1&key2=value2`

```javascript
// client
// GET /product?tile="product1&price=200

// server
// const { name, price } = request.query
```

### using url path

- used the request.params to read the url path parameters
- when the values are mandatory to pass to the server, use url path
- it is mandatory to create the temporary placeholder(s) in the url
  - these parameters are known as the path variables

```javascript
// client
// app.post('/category/electronics/test category')

// server
app.post('/category/:title/:description', (request, response) => {
  const { title, description } = request.params
})
```

### using body

- body object can be associated only with POST and PUT requests

### middleware
