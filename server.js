const express = require('express')
const mongoose = require('mongoose')
const Profile = require('./models/profiles')
const bodyParser = require('body-parser')
const cors = require('cors')

let app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 8080
const url = process.env.PROD_MONGODB;
mongoose.connect(url)
const conn = mongoose.connection

app.post('/post', function(req, res) {
  console.log(req.body)
  const prof = new Profile(req.body)
  prof.save()
    .then(console.log, console.log)
  // conn.collection('profiles').insert(prof)
})

app.get('/profiles', function(req, res) {
  Profile.find({}, function(err, data) {
    if(err) {
      res.send(err);
    }
    console.log(data)
    res.json(data);
  })
})

app.listen(process.env.PORT || port, function() {
  console.log('listening on fcc directory')
})
