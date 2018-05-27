import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './components/Home';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div>
            <Link to='/'>Home</Link> {'\t'}|
            <Link to="/canvas">Game</Link>
          </div>

          <Route exact path="/" component={Home} />
          <Route path="/canvas" component={Game} />
          {/* <Route path="/topics" component={Topics} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
