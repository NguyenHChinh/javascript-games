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