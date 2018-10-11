import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kittyId: null,
    }
  }

  _handleId = (event) => {
    this.setState({
      kittyId: event.target.value
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    let headerText = "Is it rare?";

    return (
      <div className="App">
        <header className="App-header">
          <div>{headerText}</div>
          <form onSubmit={this._handleSubmit}>
            <div className="form-group row">
              <input type="text" className="form-control"
                value={this.state.kittyId}
                onChange={this._handleId} placeholder="Kitty id" />
              <input type="submit" className="btn btn-primary" value="find out" />
            </div>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
