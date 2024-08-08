let userScore = 0;
let compScore = 0;
let roundsPlayed = 0;
const maxRounds = 10; 

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user");
const compScorePara = document.querySelector("#comp");
const newGameBtn = document.querySelector("#newGameBtn");
const userImg = document.querySelector('#userImg');
const compImg = document.querySelector('#compImg');

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const rdx = Math.floor(Math.random() * options.length);
    return options[rdx];
}

const drawGame = () => {
    msg.innerText = "Draw";
    msg.style.backgroundColor = "#001524";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "#3e5641";
        msg.style.color = "white";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `Computer's ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        msg.style.color = "white";
    }

    roundsPlayed++;

    if (roundsPlayed >= maxRounds) {
        endGame();
    }
}


const playGame = (userChoice) => {
    if (roundsPlayed >= maxRounds) {
        return; 
    }

    const compChoice = genCompChoice();
    console.log("User Choice:", userChoice);
    console.log("Computer Choice:", compChoice);

    userImg.src = `images/${userChoice}.png`;
    compImg.src = `images/${compChoice}.png`;

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, compChoice);
    }
}

const endGame = () => {
    
    if (userScore > compScore) {
        msg.innerText = "You won the game! Congratulations!";
        msg.style.backgroundColor = "#ea1744";
    } else if (compScore > userScore) {
        msg.innerText = "You lost the game! Better luck next time!";
        msg.style.backgroundColor = "#f20089";
    } else {
        msg.innerText = "It's a Draw Match!";
        msg.style.backgroundColor = "#0c63e7";
    }

    choices.forEach((choice) => {
        choice.removeEventListener("click", handleClick);
    });

    newGameBtn.style.display = "block";
}

const startNewGame = () => {
    userScore = 0;
    compScore = 0;
    roundsPlayed = 0;

    userScorePara.innerText = "0";
    compScorePara.innerText = "0";
    msg.innerText = "PLAY YOUR MOVE";
    msg.style.backgroundColor = "#252422";

    choices.forEach((choice) => {
        choice.addEventListener("click", handleClick);
    });

    newGameBtn.style.display = "none";
}

const handleClick = (e) => {
    const userChoice = e.target.closest('.choice').id;
    console.log("User Choice:", userChoice);
    playGame(userChoice);
}

newGameBtn.addEventListener("click", startNewGame);

choices.forEach((choice) => {
    choice.addEventListener("click", handleClick);
});
