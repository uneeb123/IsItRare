var data = require('./data');
const fs = require('fs');

function getMouth(kai) {
  switch(kai) {
    case '1': return 'whixtensions';
    case '2': return 'wasntme';
    case '3': return 'wuvme';
    case '4': return 'gerbil';
    case '7': return 'belch';
    case '8': return 'rollercoaster';
    case '9': return 'beard';
    case 'a': return 'pouty';
    case 'b': return 'saycheese';
    case 'c': return 'grim';
    case 'f': return 'happygokitty';
    case 'g': return 'soserious';
    case 'h': return 'cheeky';
    case 'i': return 'starstruck';
    case 'k': return 'ruhroh';
    case 'm': return 'dali';
    case 'n': return 'grimace';
    case 'p': return 'tongue';
    case 'q': return 'yokel';
    case 's': return 'neckbeard';
    default: return 'unknown';
  }
}

function getBodyColor(kai) {
  switch(kai) {
    case '1': return 'shadowgrey';
    case '2': return 'salmon';
    case '4': return 'orangesoda';
    case '5': return 'cottoncandy';
    case '6': return 'mauveover';
    case '7': return 'aquamarine';
    case '8': return 'nachocheez';
    case '9': return 'harbourfog';
    case 'a': return 'cinderella';
    case 'b': return 'greymatter';
    case 'e': return 'dragonfruit';
    case 'f': return 'hintomint';
    case 'g': return 'bananacream';
    case 'h': return 'cloudwhite';
    case 'j': return 'oldlace';
    case 'k': return 'koala';
    case 'm': return 'lavender';
    case 'p': return 'verdigris';
    case 'r': return 'onyx';
    default: return 'unknown';
  }
}

function getPatternColor(kai) {
  switch(kai) {
    case '2': return 'springcrocus';
    case '3': return 'egyptiankohl';
    case '4': return 'poisonberry';
    case '5': return 'lilac';
    case '6': return 'apricot';
    case '7': return 'royalpurple';
    case '9': return 'swampgreen';
    case 'a': return 'violet';
    case 'b': return 'scarlet';
    case 'c': return 'barkbrown';
    case 'd': return 'coffee';
    case 'e': return 'lemonade';
    case 'f': return 'chocolate';
    case 'g': return 'butterscotch';
    case 'i': return 'safetyvest';
    case 'j': return 'turtleback';
    case 'm': return 'wolfgrey';
    case 'n': return 'cerulian';
    case 'o': return 'skyblue';
    case 'p': return 'garnet';
    case 's': return 'royalblue';
    case 't': return 'mertail';
    case 'v': return 'pearl';
    default: return 'unknown';
  }
}

function getColor(kai) {
  switch(kai) {
    case '1': return 'belleblue';
    case '2': return 'sandalwood';
    case '3': return 'peach';
    case '4': return 'icy';
    case '5': return 'granitegrey';
    case '7': return 'kittencream';
    case '8': return 'emeraldgreen';
    case '9': return 'kalahari';
    case 'a': return 'shale';
    case 'b': return 'purplehaze';
    case 'd': return 'azaleablush';
    case 'e': return 'missmuffet';
    case 'f': return 'morningglory';
    case 'g': return 'frosting';
    case 'h': return 'daffodil';
    case 'i': return 'flamingo';
    case 'k': return 'bloodred';
    case 'o': return 'periwinkle';
    case 'p': return 'patrickstarfish';
    case 'q': return 'seafoam';
    case 't': return 'mintmacaron';
    default: return 'unknown';
  }
}

function getEyeType(kai) {
  switch(kai) {
    case '1': return 'swarley';
    case '2': return 'wonky';
    case '3': return 'serpent';
    case '4': return 'googly';
    case '5': return 'otaku';
    case '6': return 'simple';
    case '7': return 'crazy';
    case '8': return 'thicccbrowz';
    case '9': return 'caffeine';
    case 'b': return 'baddate';
    case 'd': return 'chronic';
    case 'e': return 'slyboots';
    case 'f': return 'wiley';
    case 'g': return 'stunned';
    case 'h': return 'chameleon';
    case 'i': return 'alien';
    case 'j': return 'fabulous';
    case 'k': return 'raisedbrow';
    case 'o': return 'sass';
    case 'p': return 'sweetmeloncakes';
    case 'q': return 'oceanid';
    case 'r': return 'wingtips';
    case 't': return 'buzzed';
    case 'u': return 'bornwithit';
    default: return 'unknown';
  }
}

function getEyeColor(kai) {
  switch(kai) {
    case '1': return 'thundergrey';
    case '2': return 'gold';
    case '3': return 'topaz';
    case '4': return 'mintgreen';
    case '6': return 'sizzurp';
    case '7': return 'chestnut';
    case '8': return 'strawberry';
    case '9': return 'sapphire';
    case 'a': return 'forgetmenot';
    case 'c': return 'coralsunrise';
    case 'e': return 'doridnudibranc';
    case 'f': return 'parakeet';
    case 'g': return 'cyan';
    case 'h': return 'pumpkin';
    case 'i': return 'limegreen';
    case 'k': return 'bubblegum';
    case 'm': return 'twilightsparkle';
    case 'p': return 'eclipse';
    case 'q': return 'babypuke';
    default: return 'unknown';
  }
}

function getPattern(kai) {
  switch(kai) {
    case '2': return 'tiger';
    case '3': return 'rascal';
    case '4': return 'ganado';
    case '5': return 'leopard';
    case '6': return 'camo';
    case '8': return 'spangled';
    case '9': return 'calicool';
    case 'a': return 'luckystripe';
    case 'b': return 'amur';
    case 'c': return 'jaguar';
    case 'd': return 'spock';
    case 'f': return 'totesbasic_f';
    case 'g': return 'totesbasic_g';
    case 'i': return 'thunderstruck';
    case 'j': return 'dippedcone';
    case 'm': return 'tigerpunk';
    case 'n': return 'henna';
    case 'p': return 'totesbasic_p';
    case 's': return 'hotrod';
    default: return 'unknown';
  }
}

function getBody(kai) {
  switch(kai) {
    case '1': return 'savannah';
    case '2': return 'selkirk';
    case '4': return 'birman';
    case '5': return 'koladiviya';
    case '6': return 'bobtail';
    case '8': return 'pixiebob';
    case 'a': return 'cymric';
    case 'b': return 'chartreux';
    case 'c': return 'himalayan';
    case 'd': return 'munchkin';
    case 'e': return 'sphynx';
    case 'f': return 'ragamuffin';
    case 'g': return 'ragdoll';
    case 'h': return 'norwegianforest';
    case 'j': return 'highlander';
    case 'n': return 'mainecoon';
    case 'o': return 'laperm';
    case 'p': return 'persian';
    case 't': return 'manx';
    default: return 'unknown';
  }
}

function kaiToTrait(feature, kai) {
  switch (feature) {
    case 'mouth': return getMouth(kai);
    case 'color': return getColor(kai);
    case 'colorsecondary': return getPatternColor(kai);
    case 'colorprimary': return getBodyColor(kai);
    case 'eyes': return getEyeType(kai);
    case 'coloreyes': return getEyeColor(kai);
    case 'pattern': return getPattern(kai);
    case 'body': return getBody(kai);
    default: return 'unknown';
  }
}

var keys = Object.keys(data);
var result = {};
keys.forEach((key) => {
  var traits = Object.keys(data[key]);
  result[key] = {};
  traits.forEach((kai) => {
    var trait = kaiToTrait(key, kai);
    result[key][trait] = data[key][kai];
  });
});
fs.writeFile('converted.json', JSON.stringify(result), 'utf8', function(e, d) {
  console.log("done");
});
