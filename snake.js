//_ Hi again, Emil!
//_ Make sure you send me a mail when you read this so I know you read the code ;)



//_ This is the state representing, below you'll find some simple functions that can be
//_ used to display the state. An empty String ( '') is used when nothing is there.
//_ 'S' is used to represent the snake body. 'H' is the head of the snake.
//_ First we'll figure out how the snake moves and rules and so on.
//_ Then we'll figure out how to represent the state better
var state = [
  [ '',  '',  '',  '',  '',  '',  '',  'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  'S',  'S',  'S',  'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  'H',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
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

//_Usually it is better to wait until html is loaded before calling JavaScript 'stuff'.
//_We know it is loaded when the DOMContentLoaded EVENT is triggered
document.addEventListener('DOMContentLoaded', function() {
  //root elem
  var rootElem = document.getElementById('snake');
  render(state, rootElem);
})

//_Remember these functions are hoisted (google it ;) ) - I will ask what it means ;)
function render(state, rootElem) {
  var rows = state.length;
  var currentTableElem = tableElem();
  for (row = 0; row < rows; row++) {
    var columns = state[row].length;
    currentTableElem.appendChild(rowElem()); //just add another row, don't need anything else
    for (column = 0; column < columns; column++) {
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
