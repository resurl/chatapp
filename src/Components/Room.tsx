import React from 'react'
import Message from './Message'

interface Message {
    author: string,
    timestamp: Date,
    body: string
}

const createMessageLog = (msgs: Message[]) => {


    return msgs.map((msg: Message, idx:number)=> 
        <Message author={msg.author} time={formatDate(msg.timestamp)} body={msg.body} key={idx} />)
}

function formatDate(date:Date): string {
    let curr = Date.now() - date.getTime()
    return ''
}

function Room(props: any) {

    return (
        <div className='Room'>
            <h1>{props.location.state.room_slug}</h1>
            <section>{createMessageLog(props.location.state.messages)}</section>
        </div>
    )
}

export default Room;