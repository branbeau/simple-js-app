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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  let modalContainer = document.querySelector('#modal-container');

  function showModal(title, text, img) {

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", img);
    imageElement.setAttribute("width", "294"); 
    imageElement.setAttribute("height", "218");
    imageElement.setAttribute("alt", "Pokemon Image");

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
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