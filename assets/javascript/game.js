// json stringify
// json parse

//Animating the sprites when they attack, have these set up to load with the page because 1. it looks cool, and 2. need to have them toggled off at start. 
$("#skeleton").sprite({
    fps: 10,
    no_of_frames: 18,
    on_last_frame: function (obj) {
        obj.spToggle();
    }
});

$("#adventurer").sprite({
    fps: 10,
    no_of_frames: 5,
    on_last_frame: function (obj) {
        obj.spToggle();
    }
});

$("#bandit").sprite({
    fps: 10,
    no_of_frames: 8,
    on_last_frame: function (obj) {
        obj.spToggle();
    }
});

$("#rogue").sprite({
    fps: 10,
    no_of_frames: 10,
    on_last_frame: function (obj) {
        obj.spToggle();
    }
});


//Game objects go here
var skeleton = {
    id: "skeleton",
    maxHealth: 500,
    damageTaken: 0,
    currentHealth: this.maxHealth - this.damageTaken,
    healthPercentage: (this.currentHealth/this.maxHealth) * 100,
    damage: 10,
};

var adventurer = {
    id: "adventurer",
    maxHealth: 500,
    damageTaken: parseInt(sessionStorage.getItem("aDamageTaken")),
    currentHealth: this.maxHealth - this.damageTaken,
    healthPercentage: (this.currentHealth/this.maxHealth) * 100,
    damage: 10,
};

var rogue = {
    id: "rogue",
    maxHealth: 450,
    damageTaken: parseInt(sessionStorage.getItem("rDamageTaken")),
    currentHealth: this.maxHealth - this.damageTaken,
    healthPercentage: (this.currentHealth/this.maxHealth) * 100,
    damage: 10,
};

var bandit = {
    id: "bandit",
    maxHealth: 450,
    damageTaken: 50,
    currentHealth: this.maxHealth - this.damageTaken,
    healthPercentage: (this.currentHealth/this.maxHealth) * 100,
    damage: 10,
};

var player = {
    character: JSON.parse(sessionStorage.getItem("pCharacter")), 
    currentEnemy: JSON.parse(sessionStorage.getItem("eCharacter"))
};

function attack() {
    
}

// On click section, have most event handlers here. 
window.onload = function () {
    $("#attackbutton").on("click", function () { //Side note, I was blown away this works. So many references to keys in other objects. 
        console.log(player.currentEnemy.damageTaken);
        $("#ehealth").attr("style", "width:" + player.currentEnemy.healthPercentage + "%;"); //TODO: Replace with a screen display function. 
        console.log(adventurer.currentHealth);
    });

    $(".characteroption").on("mouseover", function () {
        $('[data-toggle="popover"]').popover();
    });

    $(".characteroption").on("click", function () {         // Logs the players character choice and moves them onto the challenge section.
        var pChoice = $(this).attr("value");         // $(this) refers to the value of the specific .characteroption we clicked on.
        if (pChoice === "adventurer")
            sessionStorage.setItem("pCharacter", JSON.stringify(adventurer));
        else if (pChoice === "skeleton")
            sessionStorage.setItem("pCharacter", JSON.stringify(skeleton));
        else if (pChoice === "bandit")
            sessionStorage.setItem("pCharacter", JSON.stringify(bandit));
        else if (pChoice === "rogue")
            sessionStorage.setItem("pcharacter", JSON.stringify(rogue));
        window.location.href = "challenge.html";
    });

    $("#startbutton").on("click", function () {
        window.location.href = "characterselect.html";
    });

    $(".challenger").on("click", function () {
        var challenged = $(this).attr("value");
        if (challenged === "adventurer")
            sessionStorage.setItem("eCharacter", JSON.stringify(adventurer));
        else if (challenged === "bandit")
            sessionStorage.setItem("eCharacter", JSON.stringify(bandit));
        else if (challenged === "skeleton")
            sessionStorage.setItem("eCharacter", JSON.stringify(skeleton));
        else if (challenged === "rogue")
            sessionStorage.setItem("eCharacter", JSON.stringify(rogue));
        window.location.href = "fight.html";
    });

    $(".playerid").attr("id", player.character.id);
    $(".enemyid").attr("id", player.currentEnemy.id);
}

