function kaiNotation(str) {
  switch(str) {
    case 0: return '1';
    case 1: return '2';
    case 2: return '3';
    case 3: return '4';
    case 4: return '5';
    case 5: return '6';
    case 6: return '7';
    case 7: return '8';
    case 8: return '9';
    case 9: return 'a';
    case 10: return 'b';
    case 11: return 'c';
    case 12: return 'd';
    case 13: return 'e';
    case 14: return 'f';
    case 15: return 'g';
    case 16: return 'h';
    case 17: return 'i';
    case 18: return 'j';
    case 19: return 'k';
    case 20: return 'm';
    case 21: return 'n';
    case 22: return 'o';
    case 23: return 'p';
    case 24: return 'q';
    case 25: return 'r';
    case 26: return 's';
    case 27: return 't';
    case 28: return 'u';
    case 29: return 'v';
    case 30: return 'w';
    case 31: return 'x';
    default:
      console.error("Incorrectly represented binary string");
  }
}

function convertToFullSequence(s) {
  if (s.length > 240) {
    console.error("Sequence too big");
    return;
  }
  let leadingZerosCount = 240 - s.length;
  let leadingZeros = [...Array(leadingZerosCount)].map(x=>'0').join('');
  return leadingZeros+s;
}

function parseGene(trait) {
  if (trait.length !== 20) {
    console.error("Wrongly formatted trait");
    return;
  }
  
  // it's inversed
  let gene4 = kaiNotation(parseInt(trait.slice(0,5).join(''),2));
  let gene3 = kaiNotation(parseInt(trait.slice(5,10).join(''),2));
  let gene2 = kaiNotation(parseInt(trait.slice(10,15).join(''),2));
  let gene1 = kaiNotation(parseInt(trait.slice(15,20).join(''),2));

  return {p: gene1, h1: gene2, h2: gene3, h3: gene4}
}

export function cattributes(binary) {
  let sequence = convertToFullSequence(binary);
  let sequenceArray = sequence.split('');
  // let trait1 = sequenceArray.slice(0,20);
  // let trait2 = sequenceArray.slice(20,40);
  // let trait3 = sequenceArray.slice(40,60);
  let trait4 = sequenceArray.slice(60,80);
  // let trait5 = sequenceArray.slice(80,100);
  let trait6 = sequenceArray.slice(100,120);
  let trait7 = sequenceArray.slice(120,140);
  let trait8 = sequenceArray.slice(140,160);
  let trait9 = sequenceArray.slice(160,180);
  let trait10 = sequenceArray.slice(180,200);
  let trait11 = sequenceArray.slice(200,220);
  let trait12 = sequenceArray.slice(220,240);

  return {
    mouth: parseGene(trait4).p,
    color: parseGene(trait6).p,
    pattern_color: parseGene(trait7).p,
    body_color: parseGene(trait8).p,
    eye_type: parseGene(trait9).p,
    eye_color: parseGene(trait10).p,
    pattern: parseGene(trait11).p,
    body: parseGene(trait12).p,
  };
}


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

export function mapToTrait(feature, kai) {
  switch (feature) {
    case 'mouth': return getMouth(kai);
    case 'color': return getColor(kai);
    case 'pattern_color': return getPatternColor(kai);
    case 'body_color': return getBodyColor(kai);
    case 'eye_type': return getEyeType(kai);
    case 'eye_color': return getEyeColor(kai);
    case 'pattern': return getPattern(kai);
    case 'body': return getBody(kai);
    default: return 'unknown';
  }
}
