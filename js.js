// GAME LOGIC

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

const arrows = {32: 'spacebar', 38: 'up', 87: 'up', 40: 'down', 83: 'down', 37: 'left', 65: 'left', 39: 'right', 68: 'right'};

function findFighter(event) {
    if (!arrows[event.keyCode]) {
        return;
    }
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
                current.classList.remove('active');
                newFighterId = fighters[rowLen - 1][jth];
                newFighter = document.querySelector('#' + newFighterId)
                newFighter.classList.add('active');
                changeSelectedTitle(newFighter.id);
                break;
            } else {
                current.classList.remove('active');
                newFighterId = fighters[ith - 1][jth];
                newFighter = document.querySelector('#' + newFighterId)
                newFighter.classList.add('active');
                changeSelectedTitle(newFighter.id);
                break;
            }
        case 'left':
            if (jth === 0) {
                current.classList.remove('active');
                newFighterId = fighters[ith][columnLen - 1];
                newFighter = document.querySelector('#' + newFighterId)
                newFighter.classList.add('active');
                changeSelectedTitle(newFighter.id);
                break;
            } else {
                current.classList.remove('active');
                newFighterId = fighters[ith][jth - 1];
                newFighter = document.querySelector('#' + newFighterId)
                newFighter.classList.add('active');
                changeSelectedTitle(newFighter.id);
                break;
            }
        case 'right':
            if (jth === columnLen - 1) {
                current.classList.remove('active');
                newFighterId = fighters[ith][0];
                newFighter = document.querySelector('#' + newFighterId)
                newFighter.classList.add('active');
                changeSelectedTitle(newFighter.id);
                break;
            } else {
                current.classList.remove('active');
                newFighterId = fighters[ith][jth + 1];
                newFighter = document.querySelector('#' + newFighterId)
                newFighter.classList.add('active');
                changeSelectedTitle(newFighter.id);
                break;
            }
        case 'down':
            if (ith === rowLen - 1) {
                current.classList.remove('active');
                newFighterId = fighters[0][jth];
                newFighter = document.querySelector('#' + newFighterId)
                newFighter.classList.add('active');
                changeSelectedTitle(newFighter.id);
                break;
            } else {
                current.classList.remove('active');
                newFighterId = fighters[ith + 1][jth];
                newFighter = document.querySelector('#' + newFighterId)
                newFighter.classList.add('active');
                changeSelectedTitle(newFighter.id);
                break;
            }
        // start the fight result animation
        case 'spacebar':
            startFight();
            cycleImages();
    };
};

function startFight() {
    document.querySelector('.fightArea').classList.toggle('invisible');
};

// function cycleImages() {
//     let compCard = document.querySelector('.computerFighter');
//     let count = 20;
//     while (count > 0) {
//         setInterval
//     }
//     compCard.innerHTML = `<i class="far fa-hand-rock p0"></i>`;
//     compCard.innerHTML = `<i class="far fa-hand-rock r0"></i>`;
//     compCard.innerHTML = `<i class="far fa-hand-rock s0"></i>`;
// };

function changeSelectedTitle(id) {
    let title = document.querySelector('.selectedNameLeft');
    let color = document.querySelector('#selectedFighter');
    switch (id) {
        case 'r0':
            title.innerText = "Rock One";
            color.style.color = 'white';
            break;
        case 'r1':
            title.innerText = "Rock Two";
            color.style.color = 'blue';    
            break;
        case 'r2':
            title.innerText = "Rock Three";
            color.style.color = 'green';    
            break;
        case 'r3':
            title.innerText = "Rock Four";
            color.style.color = 'red';    
            break;
        case 'r4':
            title.innerText = "Rock Five";
            color.style.color = 'purple';    
            break;
        case 'p0':
            title.innerText = "Paper One";
            color.style.color = 'white';
            break;
        case 'p1':
            title.innerText = "Paper Two";
            color.style.color = 'blue';
            break;
        case 'p2':
            title.innerText = "Paper Three";
            color.style.color = 'green';
            break;
        case 'p3':
            title.innerText = "Paper Four";
            color.style.color = 'red';
            break;
        case 'p4':
            title.innerText = "Paper Five";
            color.style.color = 'purple';
            break;
        case 's0':
            title.innerText = "Scissor One";
            color.style.color = 'white';
            break;
        case 's1':
            title.innerText = "Scissor Two";
            color.style.color = 'blue';
            break;
        case 's2':
            title.innerText = "Scissor Three";
            color.style.color = 'green';
            break;
        case 's3':
            title.innerText = "Scissor Four";
            color.style.color = 'red';
            break;
        case 's4':
            title.innerText = "Scissor Five";
            color.style.color = 'purple';
            break;
    };
};

window.addEventListener('keydown', findFighter);

// FIGHT AREA ANIMATION