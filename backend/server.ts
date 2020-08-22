// whining about block scope declared variables
// @ts-ignore
const app = require('express')();
const http = require('http').createServer(app);
// more whining about block scope declared variables
// @ts-ignore
const mongoose = require('mongoose');
const socket = require('socket.io');
const io = socket(http);
const roomRoutes = require('./Room/api.ts');
const msgRoutes = require('./Message/api.ts');
const PORT = process.env.PORT || 8080;

const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('connected to db');
});

io.on('connection', (sock) => {
    console.log('connected socket')
    sock.on('disconnect', () => {
        console.log('disconnected socket')
    })
})

/**
 * server is responsible for api calls, react-router handles how
 * views are served
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
roomRoutes(app);
msgRoutes(app);

http.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});
