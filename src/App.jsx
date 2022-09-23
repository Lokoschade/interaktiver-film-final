import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { About, Footer, Help, HelpHeading, Break } from './components';
import { Navbar, Selection, SelectionHeading, Editor, EditorHeading, PlayerContainer } from './container';
import './app.css';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPlayer: false,
      movieId: ''
    }
  }

  //bekommt von Selection einen Wert und löst den erten Render vom Player aus
  handleCallback = (num) => {
    this.setState({ movieId: num, renderPlayer: true }, () => {
      console.log('MovieID ' + this.state.movieId)
    })
  }

  render() {
    const { movieId } = this.state;
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
              <Route path="/interaktiver-film-final/movies" element={<><Selection handleClick={this.handleCallback}/>
                                                                    {this.state.renderPlayer
                                                                      ? <PlayerContainer movieId={movieId} />
                                                                      : null}</>}/>
              <Route path="/interaktiver-film-final/editor" element={<Editor/>}/>
              <Route path="/interaktiver-film-final/help" element={<Help/>}/>  
          </Routes>
          <Footer/>
        </div>
    );
  }
}
 
export default App;