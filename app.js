var express = require('express')
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express()

mongoose.Promise = global.Promise;

//Middleware
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/ExpressJS')
var Post = require('./models/post.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true

}));

//Variables
var posts = [
]

//Home
 app.get('/', function (req, res) {
     Post.find().exec(function (err, posts) {
         res.render('home.handlebars', {posts:posts});
     })
 })

//Index
app.get('/posts',function(req, res) {
    Post.find().exec(function (err, posts) {
        res.render('posts.handlebars', {posts:posts});
    })
});

//Show
app.get('/posts/:id', function(req, res) {
    var post = posts[req.params.id]
    Post.findById(req.params.id).exec(function (err, post) {
        res.render('show-post', {post:post})
    })
})

//Create
app.post('/posts', function(req, res) {
    var post = req.body;
    Post.create(post, function (err, post) {
        res.status(200).json(post);
    })
})

//Delete
app.delete('/posts/:id', function(req, res) {

    Post.findById(req.params.id).exec(function (err, post) {
        post.remove()
        res.status(200).json({})
    })
})

//Update
app.get('/login', function (req, res) {
    res.render('login.handlebars')
});

app.get('/signup', function (req, res) {
    res.render('signup.handlebars')
});


//Port
app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
