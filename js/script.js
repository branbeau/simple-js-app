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
          detailsUrl: item.url,
        };
        add(pokemon);
        // console.log(pokemon);
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
  
  function displayString(string) { 
    //Supposed to capitilize first letter in pokemon name but it does not work
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item); //Changed from console.log(pokemon)
      });
  }
  
  let modalContainer = document.querySelector('#modal-container');
  
  function showModal(pokemon) { 
    
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
  function displayTypes(typesObject) { //Added 12/21 - Testing code
    let type1 = displayString(typesObject[0].type.name);
    if (typesObject.length > 1) {
      let type2 = displayString(typesObject[1].type.name);
      return `${type1}/${type2}`;
    } else {
      return type1;
    }
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }  

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
  
    let modalImageDiv = document.createElement("div"); // Added 12/22
    modalImageDiv.classList.add("modal-image-block");

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = pokemon.height; //Changed on 12/21
  
    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", pokemon.imageUrl);
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
