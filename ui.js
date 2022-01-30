

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

// update the grid UI when it is navigated
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
            animateFightText(current.id, computerPlay());
    };
};

function startFight() {
    document.querySelector('.fightArea').classList.toggle('invisible');
    // let compCard = document.querySelector('.computerFighter');
};

function animateFightText(playerFighter, computerFighter) {
    let versusText = document.querySelector('.versusText');
    let container = document.querySelector('.vsTextContainer');
    const SPEED = 1000;

    // animate the text for player's fighter
    switch (playerFighter) {
        case 'r0':
            versusText.innerText = "Rock One";
            break;
        case 'r1':
            versusText.innerText = "Rock Two";  
            break;
        case 'r2':
            versusText.innerText = "Rock Three";   
            break;
        case 'r3':
            versusText.innerText = "Rock Four";
            break;
        case 'r4':
            versusText.innerText = "Rock Five";
            break;
        case 'p0':
            versusText.innerText = "Paper One";
            break;
        case 'p1':
            versusText.innerText = "Paper Two";
            break;
        case 'p2':
            versusText.innerText = "Paper Three";
            break;
        case 'p3':
            versusText.innerText = "Paper Four";
            break;
        case 'p4':
            versusText.innerText = "Paper Five";
            break;
        case 's0':
            versusText.innerText = "Scissor One";
            break;
        case 's1':
            versusText.innerText = "Scissor Two";
            break;
        case 's2':
            versusText.innerText = "Scissor Three";
            break;
        case 's3':
            versusText.innerText = "Scissor Four";
            break; 
        case 's4':
            versusText.innerText = "Scissor Five";
            break;
    };

    versusText.classList.toggle('animateMe');

    // remove playerfighter txt & replace with "VS"
    setTimeout(() => {
        document.querySelector('.versusText').remove();
        versusText = document.createElement("div")
        versusText.classList.add('versusText', 'animateMe');
        versusText.innerText = 'VS';
        container.append(versusText);
    }, SPEED);

    // remove "VS" and replace with computerFighter
    setTimeout(() => {
        versusText.remove();
        versusText = document.createElement("div")
        versusText.classList.add('versusText', 'animateMe');
        versusText.innerText = computerFighter + '...';
        container.append(versusText);
    }, SPEED * 2);

    // remove computerFighter and replace with FIGHT!
    setTimeout(() => {
        versusText.remove();
        versusText = document.createElement("div")
        versusText.classList.add('versusText', 'animateMe');
        versusText.innerText = 'FIGHT!';
        container.append(versusText);
    }, SPEED * 3);

    // remove text
    setTimeout(() => {
        versusText.remove();
    }, SPEED * 4);

    // find winner, update healthbar, display result text
    let result = playRound(playerFighter, computerFighter);
    let playerHealth = document.getElementById('#playerHealthbar');
    let computerHealth = document.getElementById('#computerHealthbar');
    alert(computerHealth.id);
    versusText = document.createElement("div");
    versusText.classList.add('versusText');
    switch (result) {
        case 0:
            // update healthbar
            playerHealth.style.backgroundColor = 'red';
            // update text
            setTimeout(() => {
                versusText.innerText = 'YOU LOSE';
                container.append(versusText);
                updateScore('lose');
            }, SPEED * 6);
            break;
        case 1:
            // update healthbar
            playerHealth.style.backgroundColor = 'red';
            computerHealth.style.backgroundColor = 'red';
            // update text
            setTimeout(() => {
                versusText.innerText = 'TIE';
                container.append(versusText);
                updateScore('tie');
            }, SPEED * 6);
            break;
        case 2:
            // update healthbar
            computerHealth.style.backgroundColor = 'red';
            // update text
            setTimeout(() => {
                versusText.innerText = 'YOU WIN';
                container.append(versusText);
                updateScore('tie');
            }, SPEED * 6);
            break;
    }

};

function resetAnimations(timeout) {
    setTimeout (() => {
        document.querySelector('.versusText').style.webkitAnimation = 'none';
    }, timeout);
}

function changeSelectedTitle(id) {
    let title = document.querySelector('.selectedNameLeft');
    let color = document.querySelector('.selectedFighter');
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




// GAME LOGIC

let computerSelection = computerPlay();

function playRound(playerSelect, computerSelect) {
    // 0 is lose; 1 is tie; 2 is win;
    
    // r0 will be 'r', p0 will be 'p' etc.
    switch (playerSelect[0]) {
        case 's':
            if (computerSelect === 'scissors') {
                return 1;
                break;
            } else if (computerSelect === 'rock') {
                return 0;
                break;
            } else {
                return 2;
                break;
            }
        case 'r':
            if (computerSelect === 'rock') {
                return 1;
                break;
            } else if (computerSelect === 'scissors') {
                return 2;
                break;
            } else {
                return 0;
                break;
            }
        case 'p':
            if (computerSelect === 'paper') {
                return 1;
                break;
            } else if (computerSelect === 'scissors') {
                return 0;
                break;
            } else {
                return 1;
                break;
            }
    };
};

// function humanPlay() {
//     let play = window.prompt("What is your play?").toLowerCase();
//     if (play === 'scissors' || play === 'rock' || play === 'paper') {
//         return play;
//     } else {
//         console.log("enter a valid choice");
//         return false;
//     }
// };

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