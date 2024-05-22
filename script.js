const input = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const pokemonImage = document.querySelector('#pokemon-image');
const pokemonName = document.querySelector('#pokemon-name');
const pokemonId = document.querySelector('#pokemon-id');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const types = document.querySelector('#types');
const hp = document.querySelector('#hp');
const attack = document.querySelector('#attack');
const defense = document.querySelector('#defense');
const specialAttack = document.querySelector('#special-attack');
const specialDefense = document.querySelector('#special-defense');
const speed = document.querySelector('#speed');

searchButton.addEventListener('click', () => {
    types.textContent = '';
    const name = input.value;
    const formattedName = name
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .replace('♀', '-f')
        .replace('♂', '-m');

    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${formattedName}`)
        .then(response => response.json())
        .then(data => {
            pokemonName.textContent = data.name.toUpperCase();
            pokemonImage.src = data.sprites.front_default;
            pokemonImage.id = 'sprite';
            pokemonId.textContent = `#${data.id}`;
            weight.textContent = data.weight;
            height.textContent = data.height;
            data.types.forEach(type => {
                const typeElement = document.createElement('span');
                typeElement.textContent = type.type.name.toUpperCase();
                types.appendChild(typeElement);
                types.appendChild(document.createTextNode(' '));
            });
            hp.textContent = data.stats[0].base_stat;
            attack.textContent = data.stats[1].base_stat;
            defense.textContent = data.stats[2].base_stat;
            specialAttack.textContent = data.stats[3].base_stat;
            specialDefense.textContent = data.stats[4].base_stat;
            speed.textContent = data.stats[5].base_stat;
            pokemonImage.style.display = 'block';
        })
        .catch(() => {
            alert('Pokémon not found');
            pokemonName.textContent = 'Pokémon not found';
            pokemonId.textContent = '';
            weight.textContent = '';
            height.textContent = '';
            types.textContent = '';
            hp.textContent = '';
            attack.textContent = '';
            defense.textContent = '';
            specialAttack.textContent = '';
            specialDefense.textContent = '';
            speed.textContent = '';
        });
});