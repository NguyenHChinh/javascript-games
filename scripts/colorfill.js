var ctx = document.getElementById("canvas").getContext("2d");
var gameGrid = [];
var colorOptions = ["cyan", "lime", "red", "yellow", "black", "violet"];

// Random integer generator
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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