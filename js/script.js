// Create a new pokemonRepository variable to hold what your IIFE will return and assign IIFE to the variable  - Line 2
let pokemonRepository = (function () {

let pokemonList = [
   {
     "name": "Jigglypuff",
     "height": 0.5,
     "type": [
        "normal", "fairy"]
    },
    {
      "name": "Butterfree",
      "height": 1.1,
      "type": ["bug", "flying"]
    },
    {
      "name": "Lilipup",
      "height": 0.4,
      "type": ["normal"]
    },
];

// Strings: ""
// Arrays:[]
// Objects: {}

// Line 28-34: Create a for loop that iterates over each item in pokemonList
// The initialization is let i=0. The conditional is i < mypokemonList.length. The action is i++.
// for (let i=0; i < pokemonList.length; i++){ 
//  if (pokemonList[i].height <0.8 && pokemonList[i].height >0.2){
//      document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " That is average.<br>")
//  }else {
//      document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " Wow, That is big!<br>");
//   }
// }; 

// Wrap pokemonList array in an IIFE - starts on line 2 then continues on 42-54
function getAll () {
    return pokemonList;
}
function add (pokemon) {
    pokemonList.push(pokemon);
}

return {
    getAll: getAll,
    add: add
};

}}()
document.write(pokemonRepository.getAll)())

// Using forEach() loops:
// **Note - Moved forEach loop per task comment "Outside of and below the IIFE, you should already have a forEach() loop that iterates over each Pokémon in the repositor" (line 58-60).
// The forEach loop worked and showed up on index.html before the pokemonRepository was added.
pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + " is " + pokemon.height + "m");
   });
