const express = require('express')
const app = express()
//const mongoose = require('mongoose')
const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const client = pool.connect();


client.on('error', (error) => console.error(error))
client.once('open', () => console.log('connected to database'))


app.use(express.json())

const validationRouter =   require('./routes/validation_route')

const port = process.env.PORT || 3000
app.use('/', validationRouter)

app.listen(port, () => console.log('server started'))