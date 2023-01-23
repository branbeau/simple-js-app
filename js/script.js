let pokemonRepository = (function () { // New pokemonRepository variable that holds what the IIFE will return and assign IIFE to the variable
    let pokemonList = []; // Arrays:[]
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemonListElement = $('.pokemon-list');
  // eslint-disable-next-line linebreak-style
  
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    // eslint-disable-next-line linebreak-style
    function getAll() {
        return pokemonList;   
    }
    function addListItem(pokemon) {
        let listItem = $('<li class="list-group-item"></li>');
        //Creating list of pokemons with a button
        let button = $('<button class="pokemon-button btn btn-info" data-target="pokemon-modal" data-toggle="modal"> + pokemon.name + </button>');
        listItem.append(button);
        pokemonListElement.append(listItem);
        //Listens to button click to show details   
        button.on('click', function() {
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
            item.types = details.types.map((type) =>type.type.name);
            item.abilities = details.abilities.map((abilities) => abilities.ability.name);
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(){
            showModal(pokemon);
        });
    }
    // eslint-disable-next-line linebreak-style
    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalBody.empty();
        modalTitle.text(pokemon.name);

        let height = $('<p>' + 'Height:  ' + pokemon.height + '</p>');
        let image = $('<img class="pokemon-img" src=${pokemon.imageUrl}/>');
        let types = $('<p>' + 'Types:  ' + pokemon.types + '</p>');
        let abilities = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

        $('.modal').show();
        $('.modal').removeClass('fade');

        $('.close').click(function(){
            $('.modal').hide();
            $('.modal').addClass('fade');

        });

        modalBody.append(image);
        modalBody.append(height);
        modalBody.append(types);
        modalBody.append(abilities);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails 
    };
})();



pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});