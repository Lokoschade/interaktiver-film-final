import React, { Component } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { About, Movies, Help } from './content';
//test
 
class App extends Component {
  render() {
    return (
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><Link to="/">About</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/help">Help</Link></li>
          </ul>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<About/>}/>
              <Route path="/movies" element={<Movies/>}/>
              <Route path="/help" element={<Help/>}/>
            </Routes>
             
          </div>
        </div>
    );
  }
}
 
export default App;