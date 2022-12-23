fetch('https://pokeapi.co/api/v2/pokemon/').then(function (response) {
  return response.json(); // This returns a promise!
}).then(function (pokemon) {
  showModal(pokemon); // The actual JSON response --- 12/14: changed to showModal vs console.log
}).catch(function () {
  // Error
});