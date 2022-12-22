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
    
    //   pokemonRepository.loadDetails(pokemon).then(function () { // **Added 12/18 but this does not work**
    //   //The only bit of information the card is missing is populating the front image
    //   document.querySelector(`.card-image.${pokemon.name}`).src =
    //   pokemon.imageFront;
    //     });
    // }

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
        //console.log(pokemon);
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
  
  function displayString(string) { //Added 12/16 but receive error that string.charAt is not a function
    //Capitilizes the first letter in pokemon name
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon); //Changed from console.log(pokemon)
      });
  }
  
  let modalContainer = document.querySelector('#modal-container');
  
  function showModal(title, text, img) { 
    
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
  
    let titleElement = document.createElement('h1'); // Added 12/18
    titleElement.classList.add('modal-title'); 
    titleElement.innerText = displayString('pokemon.name');
  
    let contentElement = document.createElement('p');
    contentElement.innerText = displayString('pokemon.height'); //Changed on 12/21
  
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
