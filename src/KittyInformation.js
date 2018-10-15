import React, { Component } from 'react';

import mouth_img from './resources/mouth.png';
import color_img from './resources/color.png';
import pattern_color_img from './resources/pattern_color.png';
import body_color_img from './resources/body_color.png';
import eye_type_img from './resources/eye_type.png';
import eye_color_img from './resources/eye_color.png';
import pattern_img from './resources/pattern.png';
import body_img from './resources/body.png';

import { calculateGrade } from './score/score';

export default class KittyInformation extends Component {
  constructor(props) {
    super(props);
    let kitty = this.props.kitty;
    this.kittyData = this.props.kittyData;
    this.state = {
      kittyName: kitty.name,
      kittyImgUrl: kitty.image_url,
      kittyBio: kitty.bio,
      kittyGeneration: kitty.generation,
      kittyCreatedAt: kitty.created_at,
      kittyFancy: kitty.is_fancy,
      kittyExclusive: kitty.is_exclusive,
      kittyCattributes: null,
      kittyCattributesExists: false,
    };
  }

  componentWillMount() {
    this._mapCattributes(this.props.kitty);
  }

  _mapCattributes = (kitty) => {
    let cattributes = kitty.enhanced_cattributes;
    // TODO not the strongest check
    if (cattributes.length > 0) {
      var result = {};
      cattributes.forEach((cattribute) => {
        result[cattribute.type] = cattribute.description
      });
      this.setState({
        kittyCattributes: result,
        kittyCattributesExists: true,
      });
    }
  }

  _calculateTotal = () => {
    // body can be replaced
    let cattribute = this.kittyData.body;
    var total = 0;
    Object.keys(cattribute).forEach((key) => {
      total += parseInt(cattribute[key]);
    });
    return total;
  }
 
  _traitsData = (traits) => {
    let total = this._calculateTotal();
    let kittyData = this.kittyData;
    var percentage = {};
    let keys = Object.keys(traits);
    keys.forEach((key) => {
      let geneQuantity = kittyData[key];
      let exactGene = traits[key];
      let value;
      if (exactGene === 'totesbasic') {
        value = parseInt(geneQuantity['totesbasic_f'] + geneQuantity['totesbasic_g'] + geneQuantity['totesbasic_p']);
      } else {
        value = parseInt(geneQuantity[exactGene]);
      }
      percentage[key] = value/total*100;
    });
    return percentage;
  }


  _geneInformation = (traits) => {
    let traitsPercent = this._traitsData(traits); 

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
            <div>{traits.colortertiary}</div>
            <div className="Trait-percent">{traitsPercent.colortertiary.toFixed(2)}%</div>
          </div>
          <div className="col-3">
            <div className="Kitty-trait-label">highlight color</div>
            <img className="Trait-img" src={pattern_color_img} alt="pattern" />
            <div>{traits.colorsecondary}</div>
            <div className="Trait-percent">{traitsPercent.colorsecondary.toFixed(2)}%</div>
          </div>
          <div className="col-3">
            <div className="Kitty-trait-label">base color</div>
            <img className="Trait-img" src={body_color_img} alt="body_color" />
            <div>{traits.colorprimary}</div>
            <div className="Trait-percent">{traitsPercent.colorprimary.toFixed(2)}%</div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="Kitty-trait-label">eye shape</div>
            <img className="Trait-img" src={eye_type_img} alt="eye_type" />
            <div>{traits.eyes}</div>
            <div className="Trait-percent">{traitsPercent.eyes.toFixed(2)}%</div>
          </div>
          <div className="col-3">
            <div className="Kitty-trait-label">eye color</div>
            <img className="Trait-img" src={eye_color_img} alt="eye_color" />
            <div>{traits.coloreyes}</div>
            <div className="Trait-percent">{traitsPercent.coloreyes.toFixed(2)}%</div>
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
    var kittyCattributes = this.state.kittyCattributes;;

    var geneInfo;
    if (this.state.kittyCattributesExists) {
      geneInfo = this._geneInformation(kittyCattributes);
    }
    let grade = calculateGrade(kittyCattributes,
      this.state.kittyExclusive, this.state.kittyFancy, this.kittyData);

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
