# Gladiator Coliseum
 A browser-based RPG written in javascript
 Author: André Bourgeois

 This game was built with the help of a free code camp [tutorial](https://www.freecodecamp.org/news/learn-full-stack-development-html-css-javascript-node-js-mongodb)
 However, I have made updates and improvements based on personal preference and issues I encountered while coding the initial iteration

# personal updates and improvements
- game has been given a gladiator theme
- an if statement added to the monster damage calculation prevents a negative damage calculation from healing the player - this was an issue i discovered during a playthrough of the original game
- player weapon only has a chance to break upon a successful hit
- player name input

# to do
- player name usage in text
- implement opponent missing
- change the dodging mechanic - at the moment, dodging provides no benefit to the player - it only prolongs the fight
- implement variable levels for opponent (random, but within a range)
- background images that change based on player location (Add these to location objects)
- player leveling based on experience
- level-locked weapons ie. can only use dagger after level 5 etc.

# notes
for dodge mechanic - maybe randomize when the opponent attacks

while attacking
- both hit, both take damage
- player hit, opponent miss, opponenet take damage
- player miss, opponent hit, player take damage

while dodging
- both dodge, no damage
- player dodge, opponent attack, no damage
- player attack, opponent dodge, no damage
