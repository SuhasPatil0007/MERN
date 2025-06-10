const nodemailer = require('nodemailer')
const config = require('./config')

function sendEmail(email, subject, body) {
    ;(async () => {
    // create transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: config.email.user,
        pass: config.email.password,
        },
    })

    const result = await transporter.sendMail({
        from: config.email.user,
        to: email,
        subject,
        html: body,
    })
    })()
}

module.exports = {
    sendEmail
}