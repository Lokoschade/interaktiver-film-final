import React, { Component } from 'react'
import { Movie } from '../../components'
import './selection.css'

export default class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      rightPos: [],
      rightClip: []
    }
  }

  //fetched die vorhandenen Movies und den Fortschritt vom jeweilig eingeloggten User
  componentDidMount() {
    Promise.all([
      fetch("https://gruppe7.toni-barth.com/movies/"),
      fetch("https://gruppe7.toni-barth.com/users/" + this.props.username + "/movies/")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        const tempPos = Array(data1.movies.length).fill(0);
        const tempClip = Array(data1.movies.length).fill(0);
        data2.movies.forEach((element, i) => {
          if (element.id - 1 === i) {
            tempPos[i] = element.position.time
            tempClip[i] = element.position.clip
          }
        });
        this.setState({
          movies: data1.movies,
          rightPos: tempPos,
          rightClip: tempClip
        })
      })
  }

  //wenn sich die Zeit geupdated hat, soll sich auch der state in Selection updaten
  componentDidUpdate(prevProps) {
    if (prevProps.time !== this.props.time) {
      fetch("https://gruppe7.toni-barth.com/users/" + this.props.username + "/movies/")
        .then((res) => res.json())
        .then((data) => {
          const tempPos = Array(data.movies.length).fill(0);
          data.movies.forEach((element, i) => {
            if (element.id - 1 === i) {
              tempPos[i] = element.position.time
            }
          });
          this.setState({
            rightPos: tempPos
          }, () => { });
        })
    }
  }
  
  render() {
    const { rightClip, rightPos, movies } = this.state;
    return (
      <div className='wum__selection section__padding'>
        <div className='wum__selection-container'>
          {/* rendere so viele Movie Componenten, wie es Elemente im gefetchten movies-Array gibt*/}
          {movies && movies.map((movie) =>
            <Movie key={movie.id} movieId={movie.id} title={movie.name} time={rightPos[movie.id - 1]} clip={rightClip[movie.id - 1]}
              loadClip={(movieId, clip, time) => this.props.handleClick(movieId, clip, time)} />)}

        </div>
      </div>
    )

  }

}