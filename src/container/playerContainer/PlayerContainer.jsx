import React, { Component } from 'react'
import { Player } from '../../components'
import './playerContainer.css'


export default class PlayerContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //Array, welches Daten vom Fetchaufruf enthält
            movies: [],
            //Erst wenn fetch ausgeführt wurde wird DataisLoaded auf true gesetzt
            DataisLoaded: false,
            //ShowButtons wird erst 10 Sekunden vor Ende des Clips auf true gesetzt
            ShowButtons: false,
            //Wert zum vergleichen, ob die letzten 10 Sekunden des Clips erreicht wurden
            LastTenSeconds: 0,
            currentClip: 1
        }
    }

    //wird sofort aufgerufen, nachdem Komponente gemounted wird
    componentDidMount() {
        fetch("https://gruppe7.toni-barth.com/movies/" + this.props.movieId + "/" + this.props.clip + "/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    movies: json,
                    DataisLoaded: true
                });
            })
    }
    //überprüft ob im Parent der Prop movieId geupdated wurde, wenn ja wird der Player gererendert 
    componentDidUpdate(prevProps) {
        if (prevProps.movieId !== this.props.movieId || prevProps.clip !== this.props.clip || prevProps.pos !== this.props.pos) {
            fetch("https://gruppe7.toni-barth.com/movies/" + this.props.movieId + "/" + this.props.clip + "/")
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        movies: json,
                        ShowButtons: false
                    });
                })
        }
    }
    //wird vom Callbackprop onDuration vom ReactPlayer aufgerufen
    handleDuration = (duration) => {
        //console.log('onDuration', duration)
        //Legt individuell pro Clip fest wann die letzten 10 Sekunden anfangen
        this.setState({ LastTenSeconds: duration - 10 }, () => {
            //console.log('LastTenSeconds', this.state.LastTenSeconds)
        })
    }

    //wird vom Callbackprop onProgress vom ReactPlayer aufgerufen
    handleProgress = ({ playedSeconds }) => {
        //wenn die abgespielten Sekunden >= der letzten zehn Sekunden ist und ShowButtons = false, dann ShowButtons = true
        if (playedSeconds >= this.state.LastTenSeconds && !this.state.ShowButtons) {
            this.setState({ ShowButtons: true }, () => {
                //console.log(this.state.ShowButtons)
            })
        }
        fetch("https://gruppe7.toni-barth.com/users/" + this.props.username + "/" + this.props.movieId + "/", {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "clip": this.state.currentClip, "time": playedSeconds })
        })
    }

    render() {
        const { DataisLoaded, movies } = this.state;
        const options = movies.options;
        return (
            <div className='wum__playercontainer section__padding' id='player' >
                {!DataisLoaded
                    ? <h1>Bitte warte kurz...</h1>
                    : <Player movies={movies} time={this.props.pos} onDuration={this.handleDuration} onProgress={this.handleProgress}/>}
                {this.state.ShowButtons && options.length > 0
                    ? <div className='wum__playercontainer-button'>
                        {/* je nachdem wie viele Wahlmöglichkeiten es gibt werden, die richtige Anzahl an Buttons gerendert */}
                        {options.map((number, i) => <h3 key={i} onClick={() => this.componentDidUpdate}>Clip {number}</h3>)}
                    </div>
                    : null}
            </div>
        )
    }
}

