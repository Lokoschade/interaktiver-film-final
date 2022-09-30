import React, { Component } from 'react'
import { MovieInfo } from '../index'
import './admin.css'


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            movies: {},
        };
    }

    //beim mounten alle user abfragen und dann jeweils an fetchMovies weiterleiten
    componentDidMount() {
        fetch("https://gruppe7.toni-barth.com/users/")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    users: data.users,
                }, () => { });
                data.users.map((user, i) => this.fetchMovies(user.name))
            })
    }

    //fetchaufruf für die Filmfortschritte vom jeweiligen user, welche in einem Object gespeichert werden
    fetchMovies = (user) => {
        fetch("https://gruppe7.toni-barth.com/users/" + user + "/movies/")
            .then((res) => res.json())
            .then((data) => {
                const newMovies = { ...this.state.movies };
                newMovies[user] = data.movies;
                this.setState({
                    movies: newMovies
                }, () => {})
            })
    }

    //Gefetchte Daten werden eingefügt und gerendert
    render() {
        const { users, movies} = this.state;
        return (
            <div className='wum__admin section__padding'>
                {users && Object.keys(this.state.movies).length === users.length && users.map((user, i) => (
                <MovieInfo
                key={i}
                movies={movies[user.name]}
                id={user.id}
                user={user.name}
                />
                ))}
            </div>
        );
    }
}
