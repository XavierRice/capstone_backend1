const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})