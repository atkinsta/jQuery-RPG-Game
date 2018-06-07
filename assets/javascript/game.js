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
    maxHealth: 500,
    currentHealth: 500,
    damage: Math.floor([Math.random() * 100]+ 20),
    attack: function () {
        $("#skeleton").spToggle();
    }
};

var adventurer = {
    maxHealth: 500,
    currentHealth: 500,
    attack: function () {
        $("#adventurer").spToggle();
    }
};

var rogue = {
    maxHealth: 450,
    currentHealth: 450,
    damage: Math.floor(Math.random() * 130),
    attack: function () {
        $("#rogue").spToggle();
    }
};

var player = {
    character: skeleton,
    currentEnemy: adventurer
};

// On click section, have most event handlers here. 
$("#attackbutton").on("click", function () { //Side note, I was blown away this works. So many references to keys in other objects. 
    player.character.attack();
    player.currentEnemy.currentHealth -= player.character.damage;
    $("#ehealth").attr("style", "width:" + (player.currentEnemy.currentHealth/player.currentEnemy.maxHealth) * 100 + "%;"); //TODO: Replace with a screen display function. 
    console.log(adventurer.currentHealth);
})
$(".characteroption").on("mouseover", function () {
    $('[data-toggle="popover"]').popover();
});

$(".characteroption").on("click", function () {         // Logs the players character choice and moves them onto the challenge section.
    player.character = $(this).attr("value");           // $(this) refers to the value of the specific .characteroption we clicked on.
    console.log(player.character);
    window.location.href = "challenge.html";
})

$("#startbutton").on("click", function () {
    window.location.href = "characterselect.html";
})