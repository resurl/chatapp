import React, {useState,useEffect} from 'react'
//import {useLocation} from 'react-router-dom'

const createMessageLog = (msgs: Object) => {
    // create message objects
}

function Room(props:any) {
    const [name, setName] = useState('undefined')
    const [messages, setMessages] = useState({})

    //let location = useLocation();
   
    // TODO: on mount, instantiate name, messages.

    return (
        <div className='Room'>
            <h1>{name}</h1>
            <section></section>
        </div>
    )
}

export default Room;