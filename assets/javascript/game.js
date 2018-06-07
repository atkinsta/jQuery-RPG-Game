// json stringify
// json parse

//Animating the sprites when they attack, have these set up to load with the page because 1. it looks cool, and 2. need to have them toggled off at start. 
animateLoad();

//Game objects go here
var skeleton = {
    id: "skeleton",
    isDead: false,
    maxHealth: 500,
    damageTaken: 0,
    currentHealth: 500,
    damage: 10,
    counterDamage: 20
};

var adventurer = {
    id: "adventurer",
    isDead: false,
    maxHealth: 500,
    damageTaken: 0,
    currentHealth: 500,
    damage: 10,
    counterDamage: 20
};

var rogue = {
    id: "rogue",
    maxHealth: 450,
    isDead: false,
    damageTaken: 0,
    currentHealth: 450,
    damage: 10,
    counterDamage: 20
};

var bandit = {
    id: "bandit",
    maxHealth: 450,
    isDead: false,
    damageTaken: 0,
    currentHealth: 450,
    damage: 10,
    counterDamage: 20
};

var player = {
    character: JSON.parse(sessionStorage.getItem("pCharacter")),
    currentEnemy: JSON.parse(sessionStorage.getItem("eCharacter"))
};

function attack() {
    var locator = "#" + player.character.id;
    $(locator.toString()).spToggle();
    player.currentEnemy.currentHealth -= player.character.damage;
    counterAttack();      
    fightDisplay(); 
    player.character.damage += 10;
    if (player.currentEnemy.currentHealth <= 0){
        player.currentEnemy.isDead = true;
        sessionStorage.setItem("pHealth", player.character.currentHealth);
        sessionStorage.setItem("pDamage", player.character.damage);
    }
}

function counterAttack() {
    var locator = "#" + player.currentEnemy.id;
    $(locator.toString()).spToggle();
    player.character.currentHealth -= player.currentEnemy.counterDamage;
}

function fightDisplay () {
    $("#ehealth").attr("style", "width: " + (player.currentEnemy.currentHealth/player.currentEnemy.maxHealth) * 100 + "%;");
    $("#phealth").attr("style", "width: " + (player.character.currentHealth/player.character.maxHealth) * 100 + "%;");
    $("#status").prepend("<p style='float: left; color: green; width: 48%;'> You dealt " + player.character.damage + " damage! </p>");
    $("#status").prepend("<p style='float: right; color: red; width: 48%'> The enemy dealt " + player.currentEnemy.counterDamage + " damage! </p>");
    $("#status").prepend("<p style='color: gold;'> You have " + player.character.currentHealth + " HP remaining! </p>");
}

function animateLoad() {
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
            obj.spToggle(true);
        }
    });
    
    $("#rogue").sprite({
        fps: 10,
        no_of_frames: 10,
        on_last_frame: function (obj) {
            obj.spToggle(true);
        }
    });

}

function placeChallengers() {                                                       //This is a mess, but you know what it's fine. It works. 
    if (player.character.id === "skeleton") {
        $(".slot1").attr({ "id": "bandit", "value": "bandit" });
        $(".slot2").attr({ "id": "adventurer", "value": "adventurer" });
        $(".slot3").attr({ "id": "rogue", "value": "rogue" });
    }
    else if (player.character.id === "bandit") {
        $(".slot1").attr({ "id": "skeleton", "value": "skeleton" });
        $(".slot2").attr({ "id": "adventurer", "value": "adventurer" });
        $(".slot3").attr({ "id": "rogue", "value": "rogue" });
    }
    else if (player.character.id === "rogue") {
        $(".slot1").attr({ "id": "bandit", "value": "bandit" });
        $(".slot2").attr({ "id": "adventurer", "value": "adventurer" });
        $(".slot3").attr({ "id": "skeleton", "value": "skeleton" });
    }
    else if (player.character.id === "adventurer") {
        $(".slot1").attr({ "id": "bandit", "value": "bandit" });
        $(".slot2").attr({ "id": "skeleton", "value": "skeleton" });
        $(".slot3").attr({ "id": "rogue", "value": "rogue" });
    }
}

function setupFight() {
    $(".playerid").attr("id", player.character.id);
    $(".enemyid").attr("id", player.currentEnemy.id);
}

function loadCharacterValues() {
    JSON.parse(pCharacter).currentHealth = sessionStorage.getItem("pHealth");
}

// On click section, have most event handlers here. 
$("#attackbutton").on("click", function () { //Side note, I was blown away this works. So many references to keys in other objects. 
    attack();
});

$(".characteroption").on("mouseover", function () {
    $('[data-toggle="popover"]').popover();
});

$(".characteroption").on("click", function () {         // Logs the players character choice and moves them onto the challenge section.
    var pChoice = $(this).attr("value");                // $(this) refers to the value of the specific .characteroption we clicked on.
    if (pChoice === "adventurer")                                               //There is probably a MUCH better way to do this, but you know what. It works and I have a lot to do. 
        sessionStorage.setItem("pCharacter", JSON.stringify(adventurer));
    else if (pChoice === "skeleton")
        sessionStorage.setItem("pCharacter", JSON.stringify(skeleton));
    else if (pChoice === "bandit")
        sessionStorage.setItem("pCharacter", JSON.stringify(bandit));
    else if (pChoice === "rogue")
        sessionStorage.setItem("pCharacter", JSON.stringify(rogue));
    window.location.href = "challenge.html";
    animateLoad();
});

$("#startbutton").on("click", function () {
    window.location.href = "characterselect.html";
});

$(".challenger").on("click", function () {
    var challenged = $(this).attr("value");
    if (challenged === "adventurer")
        if (adventurer.isDead === false) {
            sessionStorage.setItem("eCharacter", JSON.stringify(adventurer));
            window.location.href = "fight.html";
            animateLoad();
        }
        else
            alert("Character is dead!")
    else if (challenged === "bandit")
        if (bandit.isDead === false) {
            sessionStorage.setItem("eCharacter", JSON.stringify(adventurer));
            window.location.href = "fight.html";
            animateLoad();
        }
        else
            alert("Character is dead!")
    else if (challenged === "skeleton")
        if (skeleton.isDead === false) {
            sessionStorage.setItem("eCharacter", JSON.stringify(skeleton));
            window.location.href = "fight.html";
            animateLoad();
        }
        else
            alert("Character is dead!")
    else if (challenged === "rogue")
        if (rogue.isDead === false) {
            sessionStorage.setItem("eCharacter", JSON.stringify(rogue));
            window.location.href = "fight.html";
            animateLoad();
        }
        else
            alert("Character is dead!")
});

window.onload = function() {
    placeChallengers();
    setupFight();
    animateLoad();
};

