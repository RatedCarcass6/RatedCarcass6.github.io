const choices = document.querySelectorAll('.choice');
const computerImage = document.getElementById('computerImage');
const resultDisplay = document.getElementById('result');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const tiesDisplay = document.getElementById('ties');
const resetButton = document.getElementById('resetButton');

let wins = 0;
let losses = 0;
let ties = 0;


const images = {
    rock: 'https://www.outdooressentialproducts.com/-/media/project/ufpi/outdoor-essentials/products/images/landscape/rocks/204923_small-landscape-rock-grey/outdoor-essentials_gray-landscape-small-rock_image_204923_st01.jpg?sc_lang=en',
    paper: 'https://www.paperpapers.com/media/catalog/product/cache/040ab45878687996a103a8acd78a7429/p/l/plike-white-811.jpg',
    scissors: 'https://i.ebayimg.com/images/g/Sf8AAOSwDINipyBs/s-l140.webp',
    question: 'https://m.media-amazon.com/images/I/51-TrKw+YtL._AC_SL1500_.jpg' 
};

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        // Remove selected class from all choices
        choices.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked choice
        choice.classList.add('selected');
        
        // Get player's choice
        const playerChoice = choice.getAttribute('data-choice');
        
        // Start computer throw animation
        computerThrowAnimation(playerChoice);
    });
});

function computerThrowAnimation(playerChoice) {
    const options = ['rock', 'paper', 'scissors'];
    let shuffleInterval;
    let totalTime = 3000; // 3 seconds
    let elapsedTime = 0;

    // Shuffle images 
    shuffleInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * options.length);
        computerImage.src = images[options[randomIndex]]; // Use URL from images object
    }, 100); // Shuffle every half second

    // Stop shuffling after 3 secs
    setTimeout(() => {
        clearInterval(shuffleInterval);
        const computerChoice = getComputerChoice();
        computerImage.src = images[computerChoice]; 
        const outcome = determineOutcome(playerChoice, computerChoice);
        resultDisplay.textContent = outcome;
        updateScore(outcome);
    }, totalTime);
}

function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function determineOutcome(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    }
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return "You win!";
    }
    return "You lose!";
}

// Update score 
function updateScore(outcome) {
    if (outcome === "You win!") {
        wins++;
        winsDisplay.textContent = wins;
    } else if (outcome === "You lose!") {
        losses++;
        lossesDisplay.textContent = losses;
    } else {
        ties++;
        tiesDisplay.textContent = ties;
    }
}

// Reset the score counters 
resetButton.addEventListener('click', () => {
    wins = 0;
    losses = 0;
    ties = 0;
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
    tiesDisplay.textContent = ties;
    resultDisplay.textContent = "Make your choice to see the outcome!";
    computerImage.src = images.question; 
});
