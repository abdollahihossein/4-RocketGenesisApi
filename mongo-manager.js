const mongoose = require('mongoose')
require('dotenv').config()


const openMongoConnection = () => {
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function callback () {
    console.log("connected to MongoDB")
  })
  mongoose.connect('mongodb+srv://hosseinabdollahi:JYRoHRmQdArfgNjS@cluster0.6jaunsx.mongodb.net/Rocket-Genesis-Api?retryWrites=true&w=majority')
}

mongoose.set('strictQuery', true) 
module.exports = {openMongoConnection}