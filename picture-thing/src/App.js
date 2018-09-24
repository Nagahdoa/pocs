import React, { Component } from 'react';
import './App.css';

// import Frame from './components/Frame';
// import TestBoxList from './components/TestBoxList';
import Clock from './components/Clock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">POCS</h1>
        </header>
        <div className="App-main">
          <div className="App-main-container">
            <Clock/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
