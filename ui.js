var playerScore = 0;
var computerScore = 0;

window.addEventListener('keydown', findFighter);

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
            window.removeEventListener('keydown', findFighter);
            displayFightArea();
            startFight(current.id, computerPlay());
    };
};

function displayFightArea() {
    document.querySelector('.fightArea').classList.toggle('invisible');
};

function startFight(playerFighter, computerFighter) {
    let versusText = document.querySelector('.versusText');
    let container = document.querySelector('.vsTextContainer');
    const SPEED = 1000;

    versusText.classList.add('animateMe');

    // remove playerfighter txt & replace with "VS"
    setTimeout(() => {
        document.querySelector('.versusText').remove();
        versusText = document.createElement("div")
        versusText.classList.add('versusText', 'animateMe');
        versusText.innerText = 'VS';
        container.append(versusText);
    }, SPEED);

    // remove "VS" and replace with computerFighter AND update image
    setTimeout(() => {
        versusText.remove();
        versusText = document.createElement("div")
        versusText.classList.add('versusText', 'animateMe');
        versusText.innerText = computerFighter + '...';
        container.append(versusText);
    }, SPEED * 2);

    setTimeout(() => {
        displayComputerFighter(computerFighter);
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
    let playerHealth = document.querySelector('.playerHealthbar');
    let computerHealth = document.querySelector('.computerHealthbar');
    versusText = document.createElement("div");
    versusText.classList.add('versusText');
    switch (result) {
        case 0:
            // update healthbar
            setTimeout(() => {
                playerHealth.style.backgroundColor = 'red';
            }, SPEED * 5);
            // update text
            setTimeout(() => {
                versusText.innerText = 'YOU LOSE';
                container.append(versusText);
                updateScore('lose');
                versusText.classList.toggle('animateMe');
            }, SPEED * 6);
            break;
        case 1:
            // update healthbar
            setTimeout(() => {
            playerHealth.style.backgroundColor = 'red';
            computerHealth.style.backgroundColor = 'red';
            }, SPEED * 5);
            // update text
            setTimeout(() => {
                versusText.innerText = 'TIE';
                container.append(versusText);
                updateScore('tie');
                versusText.classList.toggle('animateMe');
            }, SPEED * 6);
            break;
        case 2:
            // update healthbar
            setTimeout(() => {
            computerHealth.style.backgroundColor = 'red';
            }, SPEED * 5);
            // update text
            setTimeout(() => {
                versusText.innerText = 'YOU WIN';
                container.append(versusText);
                updateScore('win');
                versusText.classList.toggle('animateMe');
            }, SPEED * 6);
            break;
    }

    // reset multiple items to original state
    setTimeout(() => {
        displayFightArea();
        window.addEventListener('keydown', findFighter);
        let card = document.querySelector('.small');
        card.classList.remove('far', 'p0', 'fa-hand-paper', 'fa-hand-rock', 'fa-hand-scissors');
        card.classList.add('fas', 'fa-question', 'computerFighter');
        playerHealth.style.backgroundColor = 'green';
        computerHealth.style.backgroundColor = 'green';
        versusText.classList.remove('animateMe');
    }, SPEED * 9);
};

function displayComputerFighter(fighter) {
    let image = document.querySelector('.small');
    image.classList.remove('fas', 'fa-question', 'computerFighter');
    switch (fighter) {
        case 'paper':
            image.classList.add('p0', 'far', 'fa-hand-paper');
            break;
        case 'rock':
            image.classList.add('p0', 'far', 'fa-hand-rock');
            break;
        case 'scissors':
            image.classList.add('p0', 'far', 'fa-hand-scissors');
            break;
    };
}

function updateScore(result) {
    let pScore = document.querySelector('.playerScore');
    let cScore = document.querySelector('.computerScore');
    switch (result) {
        case 'tie':
            break;
        case 'win':
            playerScore++;
            pScore.innerText = playerScore; 
            break;
        case 'lose':
            computerScore++;
            cScore.innerText = computerScore;
            break;
    }
}

function resetAnimations(timeout) {
    setTimeout (() => {
        document.querySelector('.versusText').style.webkitAnimation = 'none';
    }, timeout);
}

function changeSelectedTitle(id) {
    // Update main page images and text
    let title = document.querySelector('.selectedNameLeft');
    let container = document.querySelector('.selectedContainer');
    let image = container.querySelector('.selectedFighter');
    image.classList.remove('fa-hand-rock', 'fa-hand-paper', 'fa-hand-scissors');
    
    // Update fight area text and images
    let versusText = document.querySelector('.versusText');
    let fightCard = document.querySelector('.fightCardLeft');
    let fightImage = fightCard.querySelector('.selectedFighter');
    fightImage.classList.remove('fa-hand-rock', 'fa-hand-paper', 'fa-hand-scissors')
    switch (id) {
        case 'r0':
            title.innerText = "Rock One";
            image.style.color = 'white';
            image.classList.add('fa-hand-rock');

            versusText.innerText = "Rock One";
            fightImage.classList.add('far', 'fa-hand-rock');
            fightImage.style.color = 'black';
            break;
        case 'r1':
            title.innerText = "Rock Two";
            image.style.color = 'blue';    
            image.classList.add('fa-hand-rock');

            versusText.innerText = "Rock Two";
            fightImage.classList.add('far', 'fa-hand-rock');
            fightImage.style.color = 'blue';
            break;
        case 'r2':
            title.innerText = "Rock Three";
            image.style.color = 'green';    
            image.classList.add('fa-hand-rock');

            versusText.innerText = "Rock Three";
            fightImage.classList.add('far', 'fa-hand-rock');
            fightImage.style.color = 'green';
            break;
        case 'r3':
            title.innerText = "Rock Four";
            image.style.color = 'red';    
            image.classList.add('fa-hand-rock');

            versusText.innerText = "Rock Four";
            fightImage.classList.add('far', 'fa-hand-rock');
            fightImage.style.color = 'red';
            break;
        case 'r4':
            title.innerText = "Rock Five";
            image.style.color = 'purple';    
            image.classList.add('fa-hand-rock');

            versusText.innerText = "Rock Five";
            fightImage.classList.add('far', 'fa-hand-rock');
            fightImage.style.color = 'purple';
            break;
        case 'p0':
            title.innerText = "Paper One";
            image.style.color = 'white';
            image.classList.add('fa-hand-paper');

            versusText.innerText = "Paper One";
            fightImage.classList.add('far', 'fa-hand-paper');
            fightImage.style.color = 'black';
            break;
        case 'p1':
            title.innerText = "Paper Two";
            image.style.color = 'blue';
            image.classList.add('fa-hand-paper');

            versusText.innerText = "Paper Two";
            fightImage.classList.add('far', 'fa-hand-paper');
            fightImage.style.color = 'blue';
            break;
        case 'p2':
            title.innerText = "Paper Three";
            image.style.color = 'green';
            image.classList.add('fa-hand-paper');

            versusText.innerText = "Paper Three";
            fightImage.classList.add('far', 'fa-hand-paper');
            fightImage.style.color = 'green';
            break;
        case 'p3':
            title.innerText = "Paper Four";
            image.style.color = 'red';
            image.classList.add('fa-hand-paper');

            versusText.innerText = "Paper Four";
            fightImage.classList.add('far', 'fa-hand-paper');
            fightImage.style.color = 'red';
            break;
        case 'p4':
            title.innerText = "Paper Five";
            image.style.color = 'purple';
            image.classList.add('fa-hand-paper');
            
            versusText.innerText = "Paper Five";
            fightImage.classList.add('far', 'fa-hand-paper');
            fightImage.style.color = 'purple';
            break;
        case 's0':
            title.innerText = "Scissor One";
            image.style.color = 'white';
            image.classList.add('fa-hand-scissors');

            versusText.innerText = "Scissor One";
            fightImage.classList.add('far', 'fa-hand-scissors');
            fightImage.style.color = 'black';
            break;
        case 's1':
            title.innerText = "Scissor Two";
            image.style.color = 'blue';
            image.classList.add('fa-hand-scissors');

            versusText.innerText = "Scissor Two";
            fightImage.classList.add('far', 'fa-hand-scissors');
            fightImage.style.color = 'blue';
            break;
        case 's2':
            title.innerText = "Scissor Three";
            image.style.color = 'green';
            image.classList.add('fa-hand-scissors');

            versusText.innerText = "Scissor Three";
            fightImage.classList.add('far', 'fa-hand-scissors');
            fightImage.style.color = 'green';
            break;
        case 's3':
            title.innerText = "Scissor Four";
            image.style.color = 'red';
            image.classList.add('fa-hand-scissors');

            versusText.innerText = "Scissor Foud";
            fightImage.classList.add('far', 'fa-hand-scissors');
            fightImage.style.color = 'red';
            break;
        case 's4':
            title.innerText = "Scissor Five";
            image.style.color = 'purple';
            image.classList.add('fa-hand-scissors');

            versusText.innerText = "Scissor Five";
            fightImage.classList.add('far', 'fa-hand-scissors');
            fightImage.style.color = 'purple';
            break;
    };
};

// GAME LOGIC
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
                return 2;
                break;
            }
    };
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