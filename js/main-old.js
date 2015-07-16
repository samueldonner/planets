
$(document).ready(function() {
    moveit();
    moveitVenus();
    moveitEarth();
    moveitMars();
    moveitJupiter();
    moveitSaturn();
    moveitUranus();
    moveitNeptune();
    detectIt();

    $("body").keydown(function(event) { 
    var $mover = $("#ship");
    //if nothing else will move "mover", then track the 
    //offset instead of recalculating it every time:
       var moverPos = $mover.offset();
       var left = moverPos.left;
       var top = moverPos.top;

    switch(event.keyCode) {
        case 37: //left
            $('#ship').finish().animate({rotate: '-90'}, 100);
            $('#solarSystem').finish().animate({left: '+=50'}, 100);
            detectIt();
            console.log("left");
            console.log("ship offset top:"+ $("#ship").offset().top);
            console.log("ship offset left:"+ $("#ship").offset().left);
            console.log("neptune offset top:"+ $("#saturn").offset().top);
            console.log("neptune offset left:"+ $("#saturn").offset().left);
            break; 
        case 38: //up
            $('#ship').finish().animate({rotate: '0'}, 100);
            $('#solarSystem').finish().animate({top: '+=50'}, 100);
            detectIt();
            console.log("up");
            console.log("ship offset top:"+ $("#ship").offset().top);
            console.log("ship offset left:"+ $("#ship").offset().left); 
            console.log("neptune offset top:"+ $("#neptune").offset().top);
            console.log("neptune offset left:"+ $("#neptune").offset().left);
            break;
        case 39: //right
            $('#ship').finish().animate({rotate: '90'}, 100);
            $('#solarSystem').finish().animate({left: '-=50'}, 100);
            detectIt();
            console.log("right"); 
            console.log("ship offset top:"+ $("#ship").offset().top);
            console.log("ship offset left:"+ $("#ship").offset().left);
            console.log("neptune offset top:"+ $("#neptune").offset().top);
            console.log("neptune offset left:"+ $("#neptune").offset().left);
            break;
        case 40: //down
            $('#ship').finish().animate({rotate: '180'}, 100);
            $('#solarSystem').finish().animate({top: '-=50'}, 100);
            detectIt();
            console.log("down");
            console.log("ship offset top:"+ $("#ship").offset().top);
            console.log("ship offset left:"+ $("#ship").offset().left);
            console.log("neptune offset top:"+ $("#neptune").offset().top);
            console.log("neptune offset left:"+ $("#neptune").offset().left);
            break;
        
    }
});
});

function detectIt(){
    if($("#neptune").offset().top>=$("#ship").offset().top-92
        &&$("#neptune").offset().top<=$("#ship").offset().top+92
        &&$("#neptune").offset().left>=$("#ship").offset().left-92
        &&$("#neptune").offset().left<=$("#ship").offset().left+92){
            alert("neptune collision!");
            $("#solarSystem").css({top:-500,left:-1000});
    }

    if($("#uranus").offset().top>=$("#ship").offset().top-88
        &&$("#uranus").offset().top<=$("#ship").offset().top+88
        &&$("#uranus").offset().left>=$("#ship").offset().left-88
        &&$("#uranus").offset().left<=$("#ship").offset().left+88){
            alert("uranus collision!");
            $("#solarSystem").css({top:-500,left:-1000});
    }

    if($("#saturn").offset().top>=$("#ship").offset().top-96
        &&$("#saturn").offset().top<=$("#ship").offset().top+50
        &&$("#saturn").offset().left>=$("#ship").offset().left-146
        &&$("#saturn").offset().left<=$("#ship").offset().left+60){
            alert("saturn collision!");
            $("#solarSystem").css({top:-500,left:-1000});
    }

    if($("#jupiter").offset().top>=$("#ship").offset().top-148
        &&$("#jupiter").offset().top<=$("#ship").offset().top+50
        &&$("#jupiter").offset().left>=$("#ship").offset().left-148
        &&$("#jupiter").offset().left<=$("#ship").offset().left+50){
            alert("jupiter collision!");
            $("#solarSystem").css({top:-500,left:-1000});
    }

    if($("#mars").offset().top>=$("#ship").offset().top-55
        &&$("#mars").offset().top<=$("#ship").offset().top+55
        &&$("#mars").offset().left>=$("#ship").offset().left-55
        &&$("#mars").offset().left<=$("#ship").offset().left+55){
            alert("mars collision!");
            $("#solarSystem").css({top:-500,left:-1000});
    }

    if($("#earth").offset().top>=$("#ship").offset().top-53
        &&$("#earth").offset().top<=$("#ship").offset().top+53
        &&$("#earth").offset().left>=$("#ship").offset().left-53
        &&$("#earth").offset().left<=$("#ship").offset().left+53){
            alert("earth collision!");
            $("#solarSystem").css({top:-500,left:-1000});
    }

    if($("#venus").offset().top>=$("#ship").offset().top-42
        &&$("#venus").offset().top<=$("#ship").offset().top+42
        &&$("#venus").offset().left>=$("#ship").offset().left-42
        &&$("#venus").offset().left<=$("#ship").offset().left+42){
            alert("venus collision!");
            $("#solarSystem").css({top:-500,left:-1000});
    }

    if($("#mercury").offset().top>=$("#ship").offset().top-50
        &&$("#mercury").offset().top<=$("#ship").offset().top+50
        &&$("#mercury").offset().left>=$("#ship").offset().left-50 
        &&$("#mercury").offset().left<=$("#ship").offset().left+50){
            alert("mercury collision!");
            $("#solarSystem").css({top:-500,left:-1000});
    }

    if($("#sun").offset().top>=$("#ship").offset().top-100
        &&$("#sun").offset().top<=$("#ship").offset().top+100
        &&$("#sun").offset().left>=$("#ship").offset().left-100
        &&$("#sun").offset().left<=$("#ship").offset().left+100){
            alert("You Win!");
            $("#solarSystem").css({top:-500,left:-1000});
    }
}


var t = 0;
var t2 = 0;
var t3 = 0;
var t4 = 0;
var t5 = 0;
var t6 = 0;
var t7 = 0;
var t8 = 0;

function moveit() {
    t += 0.1234;

    var r = 200;
    var xcenter = 118;
    var ycenter = 118;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t)));
    var newTop = Math.floor(ycenter + (r * Math.sin(t)));
    $('#mercury').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveit();
        detectIt();
    });
}

function moveitVenus() {
    t2 += 0.0534;

    var r = 300;
    var xcenter = 105.5;
    var ycenter = 105.5;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t2)));
    var newTop = Math.floor(ycenter + (r * Math.sin(t2)));
    $('#venus').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveitVenus();
    });
}

function moveitEarth() {
    t3 += 0.0412473;

    var r = 400;
    var xcenter = 100;
    var ycenter = 100;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t3)));
    var newTop = Math.floor(ycenter + (r * Math.sin(t3)));
    $('#earth').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveitEarth();
    });
}

function moveitMars() {
    t4 += 0.0314323;

    var r = 550;
    var xcenter = 99;
    var ycenter = 99;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t4)));
    var newTop = Math.floor(ycenter + (r * Math.sin(t4)));
    $('#mars').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveitMars();
    });
}

function moveitJupiter() {
    t5 += 0.0101294;

    var r = 800;
    var xcenter = 52.5;
    var ycenter = 52.5;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t5)));
    var newTop = Math.floor(ycenter + (r * Math.sin(t5)));
    $('#jupiter').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveitJupiter();
    });
}

function moveitSaturn() {
    t6 += 0.0201294;

    var r = 1050;
    var xcenter = 53.5;
    var ycenter = 79.5;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t6)));
    var newTop = Math.floor(ycenter + (r * Math.sin(t6)));
    $('#saturn').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveitSaturn();
    });
}

function moveitUranus() {
    t8 += 0.01294;

    var r = 1150;
    var xcenter = 80.5;
    var ycenter = 80.5;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t8)));
    var newTop = Math.floor(ycenter + (r * Math.sin(t8)));
    $('#uranus').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveitUranus();
    });
}

function moveitNeptune() {
    t7 += 0.00201294;

    var r = 1300;
    var xcenter = 82.5;
    var ycenter = 82.5;
    var newLeft = Math.floor(xcenter + (r * Math.cos(t7)));
    var newTop = Math.floor(ycenter + (r * Math.sin(t7)));
    $('#neptune').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveitNeptune();
    });
}



