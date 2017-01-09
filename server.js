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

app.post('/post', function(req, res) {
  console.log(req.body)
  const prof = new Profile(req.body)
  prof.save()
    .then(console.log, console.log)
})

app.put('/put', cors(), function(req, res) {
  console.log(req.body)
  Profile.findOneAndUpdate({id: req.body.uid}, {$set: {name: "Erin Barrow"} }, function(err, snippet) {
    if (err || !snippet) {
      console.error("Could not update snippet", snippet);
      return;
    }
    console.log("Updated snippet", snippet.name);
  });
})

var update = function(name, content) {
    Snippet.findOneAndUpdate({name: name}, {content: content}, function(err, snippet) {
        if (err || !snippet) {
            console.error("Could not update snippet", name);
            mongoose.disconnect();
            return;
        }
        console.log("Updated snippet", snippet.name);
        mongoose.disconnect();
    });
};

app.get('/profiles', cors(), function(req, res) {
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
