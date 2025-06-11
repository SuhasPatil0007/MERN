const express = require('express')
const db = require('../database')
const utils = require('../utils')

const router = express.Router()

router.get('/', (request, response) => {
    const statement = `select id, title, line1, line2, line3, zipcode, state from addresses where userId = ? and is_deleted = 0`

    db.pool.query(
        statement,
        request['userInfo']['id'],
        (error, address) => {
            response.send(utils.createResult(error, address))
        }
    )
})

router.post('/', (request, response) => {
    const {title, line1, line2, line3, zipcode, state} = request.body

    const statement = `insert into addresses (title, line1, line2, line3, zipcode, state, userId) values (?, ?, ?, ?, ?, ?, ?)`

    db.pool.execute(
        statement,
        [title, line1, line2, line3, zipcode, state, request['userInfo']['id']],
        (error, data) => {
            response.send(utils.createResult(error, data))
        }
    )
})

router.put('/:addressId', (request, response) => {
    const {addressId} = request.params
    const {title, line1, line2, line3, zipcode, state} = request.body

    const statement = `update addresses set title = ?, line1 = ?, line2 = ?, line3 = ?, zipcode = ?, state = ?, userId = ? where id = ?`

    db.pool.execute(
        statement,
        [title, line1, line2, line3, zipcode, state, request['userInfo']['id'], addressId],
        (error, result) => {
            response.send(utils.createResult(error, result))
        }
    )
})

router.delete('/:addressId', (request, response) => {
    const {addressId} = request.params
    const query = 'update addresses set is_deleted = 1 where id = ? and userId = ?'

    db.pool.execute(
        query,
        [addressId, request['userInfo']['id']],
        (error, data) => {
            response.send(utils.createResult(error, data))
        }
    )
})

module.exports = router