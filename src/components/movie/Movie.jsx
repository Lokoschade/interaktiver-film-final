import React from 'react'
import { RiPlayFill } from 'react-icons/ri';
import { MdReplayCircleFilled } from 'react-icons/md';
import './movie.css'

const Movie = ({ title, loadClip, time, clip }) => {

  return (
    <div>
      <div className='wum__selection-container_movie'>
        <div className='wum__selection-container_movie-title'>
          <h3>{title}</h3>
          <div className='wum__selection-container_movie-progress'>
            <h4>Progress: </h4>
            <p>Clip: {clip} Zeit: {time}</p>
          </div>
          <div className='wum__selection-container_movie-btn'>
            { time === 0 & clip === 1
            ? <RiPlayFill className='changeColor' onClick={() => loadClip()}/>
            : <><RiPlayFill className='changeColor'onClick={() => loadClip()}/> <MdReplayCircleFilled className='changeColor'onClick={() => loadClip()}/></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
