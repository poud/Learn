//_ Hi again, Emil!
//_ Make sure you send me a mail when you read this so I know you read the code ;)

//root elem
var rootElem = document.getElementById('snake');

//_ This is the state representing, below you'll find some simple functions that can be
//_ used to display the state. An empty String ( '') is used when nothing is there.
//_ 'S' is used to represent the snake body. 'H' is the head of the snake.
//_ First we'll figure out how the snake moves and rules and so on.
//_ Then we'll figure out how to represent the state better
var state = [
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  'H',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '']
];
var direction = 'L';

//_Usually it is better to wait until html is loaded before calling JavaScript 'stuff'.
//_We know it is loaded when the DOMContentLoaded EVENT is triggered
document.addEventListener('DOMContentLoaded', function() {
  //Send me a mail when you see this and tell me how many times "step" will be called (it is a trick question)
  setInterval(step, 200); //_What is going on here, what and where is "step" defined?
});

/* VIEW */

//_Remember these functions are hoisted (google it ;) ) - I will ask what it means ;)
function render(state, rootElem) {
  console.log('Rendering...');
  var rows = state.length;
  var currentTableElem = tableElem();
  for (var row = 0; row < rows; row++) {
    var columns = state[row].length;
    currentTableElem.appendChild(rowElem()); //just add another row, don't need anything else
    for (var column = 0; column < columns; column++) {
      currentTableElem.appendChild(cellElem(state[row][column])); //add the actual cell
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
  if (cell === 'S') { //_Send me a mail when you see this and tell me what the difference between === and == is (or ask if you don't remember)
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
  switch(ev.keyCode) { //_This is new for you, try to figure out what it does by creating a simple example on your own. Show it to me when you're done or ask if you can't.
    case 37: {
      console.log('Left');
      direction = 'L';
      ev.preventDefault(); //_What does this do (google it) and why do we use it?
      break; //_Send me a mail and tell me what break; means here and why I have it.
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
    default: { //_what does this do? And why is it empty (not even a break)(that could be a hint)?
      //Do nothing
    }
  }
});

//_This is a tricky and VERY inefficient way of doing this.
//_Let's discuss what to do later, but tell me why you think this will be problematic!
function updateState(state) {
  var nextState = fill2DArray(state, '');
  var rows = state.length;
  for (var row = 0; row < rows; row++) {
    var columns = state[row].length;
    for (var column = 0; column < columns; column++) {
      var cell = state[row][column];
      if (cell === 'H') {
        var nextRow = row;
        var nextColumn = column;
        switch(direction) {
          case 'L': {
            nextColumn -= 1; //_This is a new syntax for you - are you able to guess what it does?
            break;
          }
            case 'R': {
                nextColumn += 1;
                break;
            }
            case 'U': {
                nextRow -= 1;
                break;
            }
             case 'D': {
                nextRow += 1;
                break;  
             }
          default: {
            console.warn('Unknown direction!', direction);
          }
        }
        if (nextRow > -1 && nextRow < rows &&
            nextColumn > -1 && nextColumn < columns) {
          nextState[nextRow][nextColumn] = 'H';
        } else {
          confirm('You are the noob!!!');
          nextState[rows / 2][columns / 2] = 'H';
        }
      }
    }
  }
  return nextState;
}

//_Again, this is very inefficient.
function fill2DArray(array, value) {
  var result = [];
  var rows = array.length;
  for (var row = 0; row < rows; row++) {
    result[row] = [];
    var columns = state[row].length;
    for (var column = 0; column < columns; column++) {
      result[row][column] = value;
    }
  }
  return result;
}

function step() {
  state = updateState(state);
  render(state, rootElem);
}
