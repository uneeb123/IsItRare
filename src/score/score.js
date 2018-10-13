const data = require('./data');

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
 *
 * UNCOMMENT THE FOLLOWING FOR TESTING
 *



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
