function changeImage(id, url) {
  document.getElementById(id).src = url;
}

function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

let pokemonList = [];
let currentIndex = 0;

async function loadPokemonList() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025"
  );
  const data = await response.json();
  pokemonList = data.results; 
  showPokemon(currentIndex);  
}

async function showPokemon(index) {
  const pokemon = pokemonList[index];

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
  );
  const data = await response.json();

  const nome = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  changeText("name", `#${data.id} - ${nome}`);
  changeImage("img_sprite_front_default", data.sprites.front_default);
}

function previousPokemon() {
  if (currentIndex === 0) {
    currentIndex = pokemonList.length - 1;
  } else {
    currentIndex--;
  }
  showPokemon(currentIndex);
}

function nextPokemon() {
  if (currentIndex === pokemonList.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  showPokemon(currentIndex);
}

loadPokemonList();

