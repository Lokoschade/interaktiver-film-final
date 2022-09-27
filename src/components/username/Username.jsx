import React, { useState } from 'react'
import './username.css'

const Username = ({ setUser }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser(username);
    }

    return (
        <div className='wum__username section__padding'>
            <form onSubmit={handleSubmit}>
                <label> What's your username:
                    <input
                        type='text'
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}
export default Username