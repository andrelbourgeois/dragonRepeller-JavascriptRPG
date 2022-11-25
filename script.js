//declaring variables
//can use let or var; using let is better for modern js
let playerName = prompt("What is your name?");
let xp = 0;
let health = 100;
let gold = 50;
// set current weapon to 0 to access to first weapon in inventory from start
let currentWeapon = 0;
//this is an arrayANdre
let inventory = [" club"];
//declaration don't need to equal things to be declared
let fighting;
let opponentHealth;

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
const playerNameText = document.querySelector("#playerNameText");
playerNameText.innerText = playerName;
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const opponentStats = document.querySelector("#opponentStats");
const opponentNameText = document.querySelector("#opponentName");
const opponentHealthText = document.querySelector("#opponentHealth");

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
ie. opponents[1].name (or the value that corresponds with name 
at index 1 in the opponents array; Gladiator) */
//opponents array
const opponents = [
    {
        name: "Beast",
        level: 2,
        health: 15
    },
    {
        name: "Gladiator",
        level: 8,
        health: 60
    },
    {
        name: "Champion",
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
    buttonText: ["Go to Store", "Go to Arena", "Fight Champion"],
    buttonFunction: [goStore, goArena, fightChampion],
    text: "You are in the town square."
    },
    {
        name: "store",
        buttonText: ["Buy 10 Health | 10 Gold", "Buy Weapon | 30 Gold", "Return to Town Square"],
        buttonFunction: [buyHealth, buyWeapon, goTown],
        text: "You are in the store."
    },
    {
        name: "arena",
        buttonText: ["Fight Beast", "Fight Gladiator", "Return to Town Square"],
        buttonFunction: [fightBeast, fightGladiator, goTown],
        text: "You are in the arena."
    },
    {
        name: "fight",
        buttonText: ["Attack", "Dodge", "Run"],
        buttonFunction: [attack, dodge, goTown],
        text: "You are fighting an opponent."
    },
    {
        name: "kill opponent",
        buttonText: ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        // hiding the easter egg after a opponent kill
        buttonFunction: [goTown, goTown, easterEgg],
        text: "You defeated your opponent! You gain experience and find gold."
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
        text: "You defeated the Champion! You win the game!"
    },
    {
        name: "easter egg",
        buttonText: ["Two", "Seven", "Go to Town Square"],
        buttonFunction: [pickTwo, pickSeven, goTown],
        text: "You found a secret game! Pick a number above! If the number you choose matches a randomly generated number between 1 and 10, you win a prize!"
    }
]


//initialize buttons - action/reaction - ie. when clicked, do something
//these correspond with the buttons strucutured in the html and css
button1.onclick = goStore;
button2.onclick = goArena;
button3.onclick = fightChampion;

//create functions for buttons
function update(location) {
    opponentStats.style.display = "none";

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

//takes the player back to town
function goTown() {
    update(locations[0]);
}

//takes the player to the store
function goStore() {
    update(locations[1]);
}

//takes that player to the arena
function goArena() {
    update(locations[2]);
}

//in the store; allows the player ot buy health
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

//in the store - allows the player to buy a new weapon, if they don't have the most powerful
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

//if the player has the best weapon, allows the player to sell weaker weapons
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

//initialize fighting functions - allows the player to fight mosnters
function fightBeast() {
/*sets the value of fighting to correspond with their index in the
opponents array, this will allow subsequent code to easily access
the information from this array*/
    fighting = 0;
//calls goFight
    goFight();
}

function fightGladiator() {
    fighting = 1;
    goFight();
}

function fightChampion() {
    fighting = 2;
    goFight();
}

//standard function for all fights
function goFight() {
    /*update to the fighting location so the user can access the
    correct buttons*/
    update(locations[3]);
    //set opponent health from the opponents array
    opponentHealth = opponents[fighting].health;
    //reveal the opponent stats section in the html page
    opponentStats.style.display = "block";
    //set the value of the opponent stats based on the opponent array
    opponentHealthText.innerText = opponentHealth;
    opponentNameText.innerText = opponents[fighting].name;
}

//accomplishes the player's and opponents' attacks
function attack() {
    text.innerText = "The " + opponents[fighting].name + " attacks!";
    //concatenate more string
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + "!";
    
    if (isOpponentHit()) {
        //record damage to opponent - based on power of weapon and player level
        opponentHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1;
        // 10% chance weapon will break, cannot break if only weapon in inventory
        if (Math.random() <= 0.1 && inventory.length !== 1) {
            // removes final item in inventory array and displays it in text
            text.innerText += " Your" + inventory.pop() + " breaks.";
            // increments currentWeapon backwards to the next best weapon
            currentWeapon--;
        }
    } else {
        text.innerText += " You miss.";
    }

    //record damage to player
    health -= getOpponentAttackValue(opponents[fighting].level);
    //update health and opponent health
    healthText.innerText = health;
    opponentHealthText.innerText = opponentHealth;
    if (health <= 0) {
        gameOver();
    } else if (opponentHealth <= 0) {
        /*the ternary operator (below) is a quick way of writing a 
        one-line if else statement with only two options - takes 3
        operands;
        1. a condition followed by a question mark (?)
        2. an expression to execute if true, followed by a colon (:)
        3. an expression to execute if false */
        fighting === 2 ? winGame() : defeatOpponent();
        /*this statement can also be written more traditionally as;
        if (fighting === 2) {
            winGame();
        } else {
            defeatopponent();
        }*/
    }
}

//creates a opponent value based on opponent level and player xp
function getOpponentAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    // this if statement prevents a negative hit value from healing the player
    if (hit > 0) {
        return hit;
    } else {
        return 0;
    }
    
}

// randomly determines if the player hit the opponent
function isOpponentHit() {
    // will return false 20% of the time, resulting in a player miss
    return Math.random() > 0.2 || health < 20;
    // || is the logical OR operator
    // && is the logical AND operator
}

function dodge() {
    text.innerText = "You dodge the " + opponents[fighting].name + "'s attack!";
}

function defeatOpponent() {
    gold += Math.floor(opponents[fighting].level*6.7);
    xp += opponents[fighting].level;
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

//functions for easter egg
function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickSeven() {
    pick(7);
}

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }

    //finds index of guess in numbers array
    if (numbers.indexOf(guess) !== -1) {
        // guess is correct
        text.innerText += "CORRECT!! You win 100 gold!";
        gold += 100;
        goldText.innerText = gold;
    } else {
        text.innerText += "WRONG!! You lose 20 health!";
        health -= 20;
        healthText.innerText = health;
        if (health <= 0) {
            gameOver();
        }
    }
}

/* escaping a character within a string (ensuring it is literally printed)
can be done by putting a / in front of the character */

/* To Do
1. player name input DONE
2. player name usage in text
2. implement variable levels for opponent (random, but within a range)
3. background images that change based on player location (Add these to location objects)
4. leveling based on experience
5. level-locked weapons ie. can only use dagger after level 5 etc.
*/