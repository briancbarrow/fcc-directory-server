const express = require('express')
const mongoose = require('mongoose')
const Profile = require('./models/profiles')
const bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 8080
const url = process.env.PROD_MONGODB;
mongoose.connect(url)
const conn = mongoose.connection

app.post('/post', function(req, res) {
  const prof = new Profile(req.body)
  conn.collection('profiles').insert(prof)
})

app.listen(process.env.PORT || port, function() {
  console.log('listening on fcc directory')
})
