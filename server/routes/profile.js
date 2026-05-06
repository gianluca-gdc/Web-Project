const express = require("express")
const router = express.Router()
const Profile = require("../models/profile")

router.post('/', async (req, res) => {
    try {
        const userProfile = await Profile.createUserProfile(req.body)
        res.status(201).send(userProfile)
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
        const userProfile = await Profile.getUserProfileByUserId(req.params.userId)
        res.send(userProfile)
    } catch(err) {
        res.status(404).send({message: err.message})
    }
})

router.get('/:profileId', async (req, res) => {
    try {
        const userProfile = await Profile.getUserProfileById(req.params.profileId)
        res.send(userProfile)
    } catch(err) {
        res.status(404).send({message: err.message})
    }
})

router.put('/:profileId', async (req, res) => {
    try {
        const userProfile = await Profile.updateUserProfile(req.params.profileId, req.body)
        res.send(userProfile)
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})

router.delete('/:profileId', async (req, res) => {
    try {
        const userProfile = await Profile.deleteUserProfile(req.params.profileId)
        res.send(userProfile)
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})

module.exports = router
