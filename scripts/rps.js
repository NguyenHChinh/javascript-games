for (let i = 0; i < 3; i++) {
    let button = document.createElement("button");
    button.id = "button" + i;
    button.type = "submit";
    switch (i) {
        case 0:
            button.innerHTML = "🪨";
            break;
        case 1:
            button.innerHTML = "📝";
            break;
        case 2:
            button.innerHTML = "✂️";
            break;
    }   
    button.style.fontSize = "42px";
    button.style.height = "100px";
    button.style.width = "100px"
    button.onclick = function(e) {
        game(i);
    }
    document.body.appendChild(button);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function game(i) {
    switch (computerChoice) {
        // ROCK
        case 0:
            if (i == 0) {
                alert("TIE");
            }
            else if (i == 1) {
                alert("WIN");
            }
            else {
                alert("LOSE");
            }
            break;
        // PAPER
        case 1:
            if (i == 0) {
                alert("LOSE");
            }
            else if (i == 1) {
                alert("TIE");
            }
            else {
                alert("WIN");
            }
            break;
        // SCISSORS
        case 2:
            if (i == 0) {
                alert("WIN");
            }
            else if (i == 1) {
                alert("LOSE");
            }
            else {
                alert("TIE");
            }
            break;
    }

    computerChoice = getRandomInt(3);
}

var computerChoice = getRandomInt(3);