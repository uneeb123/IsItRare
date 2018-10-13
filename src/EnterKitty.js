import React, { Component } from 'react';

import logo from './question.png';

export default class EnterKitty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kittyId: "",
    };
  }

  _handleId = (event) => {
    this.setState({
      kittyId: event.target.value
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchKitty(this.state.kittyId);
  }

  render() {
    let headerText = "Is it rare";
    let ok;
    let mmExists = this.props.metamaskExists;
    let mmLoggedIn = this.props.metamaskLoggedIn;
    let kittyId = this.state.kittyId;
    let error;

    if (!mmExists) {
      error = (
        <div className="alert alert-light" role="alert">
        {"Metamask does not exist. You need metamask for this."}
        </div>
      );
      ok = false;
    }
    else if (!mmLoggedIn) {
      error = (
        <div className="alert alert-light" role="alert">
        {"Metamask is not logged in. Please log in to continue."}
        </div>
      );
      ok = false;
    } else {
      ok = true;
    }

    return (
      <div className="Kitty-get">
        {error}
        <header className="App-header">
          <img src={logo} className="Question" alt="logo" />
          <div>{headerText}</div>
            <form onSubmit={this._handleSubmit}>
              <div className="form-group row Kitty-id-form">
                <input type="text" className="form-control Kitty-id"
                  value={kittyId}
                  onChange={this._handleId} placeholder="Kitty id" />
                <input type="submit" className="btn btn-primary"
                  value="let's find out" disabled={!ok} />
              </div>
          </form>
        </header>
      </div>
    );
  }
}
