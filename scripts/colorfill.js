var ctx = document.getElementById("canvas").getContext("2d");
var gameGrid = [];
var playerGrid = [];
var colorOptions = ["cyan", "lime", "red", "yellow", "black", "violet"];
playerMoves = 0;

// Random integer generator
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Grid will be a 7 blocks tall, and 8 blocks wide
for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
        let color = colorOptions[getRandomInt(6)];
        row.push(color);
    }
    gameGrid.push(row);
}

// Recursive function that will make sure that no colors are next to each other
function fixGrid() {
    // Switch variable for recursion
    // Essentially, this function will run until the whole grid is considered "safe" (no fixes to be done)
    let duplicate = 0;

    for (let i = 0; i < gameGrid.length; i++) {
        for (let j = 0; j < gameGrid[0].length; j++) {
            // Check Left
            if (j != 0) {
                if (gameGrid[i][j] == (gameGrid[i][j-1])) {
                    duplicate = 1;
                    gameGrid[i][j] = colorOptions[getRandomInt(6)];
                }
            }
            // Check Up
            if (i != 0) {
                if (gameGrid[i][j] == (gameGrid[i-1][j])) {
                    duplicate = 1;
                    gameGrid[i][j] = colorOptions[getRandomInt(6)];
                }
            }
            // Check Right
            if (j != gameGrid[0].length - 1) {
                if (gameGrid[i][j] == (gameGrid[i][j+1])) {
                    duplicate = 1;
                    gameGrid[i][j] = colorOptions[getRandomInt(6)];
                }
            }
            // Check Down
            if (i != gameGrid.length - 1) {
                if (gameGrid[i][j] == (gameGrid[i+1][j])) {
                    duplicate = 1;
                    gameGrid[i][j] = colorOptions[getRandomInt(6)];
                }
            }
            drawGrid(gameGrid);
        }
    }

    if (duplicate) {
        fixGrid();
    }
}

function drawGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            startX = j * 50;
            startY = i * 50;
        
            ctx.beginPath();
            ctx.rect(
                startX,
                startY,
                50,
                50);

            ctx.fillStyle = grid[i][j];
        
            ctx.fill();
        }
    }
}

function drawButtons() {
    let buttonColors = ["cyan", "lime", "red", "yellow", "black", "violet"];
    for (let i = 0; i < buttonColors.length; i++) {
        startX = (i * 60) + 50;

        ctx.beginPath();
        ctx.rect(
            startX,
            gameGrid.length * 50 + 20,
            50,
            50);
        ctx.fillStyle = buttonColors[i];
        ctx.strokeRect(
            startX,
            gameGrid.length * 50 + 20,
            50,
            50);
        ctx.fillStyle = buttonColors[i];
        ctx.strokeStyle = "black";
        ctx.fill();
    }
}

// Creation of playerGrid, used to keep track of what blocks belong to the player
for (let i = 0; i < gameGrid.length; i++) {
    let row = [];
    for (let j = 0; j < gameGrid[0].length; j++) {
        row.push(0);
    }
    playerGrid.push(row);
}
playerGrid[4][4] = 1;

// Creating "invisible" buttons that will serve to change the player blocks
for (let i = 0; i < 6; i++) {
    let button = document.createElement("button");
    button.id = "button" + i
    button.type = "submit";
    button.className = "gridButtons button" + i;
    button.style.position = "absolute";
    button.style.height = 50 + "px";
    button.style.width = 50 + "px";
    button.style.left = 58 + (60 * i) + "px";
    button.style.top = 478 + "px";
    button.style.opacity = 0 + "%";
    button.onclick = function(e) {
        playerMoves++;
        gameMove(i);
        buttonSwitch(i);
    }
    document.body.appendChild(button);
}

function buttonSwitch(choice) {
    // Turns on all buttons first
    for (let i = 0; i < 6; i++) {
        document.getElementById("button" + i).disabled = false;
    }

    document.getElementById("button" + choice).disabled = true;
}

// Changing the color of the squares the player has already obtained
function colorSwitch(choice) {
    for (let i = 0; i < gameGrid.length; i++) {
        for (let j = 0; j < gameGrid[0].length; j++) {
            // Since our tracker grid is just 0's and 1's, a simple check is all that's needed
            if (playerGrid[i][j]) {
                gameGrid[i][j] = colorOptions[choice]
            }
        }
    }
    drawGrid(gameGrid);
}

// In essence, if a square matches the color of a player-owned square (of the new color), it gets added
// to the existing player-owned square 2D array
function updatePlayerGrid(choice) {
    for (let i = 0; i < gameGrid.length; i++) {
        for (let j = 0; j < gameGrid[0].length; j++) {
            if (playerGrid[i][j]) {
                // Check Left
                if (j != 0) {
                    if (gameGrid[i][j] == (gameGrid[i][j-1])) {
                        playerGrid[i][j-1] = 1;
                    }
                }
                // Check Up
                if (i != 0) {
                    if (gameGrid[i][j] == (gameGrid[i-1][j])) {
                        playerGrid[i-1][j] = 1;
                    }
                }
                // Check Right
                if (j != gameGrid[0].length - 1) {
                    if (gameGrid[i][j] == (gameGrid[i][j+1])) {
                        playerGrid[i][j+1] = 1;
                    }
                }
                // Check Down
                if (i != gameGrid.length - 1) {
                    if (gameGrid[i][j] == (gameGrid[i+1][j])) {
                        playerGrid[i+1][j] = 1;
                    }
                }
            }
        }
    }
}

// Runs through entire grid and checks to see if player owns all squares or not
function gameWin() {
    for (let i = 0; i < playerGrid.length; i++) {
        for (let j = 0; j < playerGrid[0].length; j++) {
            if (playerGrid[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

// Function utilized from each button to execute game move
async function gameMove(choice) {
    colorSwitch(choice);
    updatePlayerGrid(choice);

    if (gameWin()) {
        drawGrid(gameGrid);
        await sleep(10);
        window.alert("Congratulations! You beat the game in " + playerMoves + " turns!");
    }
}

// Main Function
function main() {
    console.log(gameGrid);
    drawGrid(gameGrid); 
    fixGrid();
    drawButtons();
    let startingColor = gameGrid[4][4];
    let indexOfStartingColor = colorOptions.indexOf(startingColor);
    console.log(startingColor);
    console.log(indexOfStartingColor);
    document.getElementById("button" + indexOfStartingColor).disabled = true;
}

main();