const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.post('/register', async (req, res) => {
    try {
        const user = await User.registerUser(req.body)
        res.status(201).send(user)
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.loginUser(req.body.email, req.body.password)
        res.send(user)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

router.put('/:userId', async (req, res) => {
    try {
        const user = await User.updateUser(req.params.userId, req.body)
        res.send(user)
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.deleteUser(req.params.userId)
        res.send(user)
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})

module.exports = router
