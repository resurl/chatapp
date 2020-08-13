import React, { useState, useEffect } from 'react'
import Message from './Message'
import { Redirect } from 'react-router-dom'
import { postMessage, getRoom } from './api'

interface Message {
    author: string,
    timestamp: string,
    body: string
}

const createMessageLog = (msgs: Message[]) => {
    return msgs.map((msg: Message, idx:number)=> 
        <Message author={msg.author} time={msg.timestamp} body={msg.body} key={idx} />)
}

function Room(props: any) {
    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        //@ts-ignore
        getRoom(props.location.pathname).then((data) => {
            let msgLog = data.data.messages;
            if (msgLog)
                setMsgs(data)
        })
    },[props.location.pathname])

    const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement
        if (e.key === 'Enter') {
            let newMessage = {
                room_slug: 'test',
                author: 'testguy',
                timestamp: new Date(),
                body: target.value
            }
        
            let newMsgJSX = <Message author={newMessage.author} time={newMessage.timestamp.toString()} 
                body={newMessage.body} key={msgs.length+1} />;
            
            // post message to db
            postMessage(newMessage)
            
            // @ts-ignore
            setMsgs([...msgs, newMsgJSX]);
            target.value = ''
        }
    }

    if (props.location.state === (''||undefined)) {
        return (<Redirect to='/404' />)
    }
    
    else {
        return (
        <div className='Room'>
            <h1>{props.location.state.room_slug}</h1>
            <section className='Room__msgs'>{msgs}</section>
            <div className='Room__input'>
                <input type='text' placeholder='Start typing...' onKeyDown={sendMessage} autoFocus={true} />
            </div>
        </div>
    )}
}

export default Room;