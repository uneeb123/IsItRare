import React, { Component } from 'react';

import Web3 from 'web3';
import EnterKitty from './EnterKitty';
import './App.css';

import mouth_img from './resources/mouth.png';
import color_img from './resources/color.png';
import pattern_color_img from './resources/pattern_color.png';
import body_color_img from './resources/body_color.png';
import eye_type_img from './resources/eye_type.png';
import eye_color_img from './resources/eye_color.png';
import pattern_img from './resources/pattern.png';
import body_img from './resources/body.png';


import { cattributes, mapToTrait } from './score/parse';
import { calculateGrade } from './score/score';

const BigNumber = require('bignumber.js');

const KittyCoreContractABI = require('./KittyCore.abi');
const KittyCoreContractAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
const kittyData = require('./score/data');

const cryptoKittyBaseUrl = "http://api.cryptokitties.co/kitties/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kittyImgUrl: null,
      kittyName: null,
      kittyBio: null,
      kittyGen: null,
      kittyGenes: null,
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
              kittyImgUrl: kitty.image_url,
              kittyName: kitty.name,
              kittyBio: kitty.bio,
              kittyGen: kitty.generation,
              kittyCreatedAt: kitty.created_at,
              kittyExclusive: kitty.is_exclusive,
              kittyFancy: kitty.is_fancy,
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

  _getTraits = (cattributes) => {
    return {
      mouth: mapToTrait('mouth', cattributes.mouth),
      color: mapToTrait('color', cattributes.color),
      pattern_color: mapToTrait('pattern_color', cattributes.pattern_color),
      body_color: mapToTrait('body_color', cattributes.body_color),
      eye_type: mapToTrait('eye_type', cattributes.eye_type),
      eye_color: mapToTrait('eye_color', cattributes.eye_color),
      pattern: mapToTrait('pattern', cattributes.pattern),
      body: mapToTrait('body', cattributes.body),
    }
  }
  
  _traitsData = (traits) => {
    var total = 1088074;
    var percentage = {};
    var keys = Object.keys(traits);
    keys.forEach((key) => {
      var value = kittyData[key][traits[key]];
      percentage[key] = value/total*100;
    });
    return percentage;
  }

  _geneInformation = (cattributes) => {
    let traits = this._getTraits(cattributes);
    let traitsPercent = this._traitsData(cattributes); 

    return (
      <div className="container-fluid Kitty-details">
        <div className="row">
          <div className="col-3">
            <div className="Kitty-trait-label">mouth</div>
            <img className="Trait-img" src={mouth_img} alt="mouth" />
            <div>{traits.mouth}</div>
            <div className="Trait-percent">{traitsPercent.mouth.toFixed(2)}%</div>
          </div>
          <div className="col-3">
            <div className="Kitty-trait-label">accent color</div>
            <img className="Trait-img" src={color_img} alt="color" />
            <div>{traits.color}</div>
            <div className="Trait-percent">{traitsPercent.color.toFixed(2)}%</div>
          </div>
          <div className="col-3">
            <div className="Kitty-trait-label">highlight color</div>
            <img className="Trait-img" src={pattern_color_img} alt="pattern" />
            <div>{traits.pattern_color}</div>
            <div className="Trait-percent">{traitsPercent.pattern_color.toFixed(2)}%</div>
          </div>
          <div className="col-3">
            <div className="Kitty-trait-label">base color</div>
            <img className="Trait-img" src={body_color_img} alt="body_color" />
            <div>{traits.body_color}</div>
            <div className="Trait-percent">{traitsPercent.body_color.toFixed(2)}%</div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="Kitty-trait-label">eye shape</div>
            <img className="Trait-img" src={eye_type_img} alt="eye_type" />
            <div>{traits.eye_type}</div>
            <div className="Trait-percent">{traitsPercent.eye_type.toFixed(2)}%</div>
          </div>
          <div className="col-3">
            <div className="Kitty-trait-label">eye color</div>
            <img className="Trait-img" src={eye_color_img} alt="eye_color" />
            <div>{traits.eye_color}</div>
            <div className="Trait-percent">{traitsPercent.eye_color.toFixed(2)}%</div>
          </div>
          <div className="col-3">
            <div className="Kitty-trait-label">pattern</div>
            <img className="Trait-img" src={pattern_img} alt="pattern" />
            <div>{traits.pattern}</div>
            <div className="Trait-percent">{traitsPercent.pattern.toFixed(2)}%</div>
          </div>
          <div className="col-3">
            <div className="Kitty-trait-label">fur</div>
            <img className="Trait-img" src={body_img} alt="body" />
            <div>{traits.body}</div>
            <div className="Trait-percent">{traitsPercent.body.toFixed(2)}%</div>
          </div>
        </div>
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

    var BNGenes = new BigNumber(this.state.kittyGenes);
    var kittyCattributes = cattributes(BNGenes.toString(2));

    var geneInfo = this._geneInformation(kittyCattributes);
    let grade = calculateGrade(kittyCattributes,
      this.state.kittyExclusive, this.state.kittyFancy);

    return (
      <div className="Kitty-info">
      <div className="container-fluid Kitty-container">
        <div className="row">
          <div className="col-4">
            <div className="Kitty-basic">
              <img className="Kitty-img" src={kittyImgUrl} alt="kitty-img" />
            </div>
          </div>
          <div className="col-8">
            <div className="Kitty-info-more">
              <div className="container-fluid">
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
                <div className="row Kitty-row">
                  <div className="col-2 Kitty-label">Grade</div>
                  <div className="col-10 Kitty-grade">{grade}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {geneInfo}
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
          <a href="https://github.com/uneeb123/IsItRare" rel="noopener noreferrer" target="_blank">
            <i className="fab fa-github fa-2x"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default App;
