const Room = require('./model.ts');
const Msg = require('../Message/model.ts')
const getRoomMessages = require('../Message/routines.ts').getAllMessages;
const crypto_string = require('crypto-random-string')

// TODO: declare types

// get room info
const getRoom = (room_slug: string) => {
    let findObject = {room_slug: room_slug} 
    return new Promise((resolve,reject) => {
        Room
        .findOne(findObject)
        .lean()
        .exec((err, room) => {
            if (err) {console.error(err); reject(err)}
            else if (!room) reject(null)
            else {
                getRoomMessages(room.room_slug).then(
                    (msgs) => {
                        room.messages = msgs;
                        resolve(room)
                    },
                    (error) => {
                        console.error(error)
                        reject(error)
                    }
                )
            }
        })
    })
}

// create room
// assume param room has all the options, slug, owner etc
const createRoom = (room) => {
    return new Promise((resolve,reject) => {
        const newRoom = new Room({
            room_slug: crypto_string({length: 9}),
            created: new Date(),
            password: room.password,
            expiry: room.expiry
        });

        newRoom.save((err) => {
            if (err) { console.error(err); reject(err) }
            else resolve(room);
        })

    })
}

// delete room and its message
const deleteRoom = (room_slug) => {
    return new Promise((resolve, reject) => {
        Room
        .findOne({room_slug})
        .exec((err, room) => {
            if (err) { console.error(err); reject(err) }
            // will always be able to find room? 
            const room_id = room._id
            Msg
            .remove({room_id})
            .exec((err) => {
                if (err) { console.error(err); reject(err)}
                // remove room
                else {
                    Room
                    .remove({room_slug})
                    .exec((err) => {
                        if (err) { console.error(err); reject(err)}
                        resolve({deleted: true})
                    })
                }
            })

        })
    })
}

module.exports = {
    getRoom,
    createRoom,
    deleteRoom
}