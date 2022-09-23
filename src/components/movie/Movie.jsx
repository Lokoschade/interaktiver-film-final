import React from 'react'
import './movie.css'

const Movie = ({imgUrl, title, customClickEvent}) => {

  return (
    <div>
      <div className='wum__selection-container_movie' onClick={() => customClickEvent()}>
        <div className='wum__selection-container_movie-image'>
            <img src={imgUrl} alt="thumbnail"/>
        </div>
        <div className='wum__selection-container_movie-title'>
            <h3>{title}</h3>
        </div>
      </div>
    </div>
  )
}

export default Movie
