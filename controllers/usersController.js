const express = require('express');
const users = express.Router()
require("dotenv").config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const { getUsers, createUser, logInUser } = require('../queries/users')



users.get('/', async (req, res) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

users.post('/', async (req, res) => {
    try {
        const newUser = await createUser(req.body)
        const token = jwt.sign({ userId: newUser.user_id, username: newUser.username }, secret);

        res.status(201).json({ user: newUser, token })
    } catch (err) {
        res.status(500).json({ error: "Invalid Information", info: err.message })
    }
})

users.post('/login', async (req, res) => {
    try {
        const user = await logInUser(req.body)
        if(!user){
            res.status(401).json({ error: "Invalid username or password" })
            return 
        }

        const token = jwt.sign({ userId: user.user_id, username: user.username }, secret)

        res.status(200).json({
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
            },
            token
        })

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})


module.exports = users