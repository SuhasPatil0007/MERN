const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

const useRouter = require('./routes/users')

app.use('/user', useRouter)

app.listen(4000, '0.0.0.0', () => {
    console.log('server started at port 4000')
})