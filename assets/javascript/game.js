//Animating the sprites when they attack
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
})

$("#rogue").sprite({
    fps: 10,
    no_of_frames: 10,
    on_last_frame: function (obj) {
        obj.spStop();
    }
})



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

var player = {
    character: skeleton,
    currentEnemy: adventurer
};

$("#attackbutton").on("click", function () {
    player.character.attack();
    player.currentEnemy.currentHealth -= player.character.damage;
    $("#ehealth").attr("style", "width:" + (player.currentEnemy.currentHealth/player.currentEnemy.maxHealth) * 100 + "%;");
    console.log(adventurer.currentHealth);
})

$(".characteroption").on("click", function () {
    player.character = $(this).attr("value");
    console.log(player.character);
    window.location.href = "challenge.html";
})

$(".startbutton").on("click", function () {
    window.location.href = "characterselect.html";
})