import React, { useEffect, useState } from 'react'
import { Movie } from '../../components'
import imgUrl from '../../assets/thumbnail.jpg'
import './selection.css'

const Selection = ({handleClick}) => {

  const [movies, setMovies] = useState();


  useEffect(() => {
    fetch("https://gruppe7.toni-barth.com/movies/")
    .then(res => {
      return res.json();
    })
    .then(data => {
      setMovies(data.movies)
    })
    }, []);

  return (
    <div className='wum__selection section__padding'>
        <div className='wum__selection-container'>
          {/* rendere so viele Movie Componenten, wie es Elemente im gefetchten movies-Array gibt

              customClickEvent ist notwendig, weil je nach geklicktem Film soll eine andere Id weiter gegeben werden, aber da man onClick-Events nur in der Component selber behandelt kann,
              gebe ich von App die Funktion handleClick an Selection weiter, um dann per cutomClickEvent die movieId von App jeweils an die passende Movie-Component weiterzuleiten*/}
          {movies && movies.map((movie) => <Movie key={movie.id} imgUrl={imgUrl} title={movie.name} customClickEvent={() => handleClick(movie.id)}/>)} 
        </div>
      </div>
  )
}

export default Selection