const mongoose = require('mongoose')
require('dotenv').config()


const openMongoConnection = () => {
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function callback () {
    console.log("connected to MongoDB")
  })
  mongoose.connect('mongodb+srv://hosseinabdollahi:Damavand61@cluster0.0vygpgz.mongodb.net/Rocket-Genesis-Api?retryWrites=true&w=majority')
}

mongoose.set('strictQuery', true) 
module.exports = {openMongoConnection}