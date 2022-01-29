let playerSelection;
let computerSelection = computerPlay();

// do {
//     playerSelection = humanPlay();
// } while (!playerSelection);

// console.log("Computer chose: " + computerSelection);
// console.log(playRound(playerSelection, computerSelection));

function playRound(playerSelect, computerSelect) {
    switch (playerSelect) {
        case 'scissors':
            if (computerSelect === 'scissors') {
                return "You Tie! You both played scissors";
                break;
            } else if (computerSelect === 'rock') {
                return "You Lose! Rock beats scissors";
                break;
            } else {
                return "You Win! Scissors beats paper :)";
                break;
            }
        case 'rock':
            if (computerSelect === 'rock') {
                return "You Tie! You both played rock";
                break;
            } else if (computerSelect === 'scissors') {
                return "You Win! Rock beats scissors :)";
                break;
            } else {
                return "You Lose! Paper beats rock";
                break;
            }
        case 'paper':
            if (computerSelect === 'paper') {
                return "You Tie! You both played paper";
                break;
            } else if (computerSelect === 'scissors') {
                return "You Lose! scissors beats paper";
                break;
            } else {
                return "You win! Paper beats rock :)";
                break;
            }
    };
};

function humanPlay() {
    let play = window.prompt("What is your play?").toLowerCase();
    if (play === 'scissors' || play === 'rock' || play === 'paper') {
        return play;
    } else {
        console.log("enter a valid choice");
        return false;
    }
};

function computerPlay() {
    let play = Math.floor(Math.random() * 3);
    switch (play) {
        case 0: 
            return "scissors";
            break;
        case 1: 
            return "rock";
            break;
        case 2:
            return "paper";
            break;
        default:
            return "error";
    };
};

// GRID SELECTION
const fighters = [
    ['r0', 'p0', 's0'],
    ['r1', 'p1', 's1'],
    ['r2', 'p2', 's2'],
    ['r3', 'p3', 's3'],
    ['r4', 'p4', 's4']
]

const rowLen = fighters.length;
const columnLen = fighters[0].length;

const arrows = {38: 'up', 87: 'up', 40: 'down', 83: 'down', 37: 'left', 65: 'left', 39: 'right', 68: 'right'};

function findFighter(event) {
    
    // find grid position
    let currentFighter = document.querySelector('.active');
    let ith, jth;
    for (let i = 0; i < rowLen; i++) {
        jth = fighters[i].indexOf(currentFighter.id);
        if (jth !== -1) {
            ith = i;
            break;
        }
    }
    
    console.log(`current: fighters[${ith}][${jth}]`);
    let direction = arrows[event.keyCode]; 
    changeFighter(currentFighter, direction, ith, jth);

};

function changeFighter(current, direction, ith, jth) {
    let newFighter;
    console.log('direction: ' + direction);
    switch (direction) {
        case 'up': 
            if (ith === 0) {
                break;
            } else {
                current.classList.remove('active');
                newFighterId = fighters[ith - 1][jth];
                console.log('new ID: ' + newFighterId);
                newFighter = document.querySelector('#' + newFighterId)
                console.log('newFighter: '+ newFighter.id);
                newFighter.classList.add('active');
                break;
            }
        case 'left':
            if (jth === 0) {
                break;
            } else {
                current.classList.remove('active');
                newFighterId = fighters[ith][jth - 1];
                console.log('new ID: ' + newFighterId);
                newFighter = document.querySelector('#' + newFighterId)
                console.log('newFighter: '+ newFighter.id);
                newFighter.classList.add('active');
                break;
            }
        case 'right':
            if (jth === columnLen - 1) {
                break;
            } else {
                current.classList.remove('active');
                newFighterId = fighters[ith][jth + 1];
                newFighter = document.querySelector('#' + newFighterId)
                console.log('newFighter: '+ newFighter.id);
                newFighter.classList.add('active');
                console.log(`next: fighters[${ith}][${jth + 1}]`)
                break;
            }
        case 'down':
            if (ith === rowLen - 1) {
                break;
            } else {
                current.classList.remove('active');
                newFighterId = fighters[ith + 1][jth];
                console.log('new ID: ' + newFighterId);
                newFighter = document.querySelector('#' + newFighterId)
                console.log('newFighter: '+ newFighter.id);
                newFighter.classList.add('active');
                break;
            }
    };
};

window.addEventListener('keydown', findFighter);