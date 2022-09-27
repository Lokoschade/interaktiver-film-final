import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { About, Footer, Help, HelpHeading, Break, Username } from './components';
import { Navbar, Selection, SelectionHeading, Editor, EditorHeading, PlayerContainer } from './container';
import './app.css';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPlayer: false,
      hasName: false,
      username: '',
      movieId: '',
      clip: '',
      pos: ''
    }
  }

  //bekommt von Selection einen Wert und löst den erten Render vom Player aus
  handleCallback = (num, clip, pos) => {
    this.setState({ movieId: num, clip: clip, pos: pos, renderPlayer: true }, () => {
      console.log('MovieID ' + this.state.movieId)
    })
  }

  handleUsername = (name) => {
    this.setState({ username: name, hasName: true }, () => {
      console.log('User ' + this.state.username)
    })
  }

  render() {
    const { movieId, pos, clip } = this.state;
    var player = this.state.renderPlayer ? <PlayerContainer movieId={movieId} clip={clip} pos={pos} username={this.state.username} /> : null
    var user = this.state.hasName ? <><Selection handleClick={this.handleCallback} username={this.state.username}/> {player}</> : <Username setUser={this.handleUsername}/>
    return (
        <div className="App">
          <div className="gradient__bg">
            <Navbar/>
            <Routes>
              <Route exact path="/interaktiver-film-final" element={<About/>}/>
              <Route path="/interaktiver-film-final/movies" element={<SelectionHeading/>}/>
              <Route path="/interaktiver-film-final/editor" element={<EditorHeading/>}/>
              <Route path="/interaktiver-film-final/help" element={<HelpHeading/>}/>
            </Routes>
          </div>
          <Routes>
              <Route path="/interaktiver-film-final" element={<Break/>}/>
              <Route path="/interaktiver-film-final/movies" element={user}/>
              <Route path="/interaktiver-film-final/editor" element={<Editor/>}/>
              <Route path="/interaktiver-film-final/help" element={<Help/>}/>
          </Routes>
          <Footer/>
        </div>
    );
  }
}
 
export default App;