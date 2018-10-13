import React, { Component } from 'react';

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
const kittyData = require('./score/data');


export default class KittyInformation extends Component {
  constructor(props) {
    super(props);
    let kitty = this.props.kitty;
    this.state = {
      kittyName: kitty.name,
      kittyImgUrl: kitty.image_url,
      kittyBio: kitty.bio,
      kittyGeneration: kitty.generation,
      kittyCreatedAt: kitty.created_at,
      kittyFancy: kitty.is_fancy,
      kittyExclusive: kitty.is_exclusive,
    };
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

 
  render() {
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

    var BNGenes = new BigNumber(this.props.genes);
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
}
