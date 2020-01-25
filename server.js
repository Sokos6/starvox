const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb+srv://sokos6:SUGR9hFP48xAMwHG@cluster0-9xdtb.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.log(err)
  db = client.db('cluster0') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')
//  res.render(view, locals)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find()
  db.collection('quotes').find().toArray(function(err, results) {
    console.log(results)
  })
})


app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})