const express = require('express')
const db = require('../database')
const utils = require('../utils')
const mailer = require('../mailer')
const config = require('../config')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const upload = multer({dest: 'files'})

const router = express.Router()

// user registration
router.post('/register', (request, response) => {
    // get the user details
    const {firstName, lastName, email, password} = request.body

    // create the statement
    const statement = `insert into users (firstName, lastName, email, password) values (?, ?, ?, ?)`

    // execute the statement
    db.pool.execute(
        statement,
        [firstName, lastName, email, utils.encryptPassword(password)],
        (error, result) => {
            // send welcome email to the user
            if(config.email.enabled) {
                mailer.sendEmail(
                email,
                'Welcome to food ordering application',
                `<h1>Welcome to the food ordering application</h1>
                <br/>
                <div>Dear ${firstName}, </div>
                <div>Welcome to the application. We hope you will like our services...</div>
                <br/>
                <div>Thank you</div>
                <div>Admin.</div>`
                )
            }
            // send the result to the client
           response.send(utils.createResult(error, result))
        }
    )
})

// user login
router.post('/login', (request, response) => {
    const {email, password} = request.body

    const statement = `select id, firstName, lastName from users 
                        where email = ? and password = ?`

    db.pool.query(
        statement,
        [email, utils.encryptPassword(password)],
        (error, users) => {
            if(error) {
                response.send(utils.createError(error))
            } else {
                if(users.length == 0) {
                    response.send(utils.createError('user does not exist'))
                } else {
                    const {id, firstName, lastName} = users[0]

                    const payload = {
                        id,
                        firstName,
                        lastName
                    }
                    
                    try{
                        //create a token
                        const token = jwt.sign(payload, config.secret)
                        response.send(
                            utils.createSuccess({
                                token,
                                firstName,
                                lastName
                            })
                        )

                    } catch(ex) {
                        response.send(utils.createError(ex))
                    }
                }
            }
        }
    )
})

// forgot password
router.post('/forgot-password', (request, response) => {
    const {email} = request.body

    const statement = `select id, firstName, lastName from users where email = ?`

    db.pool.query(
        statement,
        [email],
        (error, users) => {
            if(error) {
                response.send(utils.createError(error))
            } else {
                if(users.length == 0) {
                    response.send(utils.createError('user does not exist'))
                } else {
                    const user = users[0]

                    mailer.sendEmail(
                        email,
                        'Forgot Password',
                        `
                            <h1>Forgot Password link here</h1>
                            <br />
                            <div>Dear ${user['firstName']},</div>
                            <div>Please click <a href="http://localhost:5173/reset-password">here</a> to change the password,
                            <div>Thank You</div>
                            <div>Admin.</dv>
                        `
                    )

                    response.send(utils.createSuccess('Please check your email'))
                }
            }
        }
    )
})

//reset password
router.put('/reset-password', (request, response) => {
    const {email, password} = request.body

    const statement = `update users set password = ? where email = ?`

    db.pool.execute(
        statement,
        [utils.encryptPassword(password), email],
        (error, result) => {
            response.send(utils.createResult(error, result))
        }
    )
})

router.get('/profile', (request, response) => {
    const {id} = request['userInfo']
    
    const statement = `select firstName, lastName, email from users where id = ?`

    db.pool.query(statement, [id], (error, users) => {
        response.send(utils.createResult(error, users[0]))
    })
})

router.put('/profile', (request, response) => {
    const {firstName, lastName, password} = request.body

    const statement = `update users set firstName = ?, lastName = ?, password = ? where id = ?`

    db.pool.execute(
        statement,
        [
            firstName,
            lastName,
            utils.encryptPassword(password),
            request['userInfo']['id']
        ],
        (error, result) => {
            response.send(utils.createResult(error, result))
        }
    )
})

router.put('/profile-image', upload.single('photo'), (request, response) => {
    const statement = `update users set profileImage = ? where id = ?`

    db.pool.execute(
        statement,
        [request.file.filename, request['userInfo']['id']],
        (error, result) => {
            response.send(utils.createResult(error, result))
        }
    )
})

module.exports = router