const app = require('express')();
const http = require('http').createServer(app)
const mongoose = require('mongoose');
const socket = require('socket.io');
const roomRoutes = require('./backend/Room/api');
const msgRoutes = require('./backend/Message/api');
const PORT  = process.env.PORT || 7070;

/**
 * server is responsible for api calls, react-router handles how
 * views are served
 */

roomRoutes(app)
msgRoutes(app)

http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

