const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  'first_name': String,
  'name': String,
  'badges': Array,
  'image': String,
  'visible': true,
  'uid': Number
})

module.exports = mongoose.model('Profile', ProfileSchema)
