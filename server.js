const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


app.use(express.json())

const validationRouter =   require('./routes/validation_route')

const port = process.env.PORT || 3000
app.use('/', validationRouter)

app.listen(port, () => console.log('server started'))