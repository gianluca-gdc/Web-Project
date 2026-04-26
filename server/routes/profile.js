const express = require("express")
const router = express.Router()
const Profile = require("../models/profile")

router.get('/getAllUserProfiles', async (req, res) => {
    try {
        const userProfiles = await Profile.getAllUserProfiles()
        res.send(userProfiles)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router