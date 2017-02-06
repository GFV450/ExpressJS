var express = require('express')
var app = express()
var exphbs  = require('express-handlebars')

app.use(express.static('public'))

//handlebars-express
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
    res.render('home')
})

var posts = [ {body: "One"}, {body: "Two"}, {body: "Three"} ]

// POST method route
app.get('/posts', function (req, res) {
	res.send(posts)
 })

var Post = require('./models/post.js')

app.post('/posts', function (req, res) {
    var post = req.body
    post.create(post, function (err, post) {
        res.status(200).json(post)
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
