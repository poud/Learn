var rootElem = document.getElementById('snake');

//_Notice I changed things around: we no longer have a state variable to update,
//_instead we use positions.
//_Remember I said the state and updateState was inefficient and that we would have to change them?
//_The main reason though, is that it is hard to add the body with a state (though you are welcome to try)
//_When programming, it is not unormal to be faced with a dilemma like this: should I change it so it fits
//_ the problem I am trying to solve better or should I brute force and find a way on top of what I have.
//_ True hackers call the latter (altså: brute force): a hack... Hacking is bad, mostely because you, yourself,
//_ end up spending a lot of time fixing hacks later on...

//_Emil: this is the size of the "world". Earlier we had rows and columns, now we have x and y.
//_Read the code and figure out if what x is what we called row or column earlier.
var worldSize = { x: 20, y: 20 };
var initPosition = { x: parseInt(worldSize.x/2), y: parseInt(worldSize.y/2) }; //_Emil: why do we parseInt here?
var direction = 'L';
var positions = [initPosition];

document.addEventListener('DOMContentLoaded', function() {
  setInterval(step, 1000);
});

/* VIEW */

function render(worldSize, positions, rootElem) {
  console.log('Rendering...');
  var currentTableElem = tableElem();
  for (var y = 0; y < worldSize.y; y++) {
    currentTableElem.appendChild(rowElem()); //just add another row, don't need anything else
    for (var x = 0; x < worldSize.x; x++) {
      currentTableElem.appendChild(cellElem(elemType(x, y, positions))); //add the actual cell
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
    cellElem.setAttribute('class', 'Board-Cell Board-Snake-Body');
  } else if (cell === 'H') {
    cellElem.setAttribute('class', 'Board-Cell Board-Snake-Head');
  } else {
    cellElem.setAttribute('class', 'Board-Cell');
  }
  return cellElem;
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

function updateState(direction, positions) {
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
  if (nextY > -1 && nextY < worldSize.y &&
      nextX > -1 && nextX < worldSize.x) {
    return [{ x: nextX, y: nextY }];
  } else {
    confirm('You are the noob!!!');
    return [initPosition];
  }
}

function elemType(x, y, positions) {
  for (var i = 0; i < positions.length; i++) {
    var position = positions[0];
    if (position.x === x && position.y === y) { //_Emil: when you see this: what does && mean?
      if (i === 0) {
        return 'H';
      } else {
        return 'S';
      }
    }
  }
  return '';
}

function step() {
  positions = updateState(direction, positions);
  render(worldSize, positions, rootElem);
}
