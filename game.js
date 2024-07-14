let computerScore = 0;
let humanScore = 0;
let roundsPlayed = 0;
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
    if (roundsPlayed<gameRounds) {
        let humanChoice = String(element.target.getAttribute("class"));
        playRound(humanChoice,getComputerChoice());
        roundsPlayed++;
    } else {
        let message;
        if (humanScore>computerScore) {
            message = "YOU WON !!!!"
        } else if (humanScore<computerScore) {
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

function main() {
    let button = document.querySelector("#start-screen button");
    
    button.addEventListener("click",()=>{
        setTimeout(()=>{
            document.body.style.backgroundPosition = "center +100px";
            document.querySelector("#start-screen").classList.remove("active");
            document.querySelector("#round-screen").classList.add("active");
        },400);
    });
    button = document.querySelector("#round-screen button");
    
    button.addEventListener("click",()=>{
        setTimeout(()=>{
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