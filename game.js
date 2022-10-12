var matrix;
var gridSize = 20;

function draw() {
    const gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = "";
    for(let i = 1; i < matrix.length - 1; i++) {
        for(let j = 0; j < matrix[i].length - 1; j++) {
            var div = document.createElement("div");
            div.className = "cell";
            div.id = i + "," + j;
            div.style.width = gridSize + "px";
            div.style.height = gridSize + "px";
            div.addEventListener('click', cellClick);
            if(matrix[i][j] == 'a') {
                div.style.backgroundColor = "blue";
            } else {
                div.style.backgroundColor = "grey";
            }
            gameArea.appendChild(div);
        }
        var line = document.createElement("br");
        gameArea.appendChild(line);
    }
}

function cellClick() {
    var str = this.id
    if(matrix[str.substr(0, str.indexOf(','))][str.substr(str.indexOf(',') + 1, str.length)] == 'd') {
        matrix[str.substr(0, str.indexOf(','))][str.substr(str.indexOf(',') + 1, str.length)] = 'a';
    } else {
        matrix[str.substr(0, str.indexOf(','))][str.substr(str.indexOf(',') + 1, str.length)] = 'd';
    }
    draw();
}

function reset() {
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = 'd';
        }
    }
    draw();
}

function countNeighbours(mat, i, j) {
    var count = 0;

    
    if(mat[i-1][j-1] == 'a') {console.log("1");count++};
    if(mat[i-1][j] == 'a') {console.log("2");count++};
    if(mat[i-1][j+1] == 'a') {console.log("3");count++};
    if(mat[i][j-1] == 'a') {console.log("4");count++};
    if(mat[i][j+1] == 'a') {console.log("5");count++};
    if(mat[i+1][j-1] == 'a') {console.log("6");count++};
    if(mat[i+1][j] == 'a') {console.log("7");count++};
    if(mat[i+1][j+1] == 'a') {console.log("8");count++};

    if(count != 0) {
        console.log(i + ',' + j + ',' + count);
    }
    return count;
}

function advance() {

    var tmpMatrix = matrix.map(function(arr) {
        return arr.slice();
    });
    //var tmpMatrix = matrix;
    for(let i = 1; i < matrix.length - 1; i++) {
        for(let j = 1; j < matrix[i].length - 1; j++) {
            count = countNeighbours(tmpMatrix, i, j)
            if(count < 2 || count > 3) {
                matrix[i][j] = 'd';
            } else if(count == 3) {
                matrix[i][j] = 'a';
            }
        }
    }
    draw();
    setTimeout(advance, 200);
}

//Main code
window.onload = function() {
    
    var gameHeight = 45;
    var gameWidth = 85;

    //Initializing matrix
    matrix = [];
    for(let i = 0; i < gameHeight; i++) {
        matrix[i] = [];
        for(let j = 0; j < gameWidth; j++) {
            matrix[i][j] = 'd';
        }
    }

    draw();

    var advanceButton = document.getElementById("advance");
    advanceButton.addEventListener("click", advance);

    var resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", reset);

}