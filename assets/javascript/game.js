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
        obj.spStop();
    }
});

$("#rogue").sprite({
    fps: 10,
    no_of_frames: 10,
    on_last_frame: function (obj) {
        obj.spStop();
    }
});


//Game objects go here
var skeleton = {
    id: "skeleton",
    maxHealth: 500,
    damageTaken: parseInt(sessionStorage.getItem("sDamageTaken")),
    currentHealth: this.maxHealth - this.damageTaken,
    damage: parseInt(sessionStorage.getItem("sDamage")),
    attack: function () {
        $("#skeleton").spToggle();
    }
};

var adventurer = {
    id: "adventurer",
    maxHealth: 500,
    damageTaken: parseInt(sessionStorage.getItem("aDamageTaken")),
    currentHealth: this.maxHealth - this.damageTaken,
    attack: function () {
        $("#adventurer").spToggle();
    }
};

var rogue = {
    id: "rogue",
    maxHealth: 450,
    damageTaken: parseInt(sessionStorage.getItem("rDamageTaken")),
    currentHealth: this.maxHealth - this.damageTaken,
    damage: Math.floor(Math.random() * 130),
    attack: function () {
        $("#rogue").spToggle();
    }
};

var bandit = {
    id: "bandit",
    maxHealth: 450,
    damageTaken: parseInt(sessionStorage.getItem("bDamageTaken")),
    currentHealth: this.maxHealth - this.damageTaken,
    damage: Math.floor(Math.random() * 130),
    attack: function () {
        $("#bandit").spToggle();
    }
};

var player = {
    character: eval(sessionStorage.getItem("pCharacter")),
    currentEnemy: eval(sessionStorage.getItem("pEnemy")),
};

// On click section, have most event handlers here. 
window.onload = function () {
    $("#attackbutton").on("click", function () { //Side note, I was blown away this works. So many references to keys in other objects. 
        player.character.attack();
        player.currentEnemy.currentHealth -= player.character.damage;
        $("#ehealth").attr("style", "width:" + (player.currentEnemy.currentHealth / player.currentEnemy.maxHealth) * 100 + "%;"); //TODO: Replace with a screen display function. 
        console.log(adventurer.currentHealth);
    });
    $(".characteroption").on("mouseover", function () {
        $('[data-toggle="popover"]').popover();
    });

    $(".characteroption").on("click", function () {         // Logs the players character choice and moves them onto the challenge section.
        sessionStorage.setItem("pCharacter", $(this).attr("value"))         // $(this) refers to the value of the specific .characteroption we clicked on.
        console.log(sessionStorage.getItem("pCharacter"));
        window.location.href = "challenge.html";
    });

    $("#startbutton").on("click", function () {
        window.location.href = "characterselect.html";
    });

    $(".challenger").on("click", function () {
        sessionStorage.setItem("pEnemy", $(this).attr("value"));
        window.location.href = "fight.html";
    });
    $("#beginfight").on("click", function () {
        $(".playerid").attr("id", player.character.id);
        $(".enemyid").attr("id", player.currentEnemy.id);
    });
}

