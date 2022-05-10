var ctx = document.getElementById("canvas").getContext("2d");
var direction = '';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function game() {
    if (direction != '') {
        move();
        drawGrid();
    }
    await sleep(250);
    game();
}

async function move() {
    fives[currentPos[0]][currentPos[1]] = 0;

    switch (direction) {
        case 'W':
            if (currentPos[0] != 0) {
                currentPos[0]--;
            }
            break;
        case 'A':
            if (currentPos[1] != 0) {
                currentPos[1]--;
            }
            break;
        case 'S':
            if (currentPos[0] != (gridSize-1)) {
                currentPos[0]++;
            }
            break;
        case 'D':
            if (currentPos[1] != (gridSize - 1)) {
                currentPos[1]++;
            }
    }

    fives[currentPos[0]][currentPos[1]] = 1;
}

document.addEventListener('keydown', function(event) {
    fives[currentPos[0]][currentPos[1]] = 0;

    switch (event.keyCode) {
        // 'W' Key
        case 87:
            direction = 'W';
            break;
        // 'A' Key
        case 65:
            direction = 'A';
            break;
        // 'D' Key
        case 68:
            direction = 'D';
            break;
        // 'S' Key
        case 83:
            direction = 'S';
            break;
    }
});

var gridSize = 9;
/*
row = [];
for (let i = 0; i < gridSize; i++) {
    row.push(0);
}
console.log(row);
*/

var fives = [];
for (let i = 0; i < gridSize; i++) {
    let row = [];
    for (let j = 0; j < gridSize; j++) {
        row.push(0);
    }
    fives.push(row);
}

/* fives when gridSize = 5, where gridSize is an array of arrays
[[0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0],
 [0, 0, 1, 0, 0],
 [0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0]]
*/

currentPos = [Math.floor(fives.length/2), Math.floor(fives.length/2)];
fives[currentPos[0]][currentPos[1]] = 1;

/*
for (let i = 0; i < fives.length * 5; i++) {
    startX = (i % 5) * 50;
    startY = Math.floor(i / 5) * 50;

    ctx.beginPath();
    ctx.rect(
        startX,
        startY,
        40,
        40);
    if (0 == 1) {
        ctx.fillStyle = "RED";
    }
    else {
        ctx.fillStyle = "BLACK";
    }
    ctx.fill();
}
*/

function drawGrid() {
    for (let i = 0; i < fives.length; i++) {
        for (let j = 0; j < fives.length; j++) {
            startX = j * 50;
            startY = i * 50;
        
            ctx.beginPath();
            ctx.rect(
                startX,
                startY,
                40,
                40);
            if (fives[i][j] == 1) {
                ctx.fillStyle = "RED";
            }
            else {
                ctx.fillStyle = "BLACK";
            }
            ctx.fill();
        }
    }
}

drawGrid();
game();