import React, { Component } from 'react';
import './App.css';

import logo from './question.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kittyId: "",
      kittyEntered: false,
    }
  }

  _handleId = (event) => {
    this.setState({
      kittyId: event.target.value
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      kittyEntered: true,
    });
  }

  _enterKitty = () => {
    let headerText = "Is it rare";

    return (
      <div>
        <header className="App-header">
          <img src={logo} className="Question" alt="logo" />
          <div>{headerText}</div>
          <form onSubmit={this._handleSubmit}>
            <div className="form-group row Kitty-id-form">
              <input type="text" className="form-control Kitty-id"
                value={this.state.kittyId}
                onChange={this._handleId} placeholder="Kitty id" />
              <input type="submit" className="btn btn-primary" value="find out" />
            </div>
          </form>
        </header>
      </div>
    );
  }

  render() {
    let kittyEntered = this.state.kittyEntered;
    let body;
    if (kittyEntered) {
      body = (<div></div>);
    } else {
      body = this._enterKitty();
    }

    return (
      <div className="App">
        {body}
      </div>
    );
  }
}

export default App;
