const express = require('express')
const utils = require('./utils')
const jwt = require('jsonwebtoken')
const config = require('./config')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use((request, response, next) => {
    if(request.url == '/user/register' || request.url == '/user/login') {
        next()
    } else {
        let token = request.headers['authorization']
    if(!token) {
        response.send(utils.createError('token is missing'))
        return
    } 

    token = token.replace('Bearer', '').trim()

    try {
        if(jwt.verify(token, config.secret)) {

            const payload = jwt.decode(token)

            request['userInfo'] = payload

            next()
        } else {
            response.send(utils.createError('invalid token'))
        }
    } catch(ex) {
        response.send(utils.createError('invalid token'))
    }
    }
})

const userRouter = require('./routes/users')
const addressRouter = require('./routes/addresses')

app.use('/user', userRouter)
app.use('/address', addressRouter)

app.listen(4000, '0.0.0.0', () => {
    console.log('server started at port 4000')
})