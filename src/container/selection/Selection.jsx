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
          }, () => { console.log('time changed')});
        })
    }
  }
  
  render() {
    const { rightClip, rightPos, movies } = this.state;
    return (
      <div className='wum__selection section__padding'>
        <div className='wum__selection-container'>
          {/* rendere so viele Movie Componenten, wie es Elemente im gefetchten movies-Array gibt

              customClickEvent ist notwendig, weil je nach geklicktem Film soll eine andere Id weiter gegeben werden, aber da man onClick-Events nur in der Component selber behandelt kann,
              gebe ich von App die Funktion handleClick an Selection weiter, um dann per customClickEvent die movieId von App jeweils an die passende Movie-Component weiterzuleiten*/}
          {movies && movies.map((movie) =>
            <Movie key={movie.id} movieId={movie.id} title={movie.name} time={rightPos[movie.id - 1]} clip={rightClip[movie.id - 1]}
              loadClip={(movieId, clip, time) => this.props.handleClick(movieId, clip, time)} />)}

        </div>
      </div>
    )

  }

}