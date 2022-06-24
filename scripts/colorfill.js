// GAME SETUP (CHANGEABLE)
var colorOptions = ["cyan", "lime", "red", "yellow", "black", "violet"];
var gridHeight = 9; // ONLY ODD NUMBERS PLEASE
var gridWidth = 9; // ONLY ODD NUMBERS PLEASE

// Safe-check (will be removed later)
if (gridWidth % 2 == 0 || gridHeight % 2 == 0) {
    window.alert("Error! Grid width/height shouldn't be an even number..");
}

// Necessary variables to set up the project
var ctx = document.getElementById("canvas").getContext("2d");
var colors = colorOptions.length;
var gameGrid = [];
var playerGrid = [];
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
function createGrid() {
    gameGrid = [];

    for (let i = 0; i < gridHeight; i++) {
        let row = [];
        for (let j = 0; j < gridWidth; j++) {
            let color = colorOptions[getRandomInt(colors)];
            row.push(color);
        }
        gameGrid.push(row);
    }

    fixGrid();
    drawGrid(gameGrid);
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
                    gameGrid[i][j] = colorOptions[getRandomInt(colors)];
                }
            }
            // Check Up
            if (i != 0) {
                if (gameGrid[i][j] == (gameGrid[i-1][j])) {
                    duplicate = 1;
                    gameGrid[i][j] = colorOptions[getRandomInt(colors)];
                }
            }
            // Check Right
            if (j != gameGrid[0].length - 1) {
                if (gameGrid[i][j] == (gameGrid[i][j+1])) {
                    duplicate = 1;
                    gameGrid[i][j] = colorOptions[getRandomInt(colors)];
                }
            }
            // Check Down
            if (i != gameGrid.length - 1) {
                if (gameGrid[i][j] == (gameGrid[i+1][j])) {
                    duplicate = 1;
                    gameGrid[i][j] = colorOptions[getRandomInt(colors)];
                }
            }

            drawGrid(gameGrid);
        }
    }

    if (duplicate) {
        fixGrid();
    }
}

// Uses canvas object to draw each rectangle
function drawGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            // Top left of each square
            startX = j * 50;
            startY = i * 50;
        
            // Creatiion of rectangle
            ctx.beginPath();
            ctx.rect(
                startX,
                startY,
                50,
                50);
            
            // Uses 2D array grid to fill in the appropriate color
            ctx.fillStyle = grid[i][j];
        
            ctx.fill();
        }
    }
}

// Function to create the six colored squares that will be the "buttons"
function drawButtons() {
    let buttonColors = ["cyan", "lime", "red", "yellow", "black", "violet"];
    for (let i = 0; i < buttonColors.length; i++) {
        startX = (i * 60) + 50 + ((gridWidth - 9) * 25);

        // Rectangle
        ctx.beginPath();
        ctx.rect(
            startX,
            gameGrid.length * 50 + 20,
            50,
            50);
        ctx.fillStyle = buttonColors[i];
        // Rectangle outline
        ctx.lineWidth = 2;
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
function createPlayerGrid() {
    playerGrid = [];

    for (let i = 0; i < gameGrid.length; i++) {
        let row = [];
        for (let j = 0; j < gameGrid[0].length; j++) {
            row.push(0);
        }
        playerGrid.push(row);
    }
    
    playerGrid[parseInt(gridHeight / 2)][parseInt(gridWidth / 2)] = 1;
}

// Creating "invisible" buttons that will serve to change the player blocks
function createButtons() {
    for (let i = 0; i < colors; i++) {
        let button = document.createElement("button");
        button.id = "button" + i
        button.type = "submit";
        button.className = "gridButtons button" + i;
        button.style.position = "absolute";
        button.style.height = 50 + "px";
        button.style.width = 50 + "px";
        button.style.left = ((gridWidth - 9) * 25) + 58 + (60 * i) + "px";
        button.style.top = (gameGrid.length * 50) + 23 + "px";
        button.style.opacity = 0 + "%";
        button.onclick = function(e) {
            playerMoves++;
            gameMove(i);
            buttonSwitch(i);
        }
        document.body.appendChild(button);
    }
}

// Creating restart button that will reset the grid to fresh state
function createRestartButton() {
    let button = document.createElement("button");
    button.id = "buttonRestart";
    button.type = "submit";
    button.innerHTML = "Restart";
    button.style.position = "absolute";
    button.style.height = 50 + "px";
    button.style.width = 352 + "px";
    button.style.left = ((gridWidth - 8) * 25) + 32 + "px";
    button.style.top = (gameGrid.length * 50) + 88 + "px";
    button.style.opacity = 100 + "%";
    button.onclick = function(e) {
        playerMoves = 0;
        createPlayerGrid();
        createGrid();
    }
    document.body.appendChild(button);
} 

// Function that is used to disable/enable buttons
function buttonSwitch(choice) {
    // Turns on all buttons first
    for (let i = 0; i < colors; i++) {
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
    createGrid();
    createPlayerGrid();
    createButtons();
    drawButtons();
    createRestartButton();
    let startingColor = gameGrid[4][4];
    let indexOfStartingColor = colorOptions.indexOf(startingColor);
    document.getElementById("button" + indexOfStartingColor).disabled = true;
}

main();