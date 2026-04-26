require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())

const userRoutes = require("./server/routes/user")
app.use("/users", userRoutes)
const profileRoutes = require("./server/routes/profile")
app.use("/userProfile", profileRoutes)



const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`))