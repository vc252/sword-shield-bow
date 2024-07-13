function getComputerChoice() {
    const choices = ["sword","shield","bow"];
    Object.freeze(choices);
    let index = Math.floor(Math.random()*3);
    return choices[index];
}

function getHumanChoice() {
    const choices = ["sword","shield","bow"];
    Object.freeze(choices);
    let choice = String(prompt("Enter your choice"));
    if (!choices.includes(choice.toLowerCase())) {
        alert("Enter a valid input");
        return;
    }
    return choice;
}

function playRound(humanChoice,computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();
    if (humanChoice === computerChoice) {
        return "tie";
    }
    if (
        (humanChoice === "sword" && computerChoice === "bow") ||
        (humanChoice === "bow" && computerChoice === "shield") ||
        (humanChoice === "shield" && computerChoice === "sword")
    ) {
        return "human";
    } else {
        return "computer";
    }
}

function game() {
    let computerScore = 0;
    let humanScore = 0;
    let rounds = parseInt(prompt("Enter number of rounds to be played",5));
    for (i = 0; i<rounds; i++) {
        let humanChoice = getHumanChoice();
        let computerChoice = getComputerChoice();
        alert(`computer playes: ${computerChoice}`);
        let result = playRound(humanChoice,computerChoice);
        if (result === "human") {
            humanScore++;
        } else if (result === "computer") {
            computerScore++;
        } else {
            humanScore++;
            computerScore++;
        }
        console.log(`You:${humanScore} Computer:${computerScore}`)
    }
    
    if (humanScore>computerScore) {
        console.log("you win");
    } else if (humanScore<computerScore) {
        console.log("you lose");
    } else {
        console.log("that's a tie");
    }
}

game();