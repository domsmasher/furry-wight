//setup Dependencies
var connect = require('connect')
    , express = require('express')
    , socket = require('socket.io')
    , http = require('http')
    , path = require('path')
    , user = require('./routes/user')
    , admin = require('./routes/admin')
    , fs = require('fs');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('recipes macro'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//Setup Socket.IO
var io = socket.listen(server);
io.set('transports', ['xhr-polling']);
io.sockets.on('connection', function(socket){
  console.log('Client Connected');
  socket.on('message', function(data){
    socket.broadcast.emit('server_message',data);
    socket.emit('server_message',data);
  });
  socket.on('disconnect', function(){
    console.log('Client Disconnected.');
  });
});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////
//app.get('/', function (req, res) {
//    res.render('index', {
//        title : 'Your Page Title'
//        ,description: 'Your Page Description'
//        ,author: 'Your Name'
//        ,analyticssiteid: 'XXXXXXX'});
//});
app.get('/login/', user.login);
app.post('/login/', user.access);

app.get('/admin/', admin.index);

app.get('/public/partials/:fileName', function (req, res) {
    if (req.param('fileName')) {
        fs.readFile('./public/partials/' + req.param('fileName'), function (err, html) {
            if (err) {
                throw err;
            }

            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
});

app.get('/items/', user.test);

app.post('/items/add/', function (req, res) {
    console.log(req);
});


