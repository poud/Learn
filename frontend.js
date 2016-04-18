//_Every comment that starts with //_ (like this one) is for tutoring you (Emil).
//_  Typically I would not write this much comments. :)

//_Notice that variable names are consistent (everything in English)
//_(I know, I am the one that started to fool around with Norwegian, but... :)
//_I have made sure indentation is always 2 spaces (  ) to make
//_   my eyes bleed less :) It is typical to use this convention but you would
//_   not believe how much arguing there is around indentation!
//_Also notice that every statement or expression ends
//_   with a semicolon (;).
//_We are using single quotes (') for strings most of the time
//_   so we use it consistently.
//_In html elements we use double quotes ("), again: consistently
var nameIndex = ['fredrik johnsen', 'emil', 'ingrid johnsen', 'fredrik ekholdt'];

//_Here I invent a naming scheme that appends (Elem) to all
//_  DOM elements to make it easier to know when we are dealing
//_  with a DOM element.
var searchInputElem = document.getElementById('search-input');
var searchResultsElem = document.getElementById('search-results');
var searchNoResultsElem = document.getElementById('search-no-results');

searchInputElem.oninput = function(event) { //we override the default oninput implementation
  var searchedWord = event.target.value;
  search(searchedWord, nameIndex, searchNoResultsElem, searchResultsElem);
}

//_This is 'hoisted' to top, if this was not JavaScript
//_  we would have to define these functions BEFORE we use them.

//_It is easier to debug and test functions that do not affect
//_  variables or state outside of its scope (scope is the part
//_  of the code defined by the { }). Therefore, we declare
//_  them in the parameters.
function search(searchWord, index,
		searchNoResultsElem, searchResultsElem) {
  //_It is easier to understand this code, because we
  //_ say what we do (logically). Easier code == less bugs :)
  //_ Another way to look at it: we define things in the order,
  //_ which it is used. This is called literate programming: https://en.wikipedia.org/wiki/Literate_programming
  if (!searchWord) {
    hideElem(searchNoResultsElem);
    hideElem(searchResultsElem);
  } else {
    var results = lookupIndex(searchWord, index); //lookup names in index
    if (results.length === 0) { //notice the ===, this is JavaScript to make sure the type is the same on both sides of the === (different from ==)
      showElem(searchNoResultsElem);
      hideElem(searchResultsElem);
    } else if (results.length > 0) {
      removeChildren(searchResultsElem); //remove the children previous results
      var searchResultsListElem = createSearchResultsElem(results); //create search results
      searchResultsElem.appendChild(searchResultsListElem); //append them to searchResultsListElem

      hideElem(searchNoResultsElem);
      showElem(searchResultsElem);
    } else {
      //_It is consired good practice to always cover ALL cases of a branch/if statement.
      //_  This leads to defensive programming (https://en.wikipedia.org/wiki/Defensive_programming)
      //_  and easier-to-discover bugs...
      console.error('Something unexpected happend. Results length ' + //notice + is trailing, this is a normal convention
		    'is not equal or higher than 0', results.length)
    }
  }
}

function hideElem(elem) {
  elem.setAttribute('style', 'display:none;');
}

function showElem(elem) {
  elem.removeAttribute('style');
}

function lookupIndex(searchWord, index) {
  var results = [];
  for (var i = 0; i < index.length; i++){
    var result = index[i];
    if (result.startsWith(searchWord)) {
      results.push(result);
    }
  }
  return results;
}

function removeChildren(root) {
  var children = root.children;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    root.removeChild(child);
  }
}

function createSearchResultsElem(results) {
  var listContainerElem = document.createElement('ul');
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    var listElem = document.createElement('li');
    listElem.innerText = result;
    listContainerElem.appendChild(listElem);
  }
  return listContainerElem;
}
