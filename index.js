// tic tac toe grid
const boxes = document.querySelectorAll(".box");
// current move
let currentMoveCounter = 0;
// the sequence
let sequence = ['', '', '', '', '', '', '', ''];

// for each element of the grid when clicked display x or o
boxes.forEach((box, index) => {
    box.addEventListener('click', function() {
        insertXorO(currentMoveCounter, index);
        ++currentMoveCounter; 
        // remove the event after it happened
        this.removeEventListener('click', arguments.callee); 
    });
})

// if current move is even(x) or odd(0)
function insertXorO(currentMoveCounter, index) {
    if (currentMoveCounter % 2 === 0) {
        addPlayerMove("X", index)
    } else {
        addPlayerMove("O", index)
    }
    checkSequence();
}

function checkSequence() {
    if (checkHorizontalLines("X") === true || checkVerticalLines("X") === true || checkObliqueLines("X")  === true) {
        displayStatus("X");
        startOver();
    } else if (checkHorizontalLines("O") === true || checkVerticalLines("O") === true || checkObliqueLines("O")  === true) {
        displayStatus("O");
        startOver();
    } else if (currentMoveCounter === 8) {
        document.getElementById('game-status').innerText = "Draw!";
        startOver();
    }
}

function addPlayerMove(player, index) {
    sequence.splice(index, 1, player);
    if (boxes[index].innerHTML !== "X" && boxes[index].innerHTML !== "O") {
        boxes[index].innerHTML = player;
    }
}

function checkHorizontalLines(player) {
    if ( (sequence[0] === player && sequence[1] === player && sequence[2] === player) || 
         (sequence[3] === player && sequence[4] === player && sequence[5] === player) || 
         ((sequence[6] === player && sequence[7] === player && sequence[8] === player)) ) {
            return true;
    }
    return false;
}

function checkVerticalLines(player) {
    if ( (sequence[0] === player && sequence[3] === player && sequence[6] === player) || 
         (sequence[1] === player && sequence[4] === player && sequence[7] === player) || 
         ((sequence[2] === player && sequence[5] === player && sequence[8] === player)) ) {
            return true;
    }
    return false;
}

function checkObliqueLines(player) {
    if ( (sequence[0] === player && sequence[4] === player && sequence[8] === player) || 
         (sequence[2] === player && sequence[4] === player && sequence[6] === player) ) {
           return true;
    }
    return false;
}

function displayStatus(player) {
    let gameStatus = document.getElementById('game-status');
    gameStatus.innerText = player + " won!";
}

function startOver() {
    document.getElementsByTagName("button")[0].classList.remove("d-none");
    document.getElementsByClassName("tic-tac-toe-box-cover")[0].classList.remove("d-none");
}