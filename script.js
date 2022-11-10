//declaring variables
//can use let or var; using let is better for modern js
let xp = 0;
let health = 100;
let gold = 50;
// set current weapon to 0 to access to first weapon in inventory from start
let currentWeapon = 0;
//this is an array
let inventory = [" club"];
//declaration don't need to equal things to be declared
let fighting;
let monsterHealth;

/*to update an html page, html elements must
be referenced in js code*/

//selects the element id button1 in the html documents
const button1 = document.querySelector("#button1");
//these buttons allow interactivty with and control of the game
const button2 = document.querySelector("#button2");
//they can be constants because they will not change
const button3 = document.querySelector("#button3");

//var allows the most changing, followed by let, and then const

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

/*the following arrays prevent rewriting code to implement similar 
functions throughout this file*/
//weapons array
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
/*items in these arrays can be accessed dot notation
ie. monsters[1].name (or the value that corresponds with name 
at index 1 in the monsters array; Goblin) */
//monsters array
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
/*the arrays are const because their values will not change, if you
need to write information to them, they would be let or var*/
//locations array
const locations = [
    {
    name: "town square",
    /*can make into string if more than one word
    ie. "button text": []*/
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
},
{
    name: "kill monster",
    buttonText: ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
    buttonFunction: [goTown, goTown, goTown],
    text: "You defeated the monster! You gain experience and find gold."
},
{
    name: "game over",
    buttonText: ["Replay?", "Replay?", "Replay?"],
    buttonFunction: [restart, restart, restart],
    text: "You died."
},
{
    name: "win game",
    buttonText: ["Replay?", "Replay?", "Replay?"],
    buttonFunction: [restart, restart, restart],
    text: "You defeated the dragon! You win the game!"
}
]


//initialize buttons - action/reaction - ie. when clicked, do something
//these correspond with the buttons strucutured in the html and css
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//create functions for buttons
function update(location) {
    monsterStats.style.display = "none";

    //this is dot notation
    button1.innerText = location.buttonText[0];
    button1.onclick = location.buttonFunction[0];

    /*must use bracket notation if more than 2 words
    ie. button1.innerText = location["button text"][1];*/
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
    //check if the player has enough money
    if (gold >= 10) {
        //make the transaction
        gold -= 10;
        health += 10;
        //update stats
        goldText.innerText = gold;
        healthText.innerText = health;
        //update text
        text.innerText = "You bought 10 health.";
    } else {
        text.innerText = "You don't have enough gold.";
    }
    
}

function buyWeapon() {
    //check if the player has enough money
    if (currentWeapon < (weapons.length - 1)) {
        if (gold >= 30) {
            //make the transaction
            gold -= 30;
            //add new weapon to inventory
            currentWeapon ++;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            //update stats and current weapon
            goldText.innerText = gold;
            
            //update text
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
        /*because let is used, this version of currentWeapon 
        is scoped only to the if statement - it only exists here*/
        let currentWeapon = inventory.shift();
        //shift moves the first element from inventory into currentWeapon
        text.innerText = "You sold a" + currentWeapon + "."
    } else {
        text.innerText = "You can't sell your last weapon."
    }
}
//initialize the fighting functions
function fightSlime() {
/*sets the value of fighting to correspond with their index in the
monsters array, this will allow subsequent code to easily access
the information from this array*/
    fighting = 0;
//calls goFight
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
    /*update to the fighting location so the user can access the
    correct buttons*/
    update(locations[3]);
    //set monster health from the monsters array
    monsterHealth = monsters[fighting].health;
    //reveal the monster stats section in the html page
    monsterStats.style.display = "block";
    //set the value of the monster stats based on the monster array
    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsters[fighting].name;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks!";
    // concatenate more string
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + "!";
    // record player damage
    health -= monsters[fighting].level;
    // record monster damage - based on power of weapon and player level
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1;
    // update health and monster health
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    console.log(monsterHealth);
    if (health <= 0) {
        gameOver();
    } else if (monsterHealth <= 0) {
        /*the ternary operator (below) is a quick way of writing a 
        one-line if else statement with only two options - takes 3
        operands;
        1. a condition followed by a question mark (?)
        2. an expression to execute if true, followed by a colon (:)
        3. an expression to execute if false */
        fighting === 2 ? winGame() : defeatMonster();
        /*this statement can also be written more traditionally as;
        if (fighting === 2) {
            winGame();
        } else {
            defeatMonster();
        }*/
    }
}

function dodge() {
    text.innerText = "You dodge the " + monsters[fighting].name + "'s attack!";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level*6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function gameOver() {
    update(locations[5]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["club"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goTown();
}

function winGame() {
    update(locations[6]);
}

/* escaping a character within a string (ensuring it is literally printed)
can be done by putting a / in front of the character */

/* ISSUES
1. 
*/