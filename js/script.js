let pokemonRepository = (function () { // New pokemonRepository variable that holds what the IIFE will return and assign IIFE to the variable
  let pokemonList = []; // Arrays:[]
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
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
  
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && 
modalContainer.classList.contains('is-visible')) {
      hideModal();
  }
});    

  modalContainer.addEventListener('click', (e) => {
    // Also triggered when clicking INSIDE the modal container
    // Only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function add(item) {
    pokemonList.push(item);
  }

  // return all users
  function getAll() {
    return pokemonList;
  }

  // add list of buttons to the array
  function addListItem(item) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = item.name;
    button.classList.add('button-custom');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.addEventListener('click', function() {
      showDetails(item);
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
    showModal(item.name, item.height, item.image);

  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    
  };

})();

pokemonRepository.add({ name: 'Jigglypuff', height: 0.5, type: ["normal", "fairy"], image: "img/Jigglypuff.png" });
pokemonRepository.add({ name: 'Butterfree', height: 1.1, type: ["bug", "flying"], image: "img/Butterfree.png" });
pokemonRepository.add({ name: 'Lilipup', height: 0.4, type: ["normal"], image: "img/Lilipup.png" });

pokemonRepository.getAll().forEach(function(item) {
  pokemonRepository.loadList().then(function () {;
  pokemonRepository.addListItem(item);
  });
});