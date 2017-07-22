// Makes score an integer
var score = 0;
var timer = 65;
// Modifies color of the lightsaber based on option clicked (default is blue)
// also highlights the option selected, and dehighlights the rest
var lightsaberColor = "#00ffff";
var laserColor = "#ff3346";
function changeColor(color){
    if (color == 'blue'){
        lightsaberColor = "#00ffff";
        laserColor = "#ff3346";
    }else if (color == 'green'){
        lightsaberColor = "#05B805";
        laserColor = "#ff3346";
    }else if (color == 'red'){
        lightsaberColor = "#ff0000";
        laserColor = "#00ffff";
    }
}
function changeBlue(){
		document.getElementById("blueSaber").style["opacity"] = "1";
		document.getElementById("redSaber").style["opacity"] = "0.5";
		document.getElementById("greenSaber").style["opacity"] = "0.5";
        lightsaberColor = "#00ffff";
        laserColor = "#ff3346";
}
function changeGreen(){
		document.getElementById("greenSaber").style["opacity"] = "1";
		document.getElementById("blueSaber").style["opacity"] = "0.5";
		document.getElementById("redSaber").style["opacity"] = "0.5";
		lightsaberColor = "#05B805";
        laserColor = "#ff3346";
} 
function changeRed(){
		document.getElementById("redSaber").style["opacity"] = "1";
		document.getElementById("blueSaber").style["opacity"] = "0.5";
		document.getElementById("greenSaber").style["opacity"] = "0.5";
		lightsaberColor = "#ff0000";
        laserColor = "#00ffff";
}
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Corridor(textureLoader){

	var corridor = new THREE.Object3D();

	var wallGeometry = new THREE.PlaneGeometry(100, 150);
	
	var wallTexture = textureLoader.load("/textures/wall_deathstar.jpg");
	wallTexture.wrapS = THREE.RepeatWrapping;
	wallTexture.wrapT = THREE.RepeatWrapping;
	wallTexture.repeat.set(5, 5);
	// Floor Material
	var wallMaterial = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		specular: 0xffffff,
		shininess: 5,
		shading: THREE.FlatShading,
		map: wallTexture
	});


	var ceilGeometry = new THREE.PlaneGeometry(100, 70);
	var ceilMaterial = new THREE.MeshBasicMaterial({color: "green"});

	var doorGeometry = new THREE.PlaneGeometry(70, 150);

	var doorTexture = textureLoader.load( "/textures/floor_metal.jpg" );
	doorTexture.wrapS = THREE.RepeatWrapping;
	doorTexture.wrapT = THREE.RepeatWrapping;
	doorTexture.repeat.set(5, 5);
	// Floor Material
	var doorMaterial = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		specular: 0xffffff,
		shininess: 5,
		shading: THREE.FlatShading,
		map: doorTexture
	});

	var wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
	wall1.position.set(20, 0, -35);

	var wall2 = wall1.clone();
	wall2.position.set(20, 0, 35);
	wall2.rotateY(Math.PI);

	var door = new THREE.Mesh(doorGeometry, doorMaterial);
	door.rotateY(Math.PI/2);
	door.position.set(-20, 0, 0);


	var ceil = new THREE.Mesh(ceilGeometry, ceilMaterial);
	ceil.rotateX(-Math.PI/2);
	ceil.position.set(-20, 50, 0);


	corridor.add(wall1, wall2, door, ceil);

	return corridor;
}
module.exports = Corridor;
    
},{}],2:[function(require,module,exports){
function Laser(){
	var laserGeometry = new THREE.CylinderGeometry(.9, .9, 4, 12);
	var laserMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.75, color: laserColor});
	var laser = new THREE.Mesh(laserGeometry, laserMaterial);
    laser.rotateZ(Math.PI/2);
	return laser;
}
module.exports = Laser;
    
},{}],3:[function(require,module,exports){
function Floor(textureLoader, renderer) {

	/* FLOOR */
	// Floor Texture
	var floorTexture = textureLoader.load( "/textures/floor_metal.jpg" );
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(75, 75);
	floorTexture.anisotropy = renderer.getMaxAnisotropy();

	// Floor Material
	var floorMaterial = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		specular: 0xffffff,
		shininess: 5,
		shading: THREE.FlatShading,
		map: floorTexture
	});

	// Floor Geometry
	var floorGeometry = new THREE.PlaneGeometry(500,500);
	floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI / 2;

	// return floor;
	return floor;
}
module.exports = Floor;
    
},{}],4:[function(require,module,exports){
function Hand(camera){
	/* HANDLE */
	var handGeometry = new THREE.CylinderGeometry(.7, .7, 6, 7);
	var handMaterial = new THREE.MeshBasicMaterial({color: "#545355"});
	hand = new THREE.Mesh(handGeometry, handMaterial);
	hand.position.set(15, 6, camera.position.z / 2);
	return hand;
}
module.exports = Hand;
    
},{}],5:[function(require,module,exports){
function Lightsaber(){
	/* LIGHTSABER MODEL */
	var lsGeometry = new THREE.CylinderGeometry(0.4, 0.4, 30, 20);
	var lsMaterial = new THREE.MeshBasicMaterial({ color: "white" });
	lightsaber = new THREE.Mesh( lsGeometry, lsMaterial );
	lightsaber.position.setY(15);
	var glowGeometry = new THREE.CylinderGeometry(0.5, 0.5, 30, 20);
	var glowMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.5, color: lightsaberColor});
	var glow = new THREE.Mesh(glowGeometry, glowMaterial);

	lightsaber.add(glow);
	return lightsaber;
}
module.exports = Lightsaber;
    
},{}],6:[function(require,module,exports){
function Sky(textureLoader){
	
	var skyGeometry = new THREE.SphereGeometry(10000, 10000, 25, 25);
	var skyMaterial = new THREE.MeshBasicMaterial({
		map: textureLoader.load('textures/floor_metal.jpg'),
		side: THREE.BackSide});
	var skyDome = new THREE.Mesh(skyGeometry, skyMaterial);
	skyDome.rotateY(-Math.PI/2);

	return skyDome;
}
module.exports = Sky;
    
},{}],7:[function(require,module,exports){
function Enemy_1(){
    /* ENEMY_1 MODEL */
    var enemy_1Geometry = new THREE.CylinderGeometry(.7, .7, 6, 7);
    var enemy_1Material = new THREE.MeshBasicMaterial({color: "#ffff00"});
    enemy_1 = new THREE.Mesh(enemy_1Geometry, enemy_1Material);
    enemy_1.position.set(15, -1000, 0);
    return enemy_1;
}
module.exports = Enemy_1;

},{}],8:[function(require,module,exports){
function Utils(){
	this.raycaster = new THREE.Raycaster();
	this.collidableMeshList = []; // All meshes raycaster cares about
	this.collidedMeshes = []; // UUIDs of meshes that have already been collided with
}

Utils.prototype.getRandomInRange = function(min, max){
	/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
	return Math.random() * (max - min) + min;
}

Utils.prototype.playAudio = function(audio){
	audio.play();
}

Utils.prototype.checkCollision = function(object, targetName, once, cb){
	/*
		Raycaster.
		Iterate through all vertices of an object. Cast a ray from its center to the outside.
		Ray will pick up all of its intersecting objects in raycaster.intersectObjects
		Check if the object picked up is the one we want, "targetName"
		FOR THIS PROJECT: We don't want to multi-count targets that may still be touching, so their UUIDs are cached and checked against
	*/

	if(!once){
		once = false;
	}
	for (var vertexIndex = 0; vertexIndex < object.geometry.vertices.length; vertexIndex++)
	{       
	    var localVertex = object.geometry.vertices[vertexIndex].clone();
	    var globalVertex = localVertex.applyMatrix4(object.matrixWorld)
	    var directionVector = globalVertex.sub( object.position );

	    this.raycaster.set( object.position, directionVector.clone().normalize() );
	    
	    var collisionResults = this.raycaster.intersectObjects( this.collidableMeshList );
	    
	    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
	    {
	    	var result = collisionResults[0].object;

	    	if(result.name==targetName){
	    		
	    		if(once){
	    			for(var i=0; i< this.collidedMeshes.length; i++){
		    			var uuid = this.collidedMeshes[i];
		    			if(result.uuid==uuid){
		    				return;
		    			}
	    			}
	    			
	    			this.collidedMeshes.push(result.uuid);
	    		}
	    		cb(result);
	    	}
	    }
	}
}


Utils.prototype.cameraLookDir =  function(camera) {
	/* http://stackoverflow.com/a/17286752/896112 */
    var vector = new THREE.Vector3(0, 0, -1);
    vector.applyEuler(camera.rotation, camera.rotation.order);
    return vector;
}

Utils.prototype.debugAxes = function(axisLength, scene){
    // Shorten the vertex function
    function v(x,y,z){ 
            return new THREE.Vector3(x,y,z); 
    }
    
    // Create axis (point1, point2, colour)
    function createAxis(p1, p2, color){
            var line, lineGeometry = new THREE.Geometry(),
            lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            scene.add(line);
    }
    
    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
};

var u = new Utils();

module.exports = u;
},{}],9:[function(require,module,exports){

var socket = io();

var scene,
	width,
	height,
	camera,
	renderer,
	stereo,
	clock,
	textureLoader,
	controls,
	orbitControls,
	container,
	domElement,
	hand,
	laser,
	lasers,
	lightsaber,
	floor,
	corridor,
	soundDir,
	started,
    enemy_1;


var Sky = require('../../assets/Sky');
var Floor = require('../../assets/Floor');
var Corridor = require('../../assets/Corridor');
var Hand = require('../../assets/Hand');
var Lightsaber = require('../../assets/Lightsaber');
var Laser = require('../../assets/Laser');
var Enemy_1 = require('../../assets/Enemy_1');
var Utils = require('./utils');

function init(){
	started = false;
	width = window.innerWidth;
	height = window.innerHeight;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, width / height, 0.001, 20000);
	renderer = new THREE.WebGLRenderer();
	stereo = new THREE.StereoEffect(renderer);
	clock = new THREE.Clock();
	textureLoader = new THREE.TextureLoader();
	renderer.setSize( window.innerWidth, window.innerHeight);
	camera.lookAt(0, 0, 0);
	camera.position.set(0, 15, 0);

	scene.add(camera);
	
	container = document.getElementById("container");
	domElement = renderer.domElement;

	orbitControls = new THREE.OrbitControls(camera, domElement);

	orbitControls.target.set(
		camera.position.x+0.15,
		camera.position.y,
		camera.position.z
	);

	orbitControls.noPan = true;
	orbitControls.noZoom = true;
	
	if(isMobile){
		controls = new DeviceOrientationController(camera, renderer.domElement);
		controls.connect();
	}
    //Hide the landing page, display timer and score
	$('.landing').fadeOut(100);
	$('.confirm-button').fadeOut(100);
    //Count down every second for timer
    setTimeout(function(){
        setInterval(function(){
            if (timer > 0){
                timer--;
                document.getElementById("timer").innerHTML = timer;

                // hide intro message at certain time
                if (timer == 60){
                    $("#timer").fadeIn(500);
                    $("#timertitle").fadeIn(500);
                    $("#score").fadeIn(500);
                    $("#scoretitle").fadeIn(500);
                    $("#introMessage").fadeOut(500);
                } else if(timer == 0){
                    // play outro message at end of timer
                    playoutroMessage();
                }
            }
        },1000);
    },5000);
	container.appendChild(domElement);
	domElement.addEventListener('click', fullscreen, false);
	setupScene();
}

function setupScene(){

	lasers = []; // Keep lasers in here so we can manipulate them in update()
	
	var sky = new Sky(textureLoader);
	console.log(sky);
	scene.add(sky);

	floor = new Floor(textureLoader, renderer);
	scene.add(floor);

	corridor = new Corridor(textureLoader);
	scene.add(corridor);

	// Compound object from parent to child: Camera -> Hand -> Lightsaber -> Glow
	hand = new Hand(camera);
	lightsaber = new Lightsaber();
	hand.add(lightsaber);

	Utils.collidableMeshList.push(lightsaber);

	/* LIGHTING */
	lightAngle = new THREE.PointLight(0x999999, 1, 500);
	lightAngle.position.set(0,50,0);
	scene.add(lightAngle);

	// AXIS
	var axis = new THREE.AxisHelper(200);
    // scene.add(axis);
    
    scene.add(hand);

    enemy_1 = new Enemy_1();
    scene.add(enemy_1);

    requestAnimationFrame(animate);

    // Show intro message
    playintroMessage();

}

// Intro message function
function playintroMessage() {
    $("#introMessage").fadeIn(500);
}

// Outro message function
function playoutroMessage(){
    $("#outroMessage").fadeIn(1000);
    $(".gameView").fadeOut(1000);
}

function setupGame() {
	scene.add(hand);
	laser = new Laser();
	window.addEventListener('deviceorientation', setOrientationControls, true);
	// Every 1.5 seconds, spawn a new laser  at random position and set its velocity to -1, to come at the player
	window.setInterval(function(){
		var newLaser = laser.clone();
		newLaser.position.set(200, Utils.getRandomInRange(5, 25), Utils.getRandomInRange(-10, 10));
		newLaser.name = "laser";
		newLaser.velocity = new THREE.Vector3(-1.2, 0, 0);
		lasers.push(newLaser);
		Utils.collidableMeshList.push(newLaser);
		scene.add(newLaser);
	}, Math.floor((Math.random() * 200) + 900));
}

function fullscreen() {
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }
}

function setOrientationControls(e){
    if(!e.alpha){
        return;
    }
    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();
    window.removeEventListener('deviceorientation', setOrientationControls, true);
}

/* UTILS */
function setObjectQuat(object, data) {
	
	/* Degrees to radians */
	var gammaRotation = data.g ? data.g * (Math.PI / 180): 0;
	var betaRotation = data.b ? data.b * (Math.PI / 180) : 0;
	var alphaRotation = data.a ? data.a * (Math.PI / 180): 0;
	var alpha, beta, gamma, betaMax, betaMin;
	var euler = new THREE.Euler();
	
	beta = betaRotation;
	gamma = gammaRotation;
	alpha = alphaRotation;

	/*
		- [BUG] beta jumps to 180 - theta or theta - 180
		
		x = rcos(theta)
		y = rsin(theta)
		beta - Math.PI/2 because we are still dealing with device in upright position
		Added 10 to both to offset the hand in front of the camera
		object.position.z = Math.cos(beta - Math.PI/2) -  10;
		object.position.y = 5 * Math.sin(beta - Math.PI/2) + 10;
	*/
	/*	beta - Math.PI/2 because rotations on z-axis are made when device is in upright position 
		-gamma because of the way the lightsaber is facing the camera
	*/

	euler.set(0, -gamma, beta - Math.PI/2);

	/* Using quaternions to combat gimbal lock */ 
	object.quaternion.setFromEuler(euler);
}

/* RENDER */

function resize() {
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
  stereo.setSize(newWidth, newHeight);
}

function animate(){
	var elapsedSeconds = clock.getElapsedTime();
	requestAnimationFrame(animate);
	update(clock.getDelta());
	if(isMobile){
		stereo.render(scene, camera);
	}else{
		renderer.render(scene, camera);
	}
}

function update(dt){
  resize();
  camera.updateProjectionMatrix();  
  orbitControls.update(dt);

  var cameraDir = Utils.cameraLookDir(camera);

  if(Math.abs(1 - cameraDir.x) < 0.01 && !started) {
  	setupGame();
  	started = true;
  }
// stores urls of all hit sounds
var hitSounds = ["/sounds/hit1.wav", "/sounds/hit2.wav", "/sounds/hit3.wav", "/sounds/hit4.wav"];

// Check collision with lightsaber and laser at every iteration
// ALSO updates "score" to document each time laser is hit
Utils.checkCollision(lightsaber.children[0], "laser", true, function(result){
  	if(result){
  		socket.emit('sendhit');
  		result.velocity = new THREE.Vector3(1, 0, 0);
  		score++;
  		document.getElementById("score").innerHTML = score;
        // play random hit sound when deflecting
        var hitSound = new Audio(hitSounds[Math.floor(Math.random() * 4)]);
        hitSound.play();
  	}
  });

  // Apply velocity vector to laser, check if they are out of bounds to remove them
  for(var i=0; i<lasers.length; i++){
  	var e = lasers[i];
  	e.position.add(e.velocity);
  	if(e.position.x < -10 || e.position.x > 200){
  		scene.remove(e);
  		lasers.splice(i, 1);
  	}

  }

  if(isMobile) {
  	controls.update();
  }

}

$(document).ready(function(){
	$('.confirm-button').click(function(){
		init();
		animate();
	});
});

// initiates powerAttack_1
function init_powerAttack_1(){
    console.log("Initiated powerAttack_1");
    // debug test to see if lasers can used globally
    console.log(lasers);
}

/* SOCKET.IO */

socket.emit('viewerjoin', {room: roomId});

socket.on('beginsetup', function(data){
	// change display
});

socket.on('setupcomplete', function(data){
	$('.confirm-button').show();
//  $('#room-link').hide();
//  $('#qrcode').hide();
	socket.emit('viewready');
});

// initiates game
socket.on('beginGame', function(data){
    console.log("Game has Begun");
    // changes lightsaberColor to selected
    changeColor(data.color);
    init();
    animate();
});

socket.on('updateorientation', function(data){
	if(hand){
		setObjectQuat(hand, data);
	}
});

// initiates powerAttack_1
socket.on('init_powerAttack_1', function(data){
    init_powerAttack_1();
});

socket.on('updatemotion', function(data){
});
},{"../../assets/Corridor":1,"../../assets/Laser":2,"../../assets/Floor":3,"../../assets/Hand":4,"../../assets/Lightsaber":5,"../../assets/Sky":6,"../../assets/Enemy_1":7,"./utils":8}]},{},[9]);
