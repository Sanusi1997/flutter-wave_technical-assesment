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

pool.connect().then(() => console.log("connected to database"))
.catch((err) => console.error(err));

app.use(express.json())

const validationRouter =   require('./routes/validation_route')

const port = process.env.PORT || 3000
app.use('/', validationRouter)

app.listen(port, () => console.log('server started'))