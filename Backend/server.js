const express = require('express')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser =require('body-parser')
const cors=require("cors")

dotenv.config()

console.log(process.env.MONGO_URI)
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassGuard';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

 client.connect();
// console.log(process.env.MONGO_URI)


// Get all the passwords
app.get('/', async (req, res) => {
const db = client.db(dbName);
  const collection = db.collection('password');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save a password
app.post('/', async (req, res) => {
  const passwords=req.body
  const db = client.db(dbName);
    const collection = db.collection('password');
      const findResult = await collection.insertOne(passwords);
    res.send({success:true,result:findResult})
  })

// Delete a password
app.delete('/', async (req, res) => {
  const passwords=req.body
  const db = client.db(dbName);
    const collection = db.collection('password');
      const findResult = await collection.deleteOne(passwords);
    res.send({success:true,result:findResult})
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})