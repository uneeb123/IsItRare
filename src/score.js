const data = require('./data');

/* FAILED EXPERMIMENT
 *
function score() {
  var result = {};
  var attributes = Object.keys(data);
  attributes.forEach((attribute) => {
    result[attribute] = {};
    var attributeSum = 0;
    var geneMapForAttribute = data[attribute];
    var allGenes = Object.keys(geneMapForAttribute);
    allGenes.forEach((gene) => {
      attributeSum += geneMapForAttribute[gene];
    });
    allGenes.forEach((gene) => {
      result[attribute][gene] = data[attribute][gene]/attributeSum
    });
  });
  return result;
}

function mean() {
  let attributes = Object.keys(data);
  var result = {};
  attributes.forEach((attribute) => {
    let geneCount = Object.keys(data[attribute]).length;
    result[attribute] = 1/geneCount;
  });
  return result;
}

function standardDeviation() {
  var scores = score(data);
  var means = mean(data);
  var result = {};
  var attributes = Object.keys(scores);
  attributes.forEach((attribute) => {
    var genesScoreForAttribute = scores[attribute]
    var allGenes = Object.keys(genesScoreForAttribute);
    var sum = 0;
    allGenes.forEach((gene) => {
      sum += (genesScoreForAttribute[gene] - means[attribute]) ** 2;
    });
    result[attribute] = Math.sqrt(sum/(allGenes.length));
  });
  return result;
}

function zscore(sample) {
  var scores = score(data);
  var means = mean(data);
  var st = standardDeviation(data);
  var attributes = Object.keys(sample);
  var result = 0;
  var a = {};
  attributes.forEach((attribute) => {
    let score = scores[attribute][sample[attribute]];
    let zs = (score - means[attribute])/st[attribute];
    a[attribute] = zs;
    result += zs;
  });
  return result/(attributes.length);
}

function tscore(sample) {
  var st = standardDeviation(data);
  var zs = zscore(sample)
  var att = Object.keys(st);
  var sum_st = 0;
  att.forEach((at) => {
    sum_st += st[at];
  });
  var avg_st = sum_st/(att.length);
  console.log(avg_st);
  console.log(zs);
  console.log(zs/avg_st);
}

console.log(mean());
 console.log(standardDeviation());

var good_sample = {
  mouth: 'o',
  color: 'j',
  pattern_color: 't',
  body_color: 'n',
  eye_type: 'm',
  eye_color: 't',
  pattern: 'q',
  body: 'k',
};

var bad_sample = {
  mouth: 'g',
  color: '7',
  pattern_color: '9',
  body_color: 'b',
  eye_type: '8',
  eye_color: '8',
  pattern: 'a',
  body: 'e',
};

//console.log(zscore(good_sample));
//console.log(zscore(bad_sample));
//tscore(good_sample);
//tscore(bad_sample);

function scoreI(sample) {
  var attributes = Object.keys(data);
  var overall = 0;
  attributes.forEach((attribute) => {
    var attributeSum = 0;
    var geneMapForAttribute = data[attribute];
    let geneScore = geneMapForAttribute[sample[attribute]];
    overall += geneScore;
  });
  return overall;
}

//console.log(score(good_sample));
//console.log(score(bad_sample));
//
//
*/

function sortAttribute(geneForAttributes) {
  var sortedAttribute = [];
  var allGenes = Object.keys(geneForAttributes);
  allGenes.forEach((gene) => {
    if (sortedAttribute.length === 0) {
      sortedAttribute.push(gene);
    } else {
      for (var i=0; i<sortedAttribute.length;i++) {
        let att = sortedAttribute[i];
        if (geneForAttributes[gene] < geneForAttributes[att]) {
          sortedAttribute.splice(i, 0, gene);
          break;
        }
        if (i === sortedAttribute.length-1) {
          sortedAttribute.push(gene);
          break;
        }
      }
    }
  });
  return sortedAttribute;
}

function sortAttributes() {
  var attributes = Object.keys(data);
  var result = {};
  attributes.forEach((attribute) => {
    var geneForAttributes = data[attribute];
    result[attribute] = sortAttribute(geneForAttributes);
  });
  return result;
}

function calculateScore(sample) {
  var sortedTraits = sortAttributes();
  var allTraits = Object.keys(sample);
  var geneScore = 0;
  allTraits.forEach((trait) => {
    var currentGene = sample[trait];
    for (var i=0; i<sortedTraits[trait].length; i++) {
      if (sortedTraits[trait][i] === currentGene) {
        geneScore += parseInt(i/(sortedTraits[trait].length)*100);
        break;
      }
    }
  });
  return geneScore/allTraits.length;
}

export function calculateGrade(sample, exclusive, fancy) {
  if (exclusive) {
    return 'A+++';
  }
  if (fancy) {
    return 'A++';
  }
  var score = calculateScore(sample);
  var allGrades = ['A++', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D'];
  for (var i=0; i<allGrades.length; i++) {
    if (score < (i+1)*10) {
      return allGrades[i];
    }
  }
}
/*
var good_sample = {
  mouth: 'o',
  color: 'j',
  pattern_color: 't',
  body_color: 'n',
  eye_type: 'm',
  eye_color: 't',
  pattern: 'q',
  body: 'k',
};

var bad_sample = {
  mouth: 'g',
  color: '7',
  pattern_color: '9',
  body_color: 'b',
  eye_type: '8',
  eye_color: '8',
  pattern: 'a',
  body: 'e',
};
*/
