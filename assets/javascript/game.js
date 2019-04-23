// Crystal item limits
const crystalNumber = 4;
// Crystal value limits
const crystalValueMin = 2;
const crystalValueMax = 12;
// Available types
const crystalImages = ["url(assets/images/red.png)", "url(assets/images/green.png)", "url(assets/images/blue.png)","url(assets/images/white.png)"];

$("document").ready(function () {
    // Main play object
    var crystal = {
        value: 0,
        image: "#",

        buildMe: function () {
            this.image = crystalImages[myType];
        },

         generateValue: function() {
            this.value = Math.floor((Math.random() * (crystalValueMax - crystalValueMin)) + crystalValueMin);
        }
    };

    // Collection of crystals
    var crystalObjs = [];
    var crystalUI = document.getElementsByClassName("crystal-pick");
    // Score tracking
    var scoreTarget = 0;
    var scoreCurrent = 0;
    var winLoseRate = [0, 0];

    // UI references
    var gameUI = $("#game-UI");

    generateCrystals();
    updateGameUI();

    $(".crystal-pick").on("click", function() {
        
        updateScoresUI();
    })

    function generateCrystals() {
        for (var i = 0; i < crystalNumber; i++) {
            var crystalTemp = new crystal;
            crystalObjs.push((crystalTemp.buildMe(), crystalTemp.generateValue()));
        }
    }

    function resetSession() {
        scoreCurrent = 0;

        crystalObjs.forEach(function (crystal) {
            crystal.value = generateValue();
        });
    }

    function updateGameUI() {
        for (var i = 0; i < crystalNumber; i++) {
            crystalUI[i].css("background: " + crystalObjs[i].image);
        }
    }

    function updateScoresUI() {
        $("#target-score").text(scoreTarget);
        $("#current-score").text(scoreCurrent);
    }

    function updateWL() {
        $("#wins").text(winLoseRate[0]);
        $("#losses").text(winLoseRate[1]);
    }
});