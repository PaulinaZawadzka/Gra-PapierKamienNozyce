const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: "",
    playerHandHTML: ""
}

const hands = [...document.querySelectorAll('.select img')];

function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = "");
    this.style.boxShadow = ' 0 0 15px red';
}

function computerChoice() {
    return hands[Math.floor(Math.random() * hands.length)].dataset.option;
}

function checkResult(player, ai) {

    if (player === ai) {
        return 'remis'
    } else {
        if ((player === "papier" && ai === "kamień") ||
            (player === "papier" && ai === "spock") ||
            (player === "kamień" && ai === "nożyczki") ||
            (player === "kamień" && ai === "jaszczurka") ||
            (player === "nożyczki" && ai === "jaszczurka") ||
            (player === "nożyczki" && ai === "papier") ||
            (player === "jaszczurka" && ai === "spock") ||
            (player === "jaszczurka" && ai === "papier") ||
            (player === "spock" && ai === "kamień") ||
            (player === "spock" && ai === "nożyczki")) {
            return 'wygrana'
        } else {
            return 'przegrana'
        }
    }
}

function publishResult(result) {
    document.querySelector('[data-summary="your-choice"]').textContent = game.playerHand;
    document.querySelector('[data-summary="ai-choice"]').textContent = game.aiHand;
    winner = "";
    gameSummary.numbers++;
    if (result === "wygrana") {
        gameSummary.wins++;
        winner = "Brawo użytkowniku! Wygrałeś!";
        document.querySelector('[data-summary="who-win"]').style.color = "green";
    }
    if (result === "przegrana") {
        gameSummary.losses++;
        winner = "Niestety..   Przegrałeś..Spróbuj jeszcze raz";
        document.querySelector('[data-summary="who-win"]').style.color = "red";
    }
    if (result === "remis") {
        gameSummary.draws++;
        winner = "Remis";
        document.querySelector('[data-summary="who-win"]').style.color = "blue";
    }
    document.querySelector('[data-summary="who-win"]').textContent = winner;
    document.querySelector('p.numbers>span').textContent = gameSummary.numbers;
    document.querySelector('p.wins>span').textContent = gameSummary.wins;
    document.querySelector('p.losses>span').textContent = gameSummary.losses;
    document.querySelector('p.draws>span').textContent = gameSummary.draws;
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';
    game.playerHand = "";
    game.aiHand = "";
}

function startGame() {
    if (!game.playerHand) //jeżeli jest pusta to zwraca false
    {
        return alert('Wybierz dłoń')
    }
    game.aiHand = computerChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(gameResult);
    endGame();
}

function reset() {
    gameSummary.numbers = 0;
    gameSummary.wins = 0;
    gameSummary.losses = 0;
    gameSummary.draws = 0;
    console.log(gameSummary.numbers);
    document.querySelector('p.numbers>span').textContent = gameSummary.numbers;
    document.querySelector('p.wins>span').textContent = gameSummary.wins;
    document.querySelector('p.losses>span').textContent = gameSummary.losses;
    document.querySelector('p.draws>span').textContent = gameSummary.draws;
    document.querySelector('[data-summary="your-choice"]').textContent = "";
    document.querySelector('[data-summary="ai-choice"]').textContent = "";
    document.querySelector('[data-summary="who-win"]').textContent = "";

}


hands.forEach(hand => hand.addEventListener("click", handSelection))
document.querySelector(".start").addEventListener('click', startGame)
document.querySelector(".reset").addEventListener('click', reset)