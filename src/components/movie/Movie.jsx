import React, { useEffect } from 'react'
import { RiPlayFill } from 'react-icons/ri';
import { MdReplayCircleFilled } from 'react-icons/md';
import './movie.css'

const Movie = ({ movieId, title, loadClip, time, clip }) => {

  useEffect(() => {
  },[time, clip])
  
  //fügt die daten von Selection ein und gibt beim klick auf einen der Buttons an Selection und von da aus an App die jeweiligen Clip und Zeit Daten zurück
  return (
    <div>
      <div className='wum__selection-container_movie'>
        <div className='wum__selection-container_movie-title'>
          <h3>{title}</h3>
          <div className='wum__selection-container_movie-progress'>
            <h4>Progress: </h4>
            <p>Clip: {clip} Zeit: {time === 0 ? 0 : Number((time).toFixed(2)).toString().split(".")[0] + "m " + Number((time).toFixed(2)).toString().split(".")[1] + "s"}</p>
          </div>
          <div className='wum__selection-container_movie-btn'>
            {time === 0 & clip === 1
              ? <RiPlayFill className='playChange' id={movieId} onClick={ () => loadClip(movieId, clip, time)} />
              : <><RiPlayFill className='playChange' id={movieId} onClick={() => loadClip(movieId, clip, time)} /> <MdReplayCircleFilled className='replayChange' id={movieId} onClick={() => loadClip(movieId, 1, 0)} /></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
