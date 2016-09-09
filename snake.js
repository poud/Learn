var rootElem = document.getElementById('snake');

//_Notice I changed things around: we no longer have a state variable to update,
//_ instead we use positions.
//_The main reason is that it would be harder (and ridiculously inefficient) keep track of the
//_ tail of the snake.
//_
//_When programming, it is not uncommon to face a dilemma such as this:
//_ should I change it now so my code fits the problem I am trying to solve better or
//_ should I brute force and find a way on top of what I have?
//_True hackers call the latter (altså: brute force): a hack... Hacking is bad, mostely because you, yourself,
//_ end up spending a lot of time fixing the bugs they always create later on...

//_Emil: this is the size of the "world". Earlier we had rows and columns, now we have x and y.
//_Read the code and figure out if what x is what we called row or column earlier.
var direction = 'L';
var worldSize = { x: 50, y: 50 };
var initPosition = { x: parseInt(worldSize.x/2), y: parseInt(worldSize.y/2) }; //_Emil: why do we parseInt here?
var initTokens = [{ x: 8, y: 10 }];
var positions = [initPosition];
var tokens = initTokens;
var running = true;

console.log("Starting...")

function step() {
  if (running) {
    var state = updateState(direction, positions, tokens);
    positions = state.positions;
    tokens = state.tokens;
    render(worldSize, positions, tokens, rootElem);
    setTimeout(step, 200);
  }
}

function restart() {
  running = true;
  positions = [initPosition];
  tokens = initTokens;
  step();
  document.getElementById("message").setAttribute('style', 'display:none;');

}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(step, 200);
  setTimeout(addToken(worldSize, positions, tokens), randomInt(300, 1000));
});

/* VIEW */

function render(worldSize, positions, tokens, rootElem) {
  console.log('Rendering...');
  var currentTableElem = tableElem();
  for (var y = 0; y < worldSize.y; y++) {
    currentTableElem.appendChild(rowElem()); //just add another row, don't need anything else
    for (var x = 0; x < worldSize.x; x++) {
      currentTableElem.appendChild(cellElem(elemType(x, y, positions, tokens))); //add the actual cell
    }
  }
  clear(rootElem);
  rootElem.appendChild(currentTableElem);
}

function tableElem() {
  var tableElem = document.createElement('table');
  tableElem.setAttribute('class', 'Board');
  return tableElem;
}

function rowElem() {
  var row = document.createElement('tr');
  row.setAttribute('class', 'Board-Row');
  return row;
}

function cellElem(cell) {
  var cellElem = document.createElement('td');
  if (cell === 'S') {
    cellElem.setAttribute('class', 'Board-Cell Board-Snake-Tail');
  } else if (cell === 'H') {
    cellElem.setAttribute('class', 'Board-Cell Board-Snake-Head');
  } else if (cell === 'T') {
    cellElem.setAttribute('class', 'Board-Cell Board-Token');
  } else {
    cellElem.setAttribute('class', 'Board-Cell');
  }
  return cellElem;
}

function elemType(x, y, positions, tokens) {
  for (var positionIndex = 0; positionIndex < positions.length; positionIndex++) {
    var position = positions[positionIndex];
    if (position.x === x && position.y === y) { //_Emil: when you see this: what does && mean?
      if (positionIndex === 0) {
        return 'H';
      } else {
        return 'S';
      }
    }
  }
  for (var tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
    var token = tokens[tokenIndex];
    if (token.x === x && token.y === y) {
      return 'T';
    }
  }
  return '';
}

function clear(rootElem) {
  while (rootElem.firstChild) {
    rootElem.removeChild(rootElem.firstChild);
  }
}

/* STATE */

document.addEventListener('keydown', function(ev) {
  console.log('Key code pressed', ev.keyCode);
  switch(ev.keyCode) {
    case 37: {
      console.log('Left');
      direction = 'L';
      ev.preventDefault();
      break;
    }
    case 39: {
      console.log('Right');
      direction = 'R';
      ev.preventDefault();
      break;
    }
    case 38: {
      console.log('Up');
      direction = 'U';
      ev.preventDefault();
      break;
    }
    case 40: {
      console.log('Down');
      direction = 'D';
      ev.preventDefault();
      break;
    }
    default: {
      //Do nothing
    }
  }
});

function updateState(direction, positions, tokens) {
  var position = positions[0];
  var nextX = position.x;
  var nextY = position.y;
  switch(direction) {
    case 'L': {
      nextX -= 1;
      break;
    }
    case 'R': {
      nextX += 1;
      break;
    }
    case 'U': {
      nextY -= 1;
      break;
    }
    case 'D': {
      nextY += 1;
      break;
    }
    default: {
      console.warn('Unknown direction!', direction);
    }
  }

  //_Emil: this is the point which might be hard to understand.
  //_If I were you I would remove all the code below and try to code it up myself to understand.
  var tailPositions = positions.slice(0, positions.length - 1);
  var nextPositions = [{ x: nextX, y: nextY }].concat(tailPositions);

  if (!crash(worldSize, positions, nextPositions)) {
    //_Emil: can you guess why I do a slice here? If not, send me a mail saying: 'no I do not understand' (which is fine :)
    var nextTokens = tokens.slice();
    for (var tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
      var token = tokens[tokenIndex];
      if (token.x === position.x && token.y === position.y) {
        nextTokens.splice(tokenIndex, 1); //_Emil: what is splice?
        nextPositions.push({ x: token.x, y: token.y });
      }
    }
    return { //_Emil: see what we do here? We return an OBJECT, not a value. Try it out in the web browser console: var a = {}. That is the same thing we're doing, but instead of creating a value we send it directly. The equivalent with a string would be: return 'balle'; (haha)...
      positions: nextPositions,
      tokens: nextTokens,
    };
  } else {
    running = false;
    document.getElementById("message").setAttribute('style', 'display:flex;');

    return {
      positions: [initPosition],
      tokens: initTokens,
    };
  }
}

function crash(worldSize, positions, nextPositions) {
  var head = nextPositions[0];
  var outsideWorld = head.y < 0 || head.y >= worldSize.y || //_Emil: what is ||? You might need it!
        head.x < 0 || head.x >= worldSize.x;
  return outsideWorld || contains(head, positions);
}

function addToken() {
  var newToken = randomPosition(worldSize, positions, tokens);
  tokens.push(newToken);
  var timeout = randomInt(400, 1000);
  setTimeout(addToken, timeout);
}

//_Emil: this might be useful. Random is 'tilfeldig' in Norwegian ;)
function randomPosition(worldSize, positions, tokens) {
  var position = {
    x: randomInt(0, worldSize.x),
    y: randomInt(0, worldSize.y),
  };
  //never return a random position where something already is
  while (contains(position, positions) || contains(position, tokens)) {
    position = {
      x: randomInt(0, worldSize.x),
      y: randomInt(0, worldSize.y),
    };
  }
  return position;
}

//_Emil: this function might be useful too!
function randomInt(min, max) {
  //min (included) and max (excluded)
  return Math.floor(Math.random() * (max - min)) + min;
}

//_Emil: aaaaand this one!
function contains(position, positions) {
  for (var positionIndex = 0; positionIndex < positions.length; positionIndex++) {
    var currentPosition = positions[positionIndex];
    //console.log(position, currentPosition);
    if (position.x === currentPosition.x &&
        position.y === currentPosition.y) {
      return true;
    }
  }
  return false;
}
