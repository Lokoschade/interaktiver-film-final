import React from 'react'
import './movieInfo.css'

export default function MovieInfo({ movies, id, user }) {
    //Daten von Admin werden eingefügt
    return (
        <div className='wum__admin-userInfo'>
            <div className='wum__admin-userInfo_user'>
                <p>ID: {id}</p> <p >Username: {user}</p>
            </div>
            <div className='wum__admin-userInfo_movie'>
                {movies.map((info, i) =>
                    <div key={i}>
                        <p>Titel: {info.name}</p>
                        <p>Clip: {info.position.clip} Time: {info.position.time}</p>
                    </div>)}
            </div>

        </div>
    )
}