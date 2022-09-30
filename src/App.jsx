import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { About, Footer, Help, HelpHeading, Break, Username, Admin } from './components';
import { Navbar, Selection, SelectionHeading, Editor, EditorHeading, PlayerContainer } from './container';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPlayer: false,
      hasName: false,
      isAdmin: false,
      username: '',
      movieId: '',
      clip: '',
      pos: ''
    }
  }

  //bekommt von Selection einen Wert und löst den ersten Render vom Player aus
  handleCallback = (num, clip, pos) => {
    this.setState({ movieId: num, clip: clip, pos: pos, renderPlayer: true }, () => { })
  }

  handleUsername = (name) => {
    if (name === 'admin') {
      this.setState({ isAdmin: true }, () => { })
    } else {
      this.setState({ username: name, hasName: true }, () => { })
    }
  }

  render() {
    const { movieId, pos, clip } = this.state;
    var player = this.state.renderPlayer ? <PlayerContainer handleClick={this.handleCallback} movieId={movieId} clip={clip} pos={pos} username={this.state.username}/> : null
    var user = this.state.hasName ? <><Selection handleClick={this.handleCallback} username={this.state.username} time={pos} /> {player}</> : <Username setUser={this.handleUsername}/>

    return (
      <div className="App">
        <div className="gradient__bg">
          <Navbar />
          <Routes>
            <Route exact path="/interaktiver-film-final" element={<About />} />
            <Route path="/interaktiver-film-final/movies" element={<SelectionHeading />} />
            <Route path="/interaktiver-film-final/editor" element={<EditorHeading />} />
            <Route path="/interaktiver-film-final/help" element={<HelpHeading />} />
          </Routes>
        </div>
        <Routes>
          <Route path="/interaktiver-film-final" element={<Break />} />
          <Route path="/interaktiver-film-final/movies" element={this.state.isAdmin ? <Admin/> : user} />
          <Route path="/interaktiver-film-final/editor" element={<Editor />} />
          <Route path="/interaktiver-film-final/help" element={<Help />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;