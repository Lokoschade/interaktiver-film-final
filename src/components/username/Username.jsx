import React, { useState } from 'react'
import './username.css'

const Username = ({ setUser }) => {
    const [username, setUsername] = useState('');

    //setzt den Usernamen
    const handleSubmit = (event) => {
        event.preventDefault();
        setUser(username);
    }

    return (
        <div className='wum__username section__padding'>
            <form onSubmit={handleSubmit}>
                <p> What's your username:</p>
                <input
                        type='text'
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                <input id='button' type='submit' value='Submit'/>
            </form>
        </div>
    )
}
export default Username