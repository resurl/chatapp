// @ts-ignore
const axios = require('axios')

interface Room {
    room_slug: string,
    created:Date,
    password?:string,
    expiry?:Date
}

export const postRoom = (room: Room) => {
    return axios.post(room)
}

export const getRoom = (roomid: string) => {
    return axios.get(`/api/room/${roomid}`, roomid)
}