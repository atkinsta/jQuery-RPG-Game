//Animating the sprites when they attack
$("#skeleton").sprite({
    fps: 10,
    no_of_frames: 18,
    on_last_frame: function (obj) {
        obj.spStop();
    }
});

$("#adventurer").sprite({
    fps: 10,
    no_of_frames: 5,
    on_last_frame: function (obj) {
        obj.spStop();
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

$("#phealth").attr("style", "width:" + (235/550)*100 + "%;");