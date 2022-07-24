// tic tac toe grid
const boxes = document.querySelectorAll(".box");
// current move
let counter = 0;
// the sequence
let sequence = ['', '', '', '', '', '', '', ''];

// for each element of the grid when clicked display x or o
boxes.forEach((box, index) => {
    box.addEventListener('click', function() {
        insertXorO(counter, index);
        ++counter; 
        // remove the event after it happened
        this.removeEventListener('click', arguments.callee); 
    });
})

// if current move is even(x) or odd(0)
function insertXorO(counter, index) {
    if (counter % 2 === 0) {
        sequence.splice(index, 1, "X");
        if (boxes[index].innerHTML !== "X" && boxes[index].innerHTML !== "O") {
            boxes[index].innerHTML = "X";   
        }
    } else {
        sequence.splice(index, 1, "O");
        if (boxes[index].innerHTML !== "X" && boxes[index].innerHTML !== "O") {
            boxes[index].innerHTML = "O";
        }
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
    } else if (counter === 8) {
        document.getElementById('game-status').innerText = "Draw!";
        startOver();
    }
}

function checkHorizontalLines(player) {
    if ( (sequence[0] === player && sequence[1] === player && sequence[2] === player) || 
         (sequence[3] === player && sequence[4] === player && sequence[5] === player) || 
         ((sequence[6] === player && sequence[7] === player && sequence[8] === player)) ) {
            return true;
    }
}

function checkVerticalLines(player) {
    if ( (sequence[0] === player && sequence[3] === player && sequence[6] === player) || 
         (sequence[1] === player && sequence[4] === player && sequence[7] === player) || 
         ((sequence[2] === player && sequence[5] === player && sequence[8] === player)) ) {
            return true;
    }
}

function checkObliqueLines(player) {
    if ( (sequence[0] === player && sequence[4] === player && sequence[8] === player) || 
         (sequence[2] === player && sequence[4] === player && sequence[6] === player) ) {
            return true;
    }
}

function displayStatus(player) {
    let gameStatus = document.getElementById('game-status');
    gameStatus.innerText = player + " won!";
}

function startOver() {
    document.getElementsByTagName("button")[0].classList.remove("d-none");
    document.getElementsByClassName("tic-tac-toe-box-cover")[0].classList.remove("d-none");
}