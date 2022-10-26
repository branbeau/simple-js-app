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

// Line 26-32: Create a for loop that iterates over each item in pokemonList
// The initialization is let i=0. The conditional is i < mypokemonList.length. The action is i++.
// for (let i=0; i < pokemonList.length; i++){ 
//  if (pokemonList[i].height <0.8 && pokemonList[i].height >0.2){
//      document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " That is average.<br>")
//  }else {
//      document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " Wow, That is big!<br>");
//   }
// }; 

// IIFE - Immediately Invoked Function Expression  
// Create a new pokemonRepository variable to hold what your IIFE will return and assign IIFE to the variable
// Wrap pokemonList array in an IIFE. IIFE wraps around the function - let pokemonRepository = (
let pokemonRepository = (function () {
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

})()

// Using forEach() loops:
// Shows forEach loop outside of and below the IIFE. The forEach() loop iterates over each Pokémon in the repositor.
pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + " is " + pokemon.height + "m ");
   });
