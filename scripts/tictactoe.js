var ctx = document.getElementById("canvas").getContext("2d");

// Drawing 3x3 Grid
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.rect((i * 50) + 5, (j * 50) + 5, 50, 50);
        ctx.lineWidth = 5;
        ctx.stroke();
    }
}

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let button = document.createElement("button");
        button.id = "button" + j + i;
        button.type = "submit";
        button.className = "gridButtons button" + j + i;
        button.style.position = "absolute";
        button.style.height = 50 + "px";
        button.style.width = 50 + "px";
        button.style.left = 12 + (50 * i) + "px";
        button.style.top = 12 + (50 * j) + "px";
        document.body.appendChild(button);
    }
}