// Crystal item limits
const crystalNumber = 4;
// Crystal value limits
const crystalValueMin = 1;
const crystalValueMax = 12;
// Total value limits
const totalValueMin = 19;
const totalValueMax = 120;
const crystalsUI = ["crystal-1", "crystal-2", "crystal-3", "crystal-4"];

$(document).ready(function () {
    // Main play objects
    var crystal1 = {
        uiElement: "crystal-1",
        uiScore: "square-1",
        uiImage: "gem-1",
        value: 0,
    };

    var crystal2 = {
        uiElement: "crystal-2",
        uiScore: "square-2",
        uiImage: "gem-2",
        value: 0,
    }

    var crystal3 = {
        uiElement: "crystal-3",
        uiScore: "square-3",
        uiImage: "gem-3",
        value: 0,
    }

    var crystal4 = {
        uiElement: "crystal-4",
        uiScore: "square-4",
        uiImage: "gem-4",
        value: 0,
    }

    // Collection of play objects
    var crystals = [crystal1, crystal2, crystal3, crystal4];

    // Score tracking
    var scoreTarget = 0;
    var scoreCurrent = 0;
    var winLoseRate = [0, 0];
    // Track game progress
    var gameOver = false;

    resetSession();

    // Class picker
    $(".crystal-pick").on("click", function () {
        if (gameOver === false) {
            var choice = crystals[crystalsUI.indexOf(this.id)];
            var choiceFdback = document.getElementById(choice.uiImage);

            scoreCurrent += choice.value;
            // Animate selection feedback
            choiceFdback.classList.remove("select-flash");
            choiceFdback.offsetWidth;
            choiceFdback.classList.add("select-flash");

            // Check if the game is over
            if (scoreCurrent === scoreTarget) {
                winLoseRate[0] += 1;
                gameOver = true;
                updateUI();
                displayMessage(true);
            }
            else if (scoreCurrent > scoreTarget) {
                winLoseRate[1] += 1;
                gameOver = true;
                updateUI();
                displayMessage(false);
            }
            else { updateUI(); }
        }
    })

    function generateValues() {
        scoreTarget = Math.floor((Math.random() * (totalValueMax - totalValueMin)) + totalValueMin);

        crystals.forEach(function (crystal) {
            crystal.value = Math.floor((Math.random() * (crystalValueMax - crystalValueMin)) + crystalValueMin);
        })
    }

    // Press any key to reset
    $(document).keyup(function (event) {
        if (gameOver === true) {
            resetSession();
            gameOver = false;
        }
    })

    // Reset UI and score
    function resetSession() {
        scoreCurrent = 0;
        scoreTarget = 0;
        generateValues();
        updateUI();
    }

    function updateUI() {
        $("#current-score").text(scoreCurrent);
        $("#target-score").text(scoreTarget);
        $("#wins").text(winLoseRate[0]);
        $("#losses").text(winLoseRate[1]);
    }

    function displayMessage(success) {
        if (success) {
            alert("Congratulations! Press any key to play again.")
        }
        else { alert("Oops! Press any key to play again."); }
    }
});