import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    let headerText = "Is it rare?";

    return (
      <div className="App">
        <header className="App-header">
          <div>{headerText}</div>
        </header>
      </div>
    );
  }
}

export default App;
