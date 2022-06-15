var ctx = document.getElementById("canvas").getContext("2d");
var gameGrid = [];
var colorOptions = ["cyan", "lime", "red", "yellow", "black", "violet"];

// Random integer generator
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Grid will be a 7 blocks tall, and 8 blocks wide
for (let i = 0; i < 7; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
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
            console.log("Now at.. (" + i + ", " + j + ")" + " with a color of " + gameGrid[i][j]);
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

console.log(gameGrid);
drawGrid(gameGrid);
fixGrid();