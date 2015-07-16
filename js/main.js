var _stage;
var _gameOver
var _ship;
var _mercury;
var _venus;
var _earth;
var _mars; 
var _jupiter;
var _saturn;
var _uranus;
var _neptune; 
var _space;
var _loadQueue; 
var context;
var hitTest;
var sound;
var data;
var animation1;
var _loadManifestPreload =[{id : "earthPreload", src : "../images/earth2.png"}];
var _loadManifest = [ 
    {id : "ship", src : "../images/ship.png"}, 
    {id : "mercury", src : "../images/mercury2.png"},
    {id : "venus", src : "../images/venus2.png"},
    {id : "earth", src : "../images/earth2.png"},
    {id : "mars", src : "../images/mars2.png"},
    {id : "jupiter", src : "../images/jupiter2.png"}, 
    {id : "saturn", src : "../images/saturn2.png"},
    {id : "uranus", src : "../images/uranus2.png"},
    {id : "neptune", src : "../images/neptune2.png"},
    {id : "space", src : "../images/space.png"},
    {id : "gameOver", src : "../images/gameOver.png"},
    {id : "explosion", src: "../images/explosion.png"},
    {id : "win", src: "../images/win.png"},
	{id : "instructions", src: "../images/instructions.png"}
];

var _planetsT = [];


var gameDone=false;
var textScore;
var textLoad;
   

    

$(document).ready(function() {
	
	//_loadQueuePreload = new createjs.LoadQueue();
	//_loadQueuePreload.loadManifest(_loadManifestPreload)
	
	
	_stage = new createjs.Stage("canvasStage"); 
    var gameCanvas = document.getElementById("canvasStage");
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
	
	createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", _stage);

	
	_earthPreload = new createjs.Container();
    var earthPreloadImg = new createjs.Bitmap("../images/earth2.png");
    _earthPreload.addChild(earthPreloadImg);
	_planetsT["earthPreload"] = 0;
	earthPreloadImg.x = -earthPreloadImg.image.width / 2;
    earthPreloadImg.y = -earthPreloadImg.image.height / 2;
    var earthPreloadx = earthPreloadImg.x / 2
    var earthPreloady = earthPreloadImg.y / 2 
    _earthPreload.x = -500;
    _earthPreload.y = -500;
	
	
	_loadQueue = new createjs.LoadQueue();
	_loadQueue.loadManifest(_loadManifest)
	textLoad = new createjs.Text(Math.round(_loadQueue.progress*100), "50px Arial", "#ffffff");
 	textLoad.x = 100;
	textLoad.y = 100
 	textLoad.textBaseline = "alphabetic";
	
	
	
	$(_earthPreload).animate({}, 1000, function(){
		moveitPreload(.02, 100, window.innerWidth/2, window.innerHeight/4, _earthPreload, "earthPreload")
		_stage.addChild(_earthPreload)
		_stage.addChild(textLoad);
		
		
		
		_loadQueue.on("progress", function() {
    		console.log("Progress:", Math.round(_loadQueue.progress*100));
			_earthPreload.scaleX= 1-_loadQueue.progress;
			_earthPreload.scaleY= 1-_loadQueue.progress;
			if(Math.round(_loadQueue.progress*100)>=100){
				//_stage.removeChild(_earthPreload);
				console.log("finished");
				textScore = new createjs.Text("Score:" + 0, "50px Arial", "#ffffff");
				textScore.x = 100;
				textScore.y = 100
				textScore.textBaseline = "alphabetic";

				//animation();
				loadAssets();
				document.getElementById('song').play();
				window.addEventListener("resize", resizeGame, false);
				window.addEventListener("orientationchange", resizeGame, false);
			}

		});
	
	});
	
		//$(_earthPreload).animate({ y:-100, x: window.innerWidth/2, scaleX:.5, scaleY:.5 }, 3000, function(){
			//_stage.removeChild(_earthPreload)
			//animation();
		//});
	
	
    
	
});


function resizeGame(){
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    var gameCanvas = document.getElementById("canvasStage");
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;
}

function loadAssets(){
    _loadQueue.addEventListener("complete", loadComplete);
}

function loadComplete(){
	_loadQueue.removeEventListener("complete", loadComplete);
	animation();
}

function animation(){
	console.log("1");
    _space = new createjs.Container();
    var spaceImg = new createjs.Bitmap(_loadQueue.getResult("space"));
    _space.addChild(spaceImg);
    _stage.addChild(_space);
	console.log("2");
    _ship2 = new createjs.Container();
    _ship2.scaleX = 0.5;
    _ship2.scaleY = 0.5;
    _ship2.x = window.innerWidth/2;
    _ship2.y = window.innerHeight;
	console.log("3");
    var ship2Img = new createjs.Bitmap(_loadQueue.getResult("ship"));
    ship2Img.x = -ship2Img.image.width / 2;
    ship2Img.y = -ship2Img.image.height / 2;
    var ship2x = ship2Img.x / 2
    var ship2y = ship2Img.y / 2  
    console.log("4");
    _ship2.addChild(ship2Img);
    _stage.addChild(_ship2);
	console.log("move it space from within animation");
     moveitSpace();
	console.log("5");
	_instructions = new createjs.Container();
    var instructionsImg = new createjs.Bitmap(_loadQueue.getResult("instructions"));
    _instructions.addChild(instructionsImg);
    _stage.addChild(_instructions);
	instructionsImg.x = -instructionsImg.image.width / 2;
    instructionsImg.y = -instructionsImg.image.height / 2;
	_instructions.x = window.innerWidth/2;
    _instructions.y = (window.innerHeight)/2;
	console.log("6");
    
    $(_ship2).animate({ y:window.innerHeight/2, x: window.innerWidth/2 }, 3000, function(){
		_stage.removeChild(_instructions)
        initiateGame();
		console.log("7");
    });
	console.log("8");
    
   
}


function initiateGame(){
    //_space = new createjs.Container();
    //var spaceImg = new createjs.Bitmap(_loadQueue.getResult("space"));
    //_space.addChild(spaceImg);
	
	
	_win = new createjs.Container();
    var winImg = new createjs.Bitmap(_loadQueue.getResult("win"));
    _win.addChild(winImg);
	winImg.x = -winImg.image.width / 2;
    winImg.y = -winImg.image.height / 2;
    var gameOverx = winImg.x / 2
    var gameOvery = winImg.y / 2 
    _win.x = window.innerWidth/2;
    _win.y = window.innerHeight/2;

    
    _stage.removeChild(_ship2);
    
    _gameOver = new createjs.Container();
    var gameOverImg = new createjs.Bitmap(_loadQueue.getResult("gameOver"));
    _gameOver.addChild(gameOverImg);
    gameOverImg.x = -gameOverImg.image.width / 2;
    gameOverImg.y = -gameOverImg.image.height / 2;
    var gameOverx = gameOverImg.x / 2
    var gameOvery = gameOverImg.y / 2 
    _gameOver.x = window.innerWidth/2;
    _gameOver.y = window.innerHeight/2;

    
    _solarSystem = new createjs.Container();
    


    _ship = new createjs.Container();
    _ship.scaleX = 0.5;
    _ship.scaleY = 0.5;
    _ship.x = window.innerWidth/2;
    _ship.y = (window.innerHeight)/2+500;

    var shipImg = new createjs.Bitmap(_loadQueue.getResult("ship"));
    shipImg.x = -shipImg.image.width / 2;
    shipImg.y = -shipImg.image.height / 2;
    var shipx = shipImg.x / 2
    var shipy = shipImg.y / 2  
    
    _ship.addChild(shipImg);

    
    _mercury = new createjs.Container();
    var mercuryImg = new createjs.Bitmap(_loadQueue.getResult("mercury"));
    _planetsT["mercury"] = 0;
    
    
    _venus = new createjs.Container();
    var venusImg = new createjs.Bitmap(_loadQueue.getResult("venus"));
    _planetsT["venus"] = 0;
    
    
    _earth = new createjs.Container();
    var earthImg = new createjs.Bitmap(_loadQueue.getResult("earth"));
    _planetsT["earth"] = 0;
   
    
    _mars = new createjs.Container();
    var marsImg = new createjs.Bitmap(_loadQueue.getResult("mars"));
    _planetsT["mars"] = 0;
    

    _jupiter = new createjs.Container();
    var jupiterImg = new createjs.Bitmap(_loadQueue.getResult("jupiter"));
    _planetsT["jupiter"] = 0;
    
    
    _saturn = new createjs.Container();
    var saturnImg = new createjs.Bitmap(_loadQueue.getResult("saturn"));
    _planetsT["saturn"] = 0;
    
    
    _uranus = new createjs.Container();
    var uranusImg = new createjs.Bitmap(_loadQueue.getResult("uranus"));
    _planetsT["uranus"] = 0;
    
    
    _neptune = new createjs.Container();
    var neptuneImg = new createjs.Bitmap(_loadQueue.getResult("neptune"));
    _planetsT["neptune"] = 0;
    
    _wormHole = new createjs.Container();
    var wormHoleImg = new createjs.Bitmap(_loadQueue.getResult("wormHole"));
    _wormHole.addChild(wormHoleImg);
    //_stage.addChild(_wormHole)
	
	_stage.addChild(textScore);
    

   //==================================brainOfGame============================================== 
    //_stage.addChild(_space);
    _stage.addChild(_solarSystem);
    
    
    var data = {
    images: [_loadQueue.getResult("explosion")],
    frames: {width:100, height:100},
    animations: {run:[0,74]}
    };
    var spriteSheet= new createjs.SpriteSheet(data);
    animation1 = new createjs.Sprite(spriteSheet);
    animation1.gotoAndPlay("run");
	animation1.x = this._ship.x-50;
    animation1.y = this._ship.y-50;
    
    _ship.addEventListener("pressmove", handleClick);
    function handleClick(event){
        event.currentTarget.x=event.stageX;
        event.currentTarget.y=event.stageY-tSolarSystem;        
        animation1.x = this._ship.x-50;
        animation1.y = this._ship.y-50;
    }
	
	
	
    _solarSystem.addChild(_ship);
    
    createPlanet(_mercury, mercuryImg, .0042314, 500, "mercury");
    createPlanet(_venus, venusImg, .0062123, 1000, "venus");
    createPlanet(_earth, earthImg, .008123, 1500, "earth");
    createPlanet(_mars, marsImg, .01123, 2000, "mars");
    createPlanet(_jupiter, jupiterImg, .01323, 2500, "jupiter");
    createPlanet(_saturn, saturnImg, .01523, 3000, "saturn");
    createPlanet(_uranus, uranusImg, .01723, 3500, "uranus");
    createPlanet(_neptune, neptuneImg, .02123, 4000, "neptune");
   
    moveitSolarSystem(1);
	
	
    
    
}


function cleanUp(){
	_stage.removeAllChildren();
	_ship.removeAllEventListeners();
	window.removeEventListener("resize", resizeGame, false);
	window.removeEventListener("orientationchange", resizeGame, false);
	location.reload();
	gameDone=false;
	//animation();
	console.log("clean")
}


function createPlanet(planetContainer, planetImg, speed, radius, id){  
    planetImg.x = -planetImg.image.width / 2;
    planetImg.y = -planetImg.image.height / 2;
    planetContainer.addChild(planetImg);
    _solarSystem.addChild(planetContainer);
    planetContainer.x=-500;
    //console.log(id + "create Planet");
    moveitPlanet(speed, radius, window.innerWidth / 2, window.innerHeight / 2, planetContainer, id);
}


var tspace=-333;
function moveitSpace(){
    tspace += 3;
	if(gameDone==false){
		textScore.text = "Score:" + (tSolarSystem + 500);
	}
    //console.log(tspace);
    $(_space).animate({ y:tspace, }, 1, function(){
		console.log("moveitSpace within space move it");
        moveitSpace();
    });
    if( tspace == 0 ){
        tspace=-333;
    }
	console.log("space get outta the way");
	if(gameDone==true){
			window.setTimeout( cleanUp, 5000);
			gameDone=false;
			console.log("squeaky clean");
	}
}


var tSolarSystem=-500;
function moveitSolarSystem(systemSpeed){
    tSolarSystem += systemSpeed;
	//_stage.removeChild(text);
    //console.log(tSolarSystem);
    $(_solarSystem).animate({ y:tSolarSystem, }, 1, function(){
        moveitSolarSystem(systemSpeed);
    });
    //console.log(hitTest);
    //console.log("window", window.innerHeight);
    // console.log("ship", _ship.y+tSolarSystem)
    if(_ship.y+tSolarSystem>=window.innerHeight && gameDone==false){
    _stage.addChild(_gameOver);
		console.log("gameOver2")
    _stage.removeChild(_solarSystem);
    _solarSystem.removeChild(animation1);
	gameDone=true;
	console.log("goteeem")
    }
	if(tSolarSystem==5000 && gameDone==false){
		_ship.removeAllEventListeners();
		_stage.addChild(_win);
		//collisionTest().remove();
		gameDone=true;
		$(_ship).animate({
            y: -500,
    	}, 1500, function(){
			_stage.removeChild(_solarSystem);
			gameDone=true;
		});
		gameDone=true;
	}
    
}


function moveitPreload(time, radius, x, y, planet, id) {
    _planetsT[id] += time;
    //console.log(id, _planetsT[id]);

    var r = radius;
    var xcenter = x;
    var ycenter = y;
    var newLeft = Math.floor(xcenter + (r * Math.cos(_planetsT[id])));
    var newTop = Math.floor(ycenter + (r * Math.sin(_planetsT[id])));
    $(planet).animate({
        y: newTop,
        x: newLeft,
    }, 1, function() {
        moveitPreload(time, radius, x, y, planet, id);
		textLoad.text = Math.round(_loadQueue.progress*100) + "%";
    });
}

function moveitPlanet(time, radius, x, y, planet, id) {
    _planetsT[id] += time;
    //console.log(id, _planetsT[id]);

    var r = radius;
    var xcenter = x;
    var ycenter = y;
    var newLeft = Math.floor(xcenter + (r * Math.cos(_planetsT[id])));
    var newTop = Math.floor(ycenter + (r * Math.sin(_planetsT[id])));
    $(planet).animate({
        y: newTop,
        x: newLeft,
    }, 1, function() {
        moveitPlanet(time, radius, x, y, planet, id);
		if(gameDone==false){
        	collisionTest(planet,_ship);
		}
    });
}

		function collisionTest(object1, object2){
			if (object1.x < object2.x + object2.getBounds().width  && object1.x + object1.getBounds().width-100  > object2.x &&
				object1.y < object2.y + object2.getBounds().height && object1.y 
				+ object1.getBounds().height-100 > object2.y) {
				_stage.addChild(_gameOver);
				_ship.removeAllEventListeners();
				_solarSystem.addChild(animation1);
				gameDone=true;
				document.getElementById('explosion').play()
				$(_ship).animate({
					y: window.innerHeight-tSolarSystem,
				}, 1500);
				$(animation1).animate({
					y: window.innerHeight-tSolarSystem,
				}, 1500, function(){
					_solarSystem.removeChild(_ship);
					_solarSystem.removeChild(animation1);
				});
			}//inner if
		}//collision Test








