const express = require('express')
const db = require('../database')
const utils = require('../utils')
const mailer = require('../mailer')

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
                return utils.createError(error)
            } else {
                if(users.length == 0) {
                    return utils.createError('user does not exist')
                } else {
                    response.send(utils.createSuccess(users[0]))
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
                return utils.createError(error)
            } else {
                if(users.length == 0) {
                    return utils.createError('user does not exist')
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

module.exports = router