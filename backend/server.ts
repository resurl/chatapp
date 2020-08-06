// @ts-ignore
const app = require('express')();
const http = require('http').createServer(app);
// @ts-ignore
const mongoose = require('mongoose');
const socket = require('socket.io');
const roomRoutes = require('./Room/api.ts');
const msgRoutes = require('./Message/api.ts');
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('connected to db');
});
/**
 * server is responsible for api calls, react-router handles how
 * views are served
 */
roomRoutes(app);
msgRoutes(app);

http.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});
