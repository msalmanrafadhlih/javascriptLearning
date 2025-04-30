const creatureEndpoint = "https://rpg-creature-api.freecodecamp.rocks/api/creature";

//FORM AND INPUT
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");

// TOP CONTAINER
const nameEl = document.getElementById("creature-name");
const idEl = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");

// SPECIAL INFO
const specialNameEl = document.getElementById("special-name");
const specialDescEl = document.getElementById("special-description");

// BASE STATS
const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const specialAttackEl = document.getElementById("special-attack");
const specialDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");


form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const search = input.value.trim().toLowerCase();
  
  if (!search) {
    return;
  }
  try {
  const response = await fetch(`${creatureEndpoint}/${search}`);
  if (!response.ok) throw new Error("Creature not found");
  const data = await response.json();
  updateCreatureDisplay(data);
  } 
  catch (error) {
    alert(error.message);
    clearCreatureDisplay();
  }
});

const updateCreatureDisplay = (data) => {
  const {
    name,
    id,
    weight,
    height,
    special,
    stats,
    types
  } = data;


  //Name, ID, Weight and Height
  nameEl.textContent = `${name}`;
  idEl.textContent = `#${id}`;
  weightEl.textContent = `Weight: ${weight}`;
  heightEl.textContent = `Height: ${height}`;

  specialNameEl.textContent = special.name;
  specialDescEl.textContent = special.description;

  //For stats 
  const statsMap = {};
  stats.forEach((stat) => {
    statsMap[stat.name] = stat.base_stat;
  })


  //HP, attack, defense, special
  hpEl.textContent = statsMap.hp;
  attackEl.textContent = statsMap.attack;
  defenseEl.textContent = statsMap.defense;
  specialAttackEl.textContent = statsMap["special-attack"];
  specialDefenseEl.textContent = statsMap["special-defense"];
  speedEl.textContent = statsMap.speed;

  //For types
typesEl.innerHTML = "";
types.forEach((type) => {
  const span = document.createElement("span");
  span.classList.add("type");
  span.textContent = type.name;
  typesEl.appendChild(span);
})
}

const clearCreatureDisplay = () => {
  nameEl.textContent = "";
  idEl.textContent = "";
  weightEl.textContent = "";
  heightEl.textContent = "";
  typesEl.innerHTML = "";
  specialNameEl.textContent = "";
  specialDescEl.textContent = "";
  hpEl.textContent = "";
  attackEl.textContent = "";
  defenseEl.textContent = "";
  specialAttackEl.textContent = "";
  specialDefenseEl.textContent = "";
  speedEl.textContent = "";
  input.value = "";
}