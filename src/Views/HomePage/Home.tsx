import React from 'react'
import RoomForm from './RoomForm';

interface Props {
    loadRoom: Function
}

export default function Home(props: Props) {

    const handleJoin = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement;
        if (e.key === 'Enter') {
            props.loadRoom(target.value)
        }
    }

    return (
        <div className="Home">
            <div className="Home__join">
                <h3 className="Home__join-header">Join a chatroom</h3>
                <input type='text' placeholder='Enter an ID here' onKeyDown={handleJoin}/>
            </div>
            <div className="Home__create">
                <h3 className="Home__create-header">Create a chatroom</h3>
                <RoomForm />
            </div>
        </div>
    )
}
