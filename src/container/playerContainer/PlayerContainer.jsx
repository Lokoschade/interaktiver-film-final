import React, { Component } from 'react'
import './playerContainer.css'
import ReactPlayer from 'react-player'

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
            LastTenSeconds: 0
        }
    }
    //wird sofort aufgerufen, nachdem Komponente gemounted wird
    componentDidMount() {
        fetch("https://gruppe9.toni-barth.com/movies/" + this.props.movieId + "/1/")
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
        if (prevProps.movieId !== this.props.movieId) {
            fetch("https://gruppe9.toni-barth.com/movies/" + this.props.movieId + "/1/")
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
    handleShowButtons = ({ playedSeconds }) => {
        //wenn die abgespielten Sekunden >= der letzten zehn Sekunden ist und ShowButtons = false, dann ShowButtons = true
        if (playedSeconds >= this.state.LastTenSeconds && !this.state.ShowButtons) {
            this.setState({ ShowButtons: true }, () => {
                //console.log(this.state.ShowButtons)
            })

        }
    }

    //wird aufgerufen, wenn einer der Fortsetzungsclips ausgewählt wurde
    loadNewClip = (number) => {
        fetch("https://gruppe9.toni-barth.com/movies/" + this.props.movieId + "/" + number + "/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    movies: json,
                    DataisLoaded: true
                });
            })
        this.setState({ ShowButtons: false })
    }

    render() {
        const { DataisLoaded, movies } = this.state;
        const options = movies.options;
        return (
            <div className='wum__playercontainer section__padding' id='player' >
                {!DataisLoaded
                    ? <h1>Bitte warte kurz...</h1>
                    : <ReactPlayer
                        className='react-player'
                        url={movies.link}
                        width='100%'
                        height='100%'
                        controls={true}
                        /* gibt die Länge des aktuell geladenen Clips weiter */
                        onDuration={this.handleDuration}
                        /* gibt in diesem Fall die abgespielten Sekunden weiter */
                        onProgress={this.handleShowButtons}
                    />}

                {this.state.ShowButtons && options.length > 0
                    ? <div className='wum__playercontainer-button'>
                        {/* je nachdem wie viele Wahlmöglichkeiten es gibt werden, die richtige Anzahl an Buttons gerendert */}
                        {options.map((number, i) => <h3 key={i} onClick={() => this.loadNewClip(number)}>Clip {number}</h3>)}
                    </div>
                    : null}
            </div>
        )
    }
}

