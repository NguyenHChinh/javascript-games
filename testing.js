var ctx = document.getElementById("canvas").getContext("2d");

document.addEventListener('keydown', function(event) {
    fives[currentPos[0]][currentPos[1]] = 0;

    switch (event.keyCode) {
        // 'W' Key
        case 87:
            if (currentPos[0] != 0) {
                currentPos[0]--;
            }
            break;
        // 'A' Key
        case 65:
            if (currentPos[1] != 0) {
                currentPos[1]--;
            }
            break;
        // 'D' Key
        case 68:
            if (currentPos[1] != (gridSize - 1)) {
                currentPos[1]++;
            }
            break;
        // 'S' Key
        case 83:
            if (currentPos[0] != (gridSize-1)) {
                currentPos[0]++;
            }
            break;
    }

    fives[currentPos[0]][currentPos[1]] = 1;
    drawGrid();
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