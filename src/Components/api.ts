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

export const getRoom = (room_slug: string) => {
    console.log('axios call')
    return axios.get(`/api/room/${room_slug}`, room_slug)
}