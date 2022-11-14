// Strings: ""
// Arrays:[]
// Objects: {}

// Line 7-13: Create a for loop that iterates over each item in pokemonList
// The initialization is let i=0. The conditional is i < mypokemonList.length. The action is i++.
// for (let i=0; i < pokemonList.length; i++){ 
//  if (pokemonList[i].height <0.8 && pokemonList[i].height >0.2){
//      document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " That is average.<br>")
//  }else {
//      document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " Wow, That is big!<br>");
//   }
// }; 

// IIFE - Immediately Invoked Function Expression  
let pokemonRepository = (function () { // New pokemonRepository variable that holds what the IIFE will return and assign IIFE to the variable
    // let pokemonList =  [//) PokemonList variable inside pokemonRepository IIFE (Wrap pokemonList array in an IIFE). IIFE wraps around the function - let pokemonRepository = (.
    //                     // Moved pokemonList from outside of repository. The list previously started on line 1.
  let repository = [
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
        },
    ];

    //  function add(pokemon) {
    //     pokemonList.push(pokemon);
    // }

    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "height" in pokemon &&
        "types" in pokemon
        ) {
            repository.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
      return repository;
        // function getAll() {
        //    return pokemonList;
    }

    function addListItem(pokemon) {
    // Lines 43-50 was cut from line 67-73 and indented so code is inside the function 
      let pokemonList = document.querySelector(".pokemon-list"); // Created pokemonList variable. Selected the class that was just created in the index.html file - .pokemon-list. Be sure to add dot in front of class name.
      let listpokemon = document.createElement("li"); // Have you UL and inside the UL an element was created for the li. 
      let button = document.createElement("button"); // Inside each li, a button will be created. 
      button.innerText = pokemon.name;
      button.classList.add("button-class"); // This styles the button based on the css file. 
      listpokemon.appendChild(button); // Call list on line 57 to append child and this appends the button
      pokemonList.appendChild(listpokemon); // Append listpokemon from line 58 
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });

    }
    
    function showDetails(item) {
    
    }
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem // Calling the addListItem from line 42 under return
    };

})();

// pokemonList.forEach(function (pokemon) { // Using forEach() loops. Added forEach loop outside of and below the IIFE. The forEach() loop iterates over each Pokémon in the repositor.
//     document.write(pokemon.name + " is " + pokemon.height + " m.<br>");
//    });
// pokemonRepository.getAll().forEach( function(pokemon) { // Using forEach() loops. Added forEach loop outside of and below the IIFE. The forEach() loop iterates over each Pokémon in the repositor.
//     document.write(pokemon.name + " is " + pokemon.height + " m.<br>");
//    });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});