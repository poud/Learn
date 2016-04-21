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
  [ '',  '',  '',  '',  '',  '', 'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '', 'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '', 'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '', 'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '', 'S', 'S', 'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '', 'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '', 'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '', 'S',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '', 'H',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  ''],
  [ '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '']
];

//Usually it is better to wait until html is loaded before calling JavaScript.
//We know it is loaded when the DOMContentLoaded EVENT is triggered
document.addEventListener('DOMContentLoaded', function() {
  render(state, rootElem);
})

//Remember these functions are hoisted (google it ;) ) - I will ask what it means ;)
function render(state, rootElem) {
  var rows = state.length;
  var tableElem = document.createElement('table');
  tableElem.setAttribute('class', 'Board')
  for (row = 0; row < rows; row++) {
    var columns = state[row].length;
    tableElem.appendChild(rowElem()); //just add another row, don't need anything else
    for (column = 0; column < columns; column++) {
      tableElem.appendChild(cellElem(state[row][column]));
    }
  }
  clear(rootElem);
  rootElem.appendChild(tableElem);
}

function rowElem() {
  var row = document.createElement('tr');
  row.setAttribute('class', 'Board-Row');
  return row;
}

function cellElem(cell) {
  var cellElem = document.createElement('td');
  if (cell === 'S') {//Send me a mail when you see this and tell me what the difference between === and == is (or ask if you don't remember)
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
