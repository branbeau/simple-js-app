let pokemonRepository = (function () { // New pokemonRepository variable that holds what the IIFE will return and assign IIFE to the variable
  let pokemonList = []; // Arrays:[]
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

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
        //console.log(pokemon);  - removing with update 12/9
      });
    }).catch(function (e) {
      console.error(e);
    });
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

  function add(pokemon) { // Objects: {} - Moved lines 5-17 to lines 62-73   ---------- Update this section???
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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  
(function(){

  function showModal(title, text) {
    let modalContainer = document.querySelector('#modal-container');

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.classList.add('modal-title'); // ====12/12: Added this line
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
 
    modalContainer.addEventListener('click', (e) => {
      // Also triggered when clicking INSIDE the modal
      // Only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

 }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }
 window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  document.querySelector('#show-modal').addEventListener('click', () =>
{
    showModal('Modal title', 'This is the modal content.' );
 });

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