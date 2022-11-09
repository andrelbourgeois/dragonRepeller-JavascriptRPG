// declaring variables
// can use let or var; using let is better for modern js
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = "";
// this is an array
let inventory = [" club"];
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
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// weapons array
const weapons = [
    {
        name: " club",
        power: 5
    },
    {
        name: " dagger",
        power: 25
    },
    {
        name: " short sword",
        power: 50
    },
    {
        name: " longsword",
        power: 100
    }
]

// monsters array
const monsters = [
    {
        name: "Slime",
        level: 2,
        health: 15
    },
    {
        name: "Goblin",
        level: 8,
        health: 60
    },
    {
        name: "Dragon",
        level: 20,
        health: 300
    }
]

// locations array
const locations = [
    {
    name: "town square",
    /* can make into string if more than one word
    ie. "button text": [] */
    buttonText: ["Go to Store", "Go to Cave", "Fight Dragon"],
    buttonFunction: [goStore, goCave, fightDragon],
    text: "You are in the town square."
},
{
    name: "store",
    buttonText: ["Buy 10 Health | 10 Gold", "Buy Weapon | 30 Gold", "Return to Town Square"],
    buttonFunction: [buyHealth, buyWeapon, goTown],
    text: "You are in the store."
},
{
    name: "cave",
    buttonText: ["Fight Slime", "Fight Goblin", "Return to Town Square"],
    buttonFunction: [fightSlime, fightGoblin, goTown],
    text: "You are in the cave."
},
{
    name: "fight",
    buttonText: ["Attack", "Dodge", "Run"],
    buttonFunction: [attack, dodge, goTown],
    text: "You are fighting a monster."
}
]


// initialize buttons - action/reaction - ie. when clicked, do something

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// create functions for buttons
function update(location) {
    // this is dot notation
    button1.innerText = location.buttonText[0];
    button1.onclick = location.buttonFunction[0];

    /* must use bracket notation if more than 2 words
    ie. button1.innerText = location["button text"][1]; */
    button2.innerText = location.buttonText[1];
    button2.onclick = location.buttonFunction[1];

    button3.innerText = location.buttonText[2];
    button3.onclick = location.buttonFunction[2];

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

function buyHealth() {
    // check if the player has enough money
    if (gold >= 10) {
        // make the transaction
        gold -= 10;
        health += 10;
        // update stats
        goldText.innerText = gold;
        healthText.innerText = health;
        // update text
        text.innerText = "You bought 10 health.";
    } else {
        text.innerText = "You don't have enough gold.";
    }
    
}

function buyWeapon() {
    // check if the player has enough money
    if (currentWeapon < (weapons.length - 1)) {
        if (gold >= 30) {
            // make the transaction
            gold -= 30;
            // add new weapon to inventory
            currentWeapon ++;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            // update stats and current weapon
            goldText.innerText = gold;
            
            // update text
            text.innerText = "You bought a " + newWeapon +".";
            text.innerText += " In your inventory, you have: " + inventory;
        } else {
            text.innerText = "You don't have enough gold.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon.";
        button2.innerText = "Sell Weapon | 15 Gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        /* because let is used, this version of currentWeapon 
        is scoped only to the if statement - it only exists here*/
        let currentWeapon = inventory.shift();
        // shift moves the first element from inventory into currentWeapon
        text.innerText = "You sold a" + currentWeapon + "."
    } else {
        text.innerText = "You can't sell your last weapon."
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightGoblin() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsters[fighting].name;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks!";
    // concatenate more string
    text.innerText += "You attack it with your " + weapons[currentWeapon].name + "!";
    // record player damage
    health -= monsters[fighting].level;
    // record monster damage - based on power of weapon and player level
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1;
    // update health and monster health
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        gameOver();
    } else if (monsterHealth <= 0) {
        defeatMonster();
    }
}

function dodge() {
    text.innerText = "You dodge the " + monsters[fighting].name + "'s attack!";
}

function gameOver() {

}

function defeatMonster() {

}
/* escaping a character within a string (ensuring it is literally printed)
can be done by putting a / in front of the character */