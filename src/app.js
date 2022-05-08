const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://chameleon_admin:GcWYlcK0xADZ8gth@cluster0.i6hsu.mongodb.net/chameleondb?authSource=admin&replicaSet=atlas-13myik-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',{useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('mongoDb Connection Succeeded')
})

const routes = require('./routes')
routes(app)

app.listen(process.env.PORT || 8081)
