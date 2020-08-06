import React from 'react'
import {NavLink} from 'react-router-dom'
export default function NotFound() {
    console.log('404')
    return (
        <div className='NotFound'>
            <p>Uh oh! Looks like something went wrong :(</p>
            <NavLink to='/' >Go back</NavLink>
        </div>
    )
}
