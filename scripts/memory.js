var ctx = document.getElementById("canvas").getContext("2d");
var deathScreen = document.getElementById("emoji");
var finalScore = document.getElementById("score");
var buttonDiv = document.getElementById("buttonDiv");
var progressObject = document.getElementById("progress");
var active_game = 0;
gridSize = 3;
squareSize = 150;

var grid = [];
for (let i = 0; i < gridSize; i++) {
    let row = [];
    for (let j = 0; j < gridSize; j++) {
        row.push(0);
    }
    grid.push(row);
}

function drawGrid(x, y) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            startX = j * squareSize;
            startY = i * squareSize;
        
            ctx.beginPath();
            ctx.rect(
                startX,
                startY,
                squareSize - 10,
                squareSize - 10);
            if ((i == x) && (j == y)) {
                ctx.fillStyle = "RED";
            }
            else {
                ctx.fillStyle = "SILVER";
            }
            ctx.fill();
        }
    }
}

drawGrid();

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let button = document.createElement("button");
        button.id = "button" + j + i;
        button.type = "submit";
        button.className = "gridButtons button" + j + i;
        button.style.position = "absolute";
        button.style.height = squareSize - 10 + "px";
        button.style.width = squareSize - 10 + "px";
        button.style.left = (squareSize * i) + 8 + "px";
        button.style.top = (squareSize * j) + 8 + "px";
        button.style.opacity = "100%";
        //button.style.backgroundColor = "RED";
        button.onclick = function(e) {
            gameMove(j, i);
        }
        document.body.appendChild(button);
    }
}

let startButton = document.createElement("button");
startButton.id = "startButton";
startButton.type = "submit";
startButton.style.position = "absolute";
startButton.style.height = (squareSize - 10) / 2 + "px";
startButton.style.width = squareSize * 3 - 10 + "px";
startButton.style.left = "8px";
startButton.style.top = "460px";
startButton.innerHTML = "Start";
startButton.onclick = function(e) {
    active_game = 0;
    currentSequence = 0;
    correctSequence.push([getRandomInt(gridSize), getRandomInt(gridSize)]);
    deathScreen.textContent = "";
    finalScore.textContent = "";
    this.disabled = true;
    showOrder();
    
}
document.body.appendChild(startButton);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let correctSequence = [];
function addToSequence() {
    x = getRandomInt(gridSize);
    y = getRandomInt(gridSize);
    
    final_x = correctSequence[correctSequence.length-1][0];
    final_y = correctSequence[correctSequence.length-1][1];

    while (x == final_x && y == final_y) {
        x = getRandomInt(gridSize);
        y = getRandomInt(gridSize);
    }

    let correctAnswer = [x, y];
    correctSequence.push(correctAnswer);
}

function buttonSwitch(on) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let buttonName = "button" + j + i;
            let buttonTarget = document.getElementById(buttonName);

            if (on) {
                buttonTarget.disabled = false;
            }
            else {
                buttonTarget.disabled = true;
            }
        }
    }
}

async function showOrder() {
    buttonSwitch(0);

    active_game = 0;
    counter = 0;
    do {
        let button = document.getElementById("button" + correctSequence[counter][0] + correctSequence[counter][1]);
        button.style.backgroundColor = "RED";
        drawGrid(correctSequence[counter][0], correctSequence[counter][1])
        await sleep(1000);
        button.style.backgroundColor = "";
        counter++;
    } while (counter <= currentSequence);

    drawGrid(-1, -1);
    active_game = 1;
    currentSequence = 0;

    buttonSwitch(1);

    updateProgress(0);
}

function updateProgress(current) {
    progressObject.textContent = "Progress: " + current + "/" + correctSequence.length;
}

function gameMove(x, y) {
    if (!active_game) {
        return;
    }

    if ((x == correctSequence[currentSequence][0]) && (y == correctSequence[currentSequence][1])) {
        currentSequence++;
        updateProgress(currentSequence);
    }
    else {
        active_game = 0;
        deathScreen.textContent += "???";
        finalScore.textContent += "Final Score: ";
        finalScore.textContent += correctSequence.length - 1;
        document.getElementById("startButton").disabled = false;
        correctSequence = [];
        buttonSwitch(0);
        return;
    }

    if (currentSequence == correctSequence.length) {
        addToSequence();
        active_game = 0;
        showOrder();
    }
}

function main() {
    deathScreen.parentNode.appendChild(deathScreen);

    visualDiv = document.getElementById("visualDiv");
    visualDiv.parentNode.appendChild(visualDiv);

    progressObject.textContent = "Progress: N/A";

    buttonSwitch(0);
}

main();