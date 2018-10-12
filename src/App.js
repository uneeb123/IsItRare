import React, { Component } from 'react';

import Web3 from 'web3';
import './App.css';

import logo from './question.png';

const cryptoKittyBaseUrl = "http://api.cryptokitties.co/kitties/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kittyId: "",
      kittyImgUrl: null,
      kittyName: null,
      kittyBio: null,
      kittyGen: null,
      kittyCreatedAt: null,
      kittyEntered: false,
      kittyLoaded: false,
      metamaskExists: false,
      metamaskLoggedIn: false,
      metamaskListening: false,
      account: null,
    };
    if (Web3.givenProvider) {
      this.web3 = new Web3(Web3.givenProvider);
    } else {
      this.web3 = null;
    }
  }

  componentWillMount() {
    if (this.web3) {
      this.setState({metamaskExists: true});
      this.web3.eth.getAccounts((err, accounts) => {
        if (err !== null) console.error("An error occurred: "+err);
        else if (accounts.length === 0) {
          console.log("User is not logged in to MetaMask");
          this._startListeningForMetamaskLogIn();
        }
        else {
          console.log("User is logged in to MetaMask");
          this.setState({
            metamaskLoggedIn: true,
            account: accounts[0],
          });
        }
      });
    }
  }

  shouldComponentUpdate() {
    this._removeListeningForLogIn();
    return true;
  }

  _removeListeningForLogIn = () => {
    if (this.state.metamaskListening) {
      if (this.state.metamaskLoggedIn) {
        clearInterval(this.interval);
      }
    }
  }

  // only if metamask exists, not already logged in and not listening
  _startListeningForMetamaskLogIn = () => {
    if (this.state.metamaskExists) {
      if (!this.state.matamaskLoggedIn && !this.metamaskListening) {
        this.interval = setInterval(this._checkMetamaskLoggedIn, 1000);
        this.setState({
          metamaskListening: true
        });
      }
    }
  }

  _checkMetamaskLoggedIn = () => {
    this.web3.eth.getAccounts((err, accounts) => {
      if (err !== null) console.error("An error occurred: "+err);
      if (accounts.length !== 0) {
        console.log("User is logged in to MetaMask");
        this.setState({
          metamaskLoggedIn: true,
          account: accounts[0]
        });
      }
    });
  }

  _fetchKittyInfo = (kittyId) => {
    return new Promise((resolve, reject) => {
      let url = cryptoKittyBaseUrl + kittyId;
      fetch(url)
        .then(res => res.text())
        .then((body) => {
          let json = JSON.parse(body);
          resolve(json);
        }).catch(e => reject(e));
    });
  }

  _handleId = (event) => {
    this.setState({
      kittyId: event.target.value
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    this._fetchKittyInfo(this.state.kittyId)
      .then((kitty) => {
        this.setState({
          kittyEntered: true,
          kittyImgUrl: kitty.image_url,
          kittyName: kitty.name,
          kittyBio: kitty.bio,
          kittyGen: kitty.generation,
          kittyCreatedAt: kitty.created_at,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  _enterKitty = () => {
    let headerText = "Is it rare";
    let ok;
    let mmExists = this.state.metamaskExists;
    let mmLoggedIn = this.state.metamaskLoggedIn;
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
      <div>
        {error}
        <header className="App-header">
          <img src={logo} className="Question" alt="logo" />
          <div>{headerText}</div>
          <form onSubmit={this._handleSubmit}>
            <div className="form-group row Kitty-id-form">
              <input type="text" className="form-control Kitty-id"
                value={this.state.kittyId}
                onChange={this._handleId} placeholder="Kitty id" />
              <input type="submit" className="btn btn-primary"
                value="let's find out" disabled={!ok} />
            </div>
          </form>
        </header>
      </div>
    );
  }

  _kittyInformation = () => {
    function formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    let kittyName = this.state.kittyName;
    let kittyImgUrl = this.state.kittyImgUrl;
    let kittyBio = this.state.kittyBio;
    let kittyCreatedAt = formatDate(new Date(this.state.kittyCreatedAt));

    return (
      <div className="Kitty-info">
      <div className="container Kitty-container">
        <div className="row">
          <div className="col-4">
            <div className="Kitty-basic">
              <img className="Kitty-img" src={kittyImgUrl} alt="kitty-img" />
            </div>
          </div>
          <div className="col-8">
            <div className="Kitty-info-more">
              <div className="container">
                <div className="row Kitty-row">
                  <div className="col-2 Kitty-label">Name</div>
                  <div className="col-10 Kitty-text">{kittyName}</div>
                </div>
                <div className="row Kitty-row">
                  <div className="col-2 Kitty-label">Bio</div>
                  <div className="col-10 Kitty-text">{kittyBio}</div>
                </div>
                <div className="row Kitty-row">
                  <div className="col-2 Kitty-label">Birthday</div>
                  <div className="col-10 Kitty-text">{kittyCreatedAt}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
    );
  }

  render() {
    let kittyEntered = this.state.kittyEntered;
    let body;
    if (kittyEntered) {
      body = this._kittyInformation();
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
