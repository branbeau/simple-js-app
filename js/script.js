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

// for (let i=0; i < pokemonList.length; i++){ 
//  if (pokemonList[i].height <0.8 && pokemonList[i].height >0.2){
//      document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " That is average.<br>")
//  }else {
//      document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " Wow, That is big!<br>");
//   }
// }; 

// Comments
// Part 1: 
// Line 24: The initialization is let i=0. The conditional is i < mypokemonList.length. The action is i++.
// Line 24-31: Create a for loop that iterates over each item in pokemonList

// // Using forEach() loops:
// pokemonList.forEach((document.write(pokemonList[i].name + " is " + pokemonList[i].height + "m" + " Wow, That is big!<br>");
//  {
//   document.write(name, height, type);
// });

pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + " is " + pokemon.height + "m");
   });
