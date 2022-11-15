let pokemonRepository = (function () { // New pokemonRepository variable that holds what the IIFE will return and assign IIFE to the variable
  let pokemonList = []; // Arrays:[]
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function add(pokemon) { // Objects: {}
      if (
        typeof pokemon === "object" && // Strings: ""
        "name" in pokemon 
      ) {
        pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
    function getAll() {
      return pokemonList;   
    }
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list"); 
      let listpokemon = document.createElement("li");  
      let button = document.createElement("button");  
      button.innerText = pokemon.name;
      button.classList.add("button-class"); // This styles the button based on the css file. 
      listpokemon.appendChild(button); 
      pokemonList.appendChild(listpokemon);  
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
    }
    
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem, // Calling the addListItem from line 42 under return
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    };
})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});