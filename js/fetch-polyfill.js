fetch('https://pokeapi.co/api/v2/pokemon/').then(function (response) {
  return response.json(); // This returns a promise!
}).then(function (pokemonList) {
  showModal(pokemonList); // The actual JSON response --- 12/14: changed to showModal vs console.log
}).catch(function () {
  // Error
});