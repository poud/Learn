// Variabler
var alleNavn = ['fredrik johnsen', 'emil', 'ingrid johnsen', 'fredrik ekholdt']
var searchBox = document.getElementById('emilboks')
var dropsearch = [];
var searchedWord = "";
var test = "d";

searchBox.oninput = function() {
  searchedWord = (event.target.value);
  console.log(searchedWord);
  search(searchedWord);
}

function back() {
  var value = document.getElementById("dropdown").value;
  document.getElementById("dropdown").value = value.substr(0, value.length - 1);
}

function search(delNavn) {
  var dropsearch = [];
  console.log("Soker opp", delNavn)
  for (var i = 0; i < alleNavn.length; i++){
    var navn = alleNavn[i]
    if (navn.startsWith(delNavn)) {
      console.log("Matcher:" , delNavn, navn)
      
      /*Legger til navnene til dropsearch array--->*/ 
      dropsearch.push(navn)
      document.getElementById("dropdown").innerHTML = dropsearch;
    }else{
      console.log("Ingen treff:", navn)
    }
  }
  console.log("Ferdig med", delNavn)    
}
document.getElementById("dropdown").innerHTML = "Ingen treff";

