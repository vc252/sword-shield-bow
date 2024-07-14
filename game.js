
let computerScore = 0;
let humanScore = 0;
let roundsPlayed = 0;
let clickSound;
let gameRounds;
function getComputerChoice() {
    const choices = ["sword","shield","bow"];
    Object.freeze(choices);
    let index = Math.floor(Math.random()*3);
    return choices[index];
}

function selectButton(computerChoice) {
    document.querySelector(".computer-card ."+computerChoice).classList.add("opacity");
}

function diselectButton(computerChoice) {
    document.querySelector(".computer-card ."+computerChoice).classList.remove("opacity");
}

function playRound(humanChoice,computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();
    selectButton(computerChoice);
    setTimeout(()=>{
        diselectButton(computerChoice);
    },200)
    if (humanChoice === computerChoice) {
        humanScore++;
        computerScore++;
        document.querySelector(".player-card p").textContent = `SCORE: ${humanScore}`;
        document.querySelector(".computer-card p").textContent = `SCORE: ${computerScore}`;
    } else if (
        (humanChoice === "sword" && computerChoice === "bow") ||
        (humanChoice === "bow" && computerChoice === "shield") ||
        (humanChoice === "shield" && computerChoice === "sword")
    ) {
        humanScore++;
        document.querySelector(".player-card p").textContent = `SCORE: ${humanScore}`;
    } else {
        computerScore++;
        document.querySelector(".computer-card p").textContent = `SCORE: ${computerScore}`;
    }
}

function handleClickEvent(element) {
    playClickSound(clickSound);
    if (roundsPlayed<gameRounds) {
        let humanChoice = String(element.target.getAttribute("class"));
        playRound(humanChoice,getComputerChoice());
        roundsPlayed++;
    } else {
        let message;
        if (humanScore>computerScore) {
            playWinSound();
            message = "YOU WON !!!!"
        } else if (humanScore<computerScore) {
            playLoseSound();
            message = "ha you LOST by random AI!"
        } else {
            message = "that's a TIE nothing to be happy about";
        }
        displayMessage(message);
    }
}

function displayMessage(message) {
    document.querySelector(".overlay").classList.add("active");
    document.querySelector(".overlay").textContent = message;
}

function startGame() {
    gameRounds = parseInt(gameRounds);
    let buttons = document.querySelectorAll("#player-options");
    
    buttons.forEach((element)=>{
        element.addEventListener("click",handleClickEvent);
    })
}

function playClickSound(clickSound) {
    clickSound.currentTime = 0; // Rewind to start to allow rapid replay
    clickSound.play();
}

function playWinSound() {
    const winSound = document.getElementById("winnersound");
    winSound.play();
}

function playLoseSound() {
    const loseSound = document.getElementById("losersound");
    loseSound.play();
}

function main() {
    clickSound = document.querySelector("audio#clickSound");
    let button = document.querySelector("#start-screen button");
    
    button.addEventListener("click",()=>{
        document.querySelector("audio#bgMusic").play().catch(error => {
            console.error("Autoplay was prevented:", error);
            // Handle autoplay prevention here (e.g., show a play button)
        });
        setTimeout(()=>{
            playClickSound(clickSound);
            document.body.style.backgroundPosition = "center +100px";
            document.querySelector("#start-screen").classList.remove("active");
            document.querySelector("#round-screen").classList.add("active");
        },400);
    });
    button = document.querySelector("#round-screen button");
    
    button.addEventListener("click",()=>{
        setTimeout(()=>{
            playClickSound(clickSound);
            gameRounds = document.querySelector("input").value;
            if (gameRounds>0) {
                document.body.style.backgroundPosition = "center";
                document.querySelector("#round-screen").classList.remove("active");
                document.querySelector("#game-screen").classList.add("active");
                startGame();
            } else {
                alert("Enter a valid number");
            }
        },200);
    });
}

main();