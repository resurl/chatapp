import React from 'react'
import Message from './Message'
import { Redirect } from 'react-router-dom'

interface Message {
    author: string,
    timestamp: string,
    body: string
}

const createMessageLog = (msgs: Message[]) => {
    return msgs.map((msg: Message, idx:number)=> 
        <Message author={msg.author} time={msg.timestamp} body={msg.body} key={idx} />)
}

const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement
    if (e.key === 'Enter') {

    }
}

function Room(props: any) {

    if (props.location.state === (''||undefined)) {
        return (<Redirect to='/404' />)
    }
    else {
        console.log(props.location)
        return (
        <div className='Room'>
            <h1>{props.location.state.room_slug}</h1>
            <section>{createMessageLog(props.location.state.messages)}</section>
            <div className='Room__input'>
                <input type='text' placeholder='Start typing...' onKeyDown={sendMessage} autoFocus={true} />
            </div>
        </div>
    )}
}

export default Room;