// There are tons of features I would still like to add. Unfortuntely I'm out of time. 
// TOADD: Make defeated characters darker on challenge screen.
// TOADD: Maybe set an attack delay so it doesn't interupt the animation if you spam click.  
// TODO: Add a proper win/lose screen. Alerts work but a bit of a hot-fix.
// TODO: COMMENT EVERYTHINGGGGGGGGGGGG

//Animating the sprites when they attack, have these set up to load with the page because 1. it looks cool, and 2. need to have them toggled off at start. 
animateLoad();

//Game objects go here
var skeleton = {
    id: "skeleton",
    isDead: sessionStorage.getItem("skeletonDead"),             //Stores this for use in challenge screen
    maxHealth: 400,
    damageTaken: 0,
    currentHealth: 400,
    damage: 10,
    damageMultipler: 1.15,
    counterDamage: 12
};

var adventurer = {
    id: "adventurer",
    isDead: sessionStorage.getItem("adventurerDead"),
    maxHealth: 300,
    damageTaken: 0,
    currentHealth: 300,
    damage: 10,
    damageMultipler: 1.2,
    counterDamage: 15
};

var rogue = {
    id: "rogue",
    maxHealth: 200,
    isDead: sessionStorage.getItem("rogueDead"),
    damageTaken: 0,
    currentHealth: 200,
    damage: 14,
    damageMultipler: 1.25,
    counterDamage: 28
};

var bandit = {
    id: "bandit",
    maxHealth: 325,
    isDead: sessionStorage.getItem("banditDead"),
    damageTaken: 0,
    currentHealth: 325,
    damage: 12,
    damageMultipler: 1.1,
    counterDamage: 22
};

var player = {
    character: JSON.parse(sessionStorage.getItem("pCharacter")),
    currentEnemy: JSON.parse(sessionStorage.getItem("eCharacter"))
};

function attack() {
    player.currentEnemy.currentHealth -= player.character.damage;
    toggleAnimation();
    counterAttack();
    fightDisplay();
    player.character.damage = Math.round(player.character.damage * player.character.damageMultipler);
    if (player.currentEnemy.currentHealth <= 0) {
        disableAttack(1500);
        storeVariables();
        if (sessionStorage.getItem("winTracker") == "111") {
            $("#attackbutton").prop("disabled", true);
            $("#status").prepend("<h2 style='color: gold'>YOU BEAT EVERYONE!</p>");
            setTimeout(function () {
                alert("You beat all the characters. If you would like to play again, close the tab and reopen it to reset everything. Thanks for playing!");
            }, 1500);
        }
        else {
            $("#status").prepend("<h2 style='color: gold'>YOU WIN!</p>");
            setTimeout(function () {
                window.location.href = "challenge.html";
            }, 1500);
        }
    }
    else if (player.character.currentHealth <= 0) {
        $("#attackbutton").prop("disabled", true);
        $("#status").prepend("<h2 style='color: red'> YOU LOSE :(</h2>");
        setTimeout(function () {
            alert("You lost, but thanks for playing. Close the browser and refresh to play again. This game uses session storage so you need to close the window. Good luck next time!");
        }, 1500)

    }
}

function disableAttack(time) {   
    $("#attackbutton").prop("disabled", true);
    setInterval(function() {
        $("#attackbutton").prop("disabled",false);
    }, time)
}

function counterAttack() {
    var locator = "#" + player.currentEnemy.id;
    $(locator.toString()).spToggle();
    player.character.currentHealth -= player.currentEnemy.counterDamage;
}

function fightDisplay() {
    $("#ehealth").attr("style", "width: " + (player.currentEnemy.currentHealth / player.currentEnemy.maxHealth) * 100 + "%;");
    $("#phealth").attr("style", "width: " + (player.character.currentHealth / player.character.maxHealth) * 100 + "%;");
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

function toggleAnimation() {
    var locator = "#" + player.character.id;
    $(locator.toString()).spToggle();
}

function storeVariables() {
    sessionStorage.setItem((player.currentEnemy.id).toString() + "Dead", "true");
    var tempObj = JSON.parse(sessionStorage.getItem("pCharacter"));
    tempObj.currentHealth = player.character.currentHealth;
    tempObj.damage = player.character.damage;
    sessionStorage.setItem("pCharacter", JSON.stringify(tempObj));
    sessionStorage.setItem("winTracker", sessionStorage.getItem("winTracker") + 1);
}

function loadHPBars() {
    $("#ehealth").attr("style", "width: " + (player.currentEnemy.currentHealth / player.currentEnemy.maxHealth) * 100 + "%;");
    $("#phealth").attr("style", "width: " + (player.character.currentHealth / player.character.maxHealth) * 100 + "%;");
}

// On click section, have most event handlers here. 
$("#attackbutton").on("click", function () { //Side note, I was blown away this works. So many references to keys in other objects. 
    attack();
});

$(".characteroption, .characterinfo").on("mouseover", function () {
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
        if (adventurer.isDead == "true")
            alert("Character is dead!")
        else {
            sessionStorage.setItem("eCharacter", JSON.stringify(adventurer));
            window.location.href = "fight.html";
            animateLoad();
        }
    else if (challenged == "bandit")
        if (bandit.isDead == "true")
            alert("Character is dead!");
        else {
            sessionStorage.setItem("eCharacter", JSON.stringify(bandit));
            window.location.href = "fight.html";
            animateLoad();
        }
    else if (challenged === "skeleton")
        if (skeleton.isDead == "true") {
            alert("Character is dead!");
        }
        else {
            sessionStorage.setItem("eCharacter", JSON.stringify(skeleton));
            window.location.href = "fight.html";
            animateLoad();
        }
    else if (challenged === "rogue")
        if (rogue.isDead == "true")
            alert("Character is dead!");
        else {
            sessionStorage.setItem("eCharacter", JSON.stringify(rogue));
            window.location.href = "fight.html";
            animateLoad();
        }
});

window.onload = function () {
    placeChallengers();
    setupFight();
    loadHPBars();
    animateLoad();
};

