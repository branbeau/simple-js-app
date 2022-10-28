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
let pokemonRepository = (function() { // New pokemonRepository variable holds what the IIFE will return and assign IIFE to the variable
    
    let pokemonList = [ // PokemonList variable inside pokemonRepository IIFE (Wrap pokemonList array in an IIFE). IIFE wraps around the function - let pokemonRepository = (.
        { 
            "name": "Jigglypuff", 
            "height": 0.5, 
            "type": ["normal", "fairy"]
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
        }
    ];

    function pokemonRepository.getAll() { // pokemonRepository.getAll() returns the pokemonList array
    return pokemonList;
    }

    function add(pokemonRepository.add(item) { // Add a single item to the pokemonList array (calling pokemonRepository.add(item); should add the Pokémon referred to with item to the pokemonList array) {
        if (pokemonList[i].height < 0.8 && pokemonList[i].height > 0.2) {
            document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " That is average.<br>") {
                pokemonList.push(pokemon);
            } else {
                document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " Wow, That is big!<br>");

            }
        }
    }
    return {
        getAll: getAll, // getAll: return all items 
        add: add
    }

})()

// Using forEach() loops:
// Shows forEach loop outside of and below the IIFE. The forEach() loop iterates over each Pokémon in the repositor.
pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + " is " + pokemon.height + " m.<br>");
   });