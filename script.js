// declaring variables
// can use let or var; using let is better for modern js
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = "";
// this is an array
let inventory = ["club"];
// declaration don't need to equal things to be declared
let fighting;
let monsterHealth;

/* to update an html page, html elements must
be referenced in js code */

// selects the element id button1 in the html documents
const button1 = document.querySelector("#button1");
// these buttons allow interactivty with and control of the game
const button2 = document.querySelector("#button2");
// they can be constants because they will not change
const button3 = document.querySelector("#button3");

// var allows the most changing, followed by let, and then const

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

const locations = [
    {
    name: "town square",
    buttonText: ["Go to Store", "Go to Cave", "Fight Dragon"],
    buttonFunctions: [goStore, goCave, fightDragon],
    text: "You are in the town square."
},
{
    name: "store",
    buttonText: ["Buy 10 Health | 10 Gold", "Buy Weapon | 30 Gold", "Return to Town Square"],
    buttonFunctions: [buyHealth, buyWeapon, goTown],
    text: "You are in the store."
},
{
    name: "cave",
    buttonText: ["Fight Slime", "Fight Goblin", "Return to Town Square"],
    buttonFunctions: [fightSlime, fightGoblin, goTown],
    text: "You are in the cave."
}
]


// initialize buttons - action/reaction - ie. when clicked, do something

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// create functions for buttons
function update(location) {
    button1.innerText = location.buttonText[0];
    button1.onclick = location.buttonFunctions[0];

    button2.innerText = location.buttonText[1];
    button2.onclick = location.buttonFunctions[1];

    button3.innerText = location.buttonText[2];
    button3.onclick = location.buttonFunctions[2];

    text.innerText = location.text;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function fightDragon() {

}

function fightSlime() {

}

function fightGoblin() {

}

function buyHealth() {

}


function buyWeapon() {
    
}

/* escaping a character within a string (ensuring it is literally printed)
can be done by putting a / in front of the character */