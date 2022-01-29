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

const arrows = {up: 38, down: 40, left: 37, right: 39, w: 87, s: 83, a: 65, d: 68};
window.addEventListener('keydown', findFighter);

function findFighter() {
    current = document.querySelector('.active').id;
    for (let i = 0; i < rowLen; i++) {
        let index = fighters[i].indexOf(current);
        if (index !== -1) {
            console.log(`fighters[${i}][${index}]`);
            return `fighters[${i}][${index}]`; 
        }
    }
};

function selectFighter(e) {
    switch (`${e.keyCode}`) {
        case 38:
            break;
        case 40:
            break;
        case 37:
            break;
        case 39:
            break;
    };
};