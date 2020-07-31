const createRm = require('./routines.ts').createRoom;
const getRm = require('./routines.ts').getRoom;
const deleteRm = require('./routines.ts').deleteRoom;

const roomAPI = (app) => {
    
    // create a new room 
    // when 'create room' button is clicked, it calls a function that makes an axios request 
    // axios will make a post request to here, and the createRoom routine goes through
    app.post('/api/room/newRoom', (req,res) => {
        // TODO: validation
        // TODO: call createRoom routine here
    });

    // gets room from api
    app.get('/api/room/:roomid', (req,res) => {
        // TODO: call getRoom routine here
        console.log('success!')
    });

    // deletes room api, including all messages within 
    app.delete('/api/room/deleteRoom/:roomid', (req,res) => {
        // TODO: validation? if its automatically deleted, validate expiry date, 
        // else make sure it's the owner who's deleting this
        
        // TODO: call deleteRoom routine
    });
}

module.exports = roomAPI;