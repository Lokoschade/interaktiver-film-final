import React, { Component } from 'react'
import { Movie } from '../../components'
import './selection.css'

export default class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pos: []
    }
  }

  componentDidMount() {
    Promise.all([
      fetch("https://gruppe7.toni-barth.com/movies/"),
      fetch("https://gruppe7.toni-barth.com/users/" + this.props.username + "/movies/")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
        movies: data1.movies,
        pos: data2.movies
      }, () => {
      }
      ));
  }
  render() {
    const rightPos = Array(this.state.movies.length).fill(0);
    const rightClip = Array(this.state.movies.length).fill(0);
    this.state.pos.forEach((element, i) => {if(element.id -1 === i){
      rightPos[i] = element.position.time
      rightClip[i] = element.position.clip
    }})
    return (
      <div className='wum__selection section__padding'>
        <div className='wum__selection-container'>
          {/* rendere so viele Movie Componenten, wie es Elemente im gefetchten movies-Array gibt

              customClickEvent ist notwendig, weil je nach geklicktem Film soll eine andere Id weiter gegeben werden, aber da man onClick-Events nur in der Component selber behandelt kann,
              gebe ich von App die Funktion handleClick an Selection weiter, um dann per customClickEvent die movieId von App jeweils an die passende Movie-Component weiterzuleiten*/}
          {this.state.movies && this.state.movies.map((movie) =>
          <Movie key={movie.id} title={movie.name} time={rightPos[movie.id-1]} clip={rightClip[movie.id-1]} 
          loadClip={() => this.props.handleClick(movie.id, rightClip[movie.id-1], rightPos[movie.id-1])} />)}
      
        </div>
      </div>
    )

  }

}