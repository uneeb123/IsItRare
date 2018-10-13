import React, { Component } from 'react';

import Web3 from 'web3';
import EnterKitty from './EnterKitty';
import KittyInformation from './KittyInformation';
import './App.css';

const KittyCoreContractABI = require('./KittyCore.abi');
const KittyCoreContractAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";

const cryptoKittyBaseUrl = "http://api.cryptokitties.co/kitties/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kittyEntered: false,
      kittyLoaded: false,
      metamaskExists: false,
      metamaskLoggedIn: false,
      metamaskListening: false,
      account: null,
    };
    if (Web3.givenProvider) {
      this.web3 = new Web3(Web3.givenProvider);
      this.kittyContract = new this.web3.eth.Contract(
        KittyCoreContractABI, KittyCoreContractAddress);
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

  
  _fetchKitty = (kittyId) => {
    this._fetchKittyInfo(kittyId)
      .then((kitty) => {
        this.kittyContract.methods.getKitty(kittyId)
          .call({from: this.state.account})
          .then((result) => {
            this.setState({
              kittyGenes: result.genes,
              kittyEntered: true,
              kitty: kitty,
            });
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  }

 render() {
    let kittyEntered = this.state.kittyEntered;
    let body;
    if (kittyEntered) {
      body = (
        <KittyInformation kitty={this.state.kitty} genes={this.state.kittyGenes}/>
      );
    } else {
      body = (
        <EnterKitty metamaskExists={this.state.metamaskExists}
          metamaskLoggedIn={this.state.metamaskLoggedIn}
          fetchKitty={this._fetchKitty}
        />
      );
    }

    return (
      <div className="App">
        {body}
        <div className="footer d-flex justify-content-around">
          <a href="https://twitter.com/uneeb123" rel="noopener noreferrer" target="_blank">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="https://github.com/uneeb123/IsItRare"
            rel="noopener noreferrer" target="_blank">
            <i className="fab fa-github fa-2x"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default App;
