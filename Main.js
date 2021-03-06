  //Everybody contributed

  // Globals
  /*const FPS = 30;
  const screenUpdateTime = 1000/FPS;*/
  //IE does not support const, so must use var
  var FPS = 30;
  var screenUpdateTime = 1000/FPS;
  var playerspeed = 400;

  // Canvas
  var canvas;
  var ctx;
  var logDiv;

  // Objects
  var logger = new Logger();
  var room = new Room();  //main object encapsulating other objects
  var math = new Maths();
  var renderingEngine = new Renderer();
  var physicsEngine = new Physics();
  var debugMode = false;
  var player = new Bob(new Point(500,380),40,40);
  var hollywoodCounter = 0;

  var boundcheck = new Boundcheck();
  var ai = new AI();
  var pathfinding = new Pathfinding();
  var gridvacancy = new Gridvacancy();
  var start_time = Date.now()  // When the game starts

//function called in index
  function init(){

    //the different canvas
    logDiv = document.getElementById('logger');
    canvas = document.getElementById('gameCanvas');
    gcanvas=document.getElementById('graphCanvas');
    //hudCanvas = document.getElementById('hudCanvas');
    //sideCanvas = document.getElementById('sideCanvas');
    //we don't need canvas for the side and header - can use HTML <section> - Jensen

    /*

    if (hudCanvas.getContext){
      hudCtx = hudCanvas.getContext('2d');
    } */

    /*
    if (sideCanvas.getContext){
      sideCtx = sideCanvas.getContext('2d');
    }    */
    //we don't need canvas for the side - can use HTML <section> - Jensen
   // var distance =math.getDistanceBetweenTwoPoints(bees[0].Intrinsic.centerPoint,player.Intrinsic.centerPoint);

    if (canvas.getContext){
      ctx = canvas.getContext('2d');





      renderingEngine.drawRoom();

      //update points in renderer
      setInterval(function () {renderingEngine.updatePoints(start_time);}, screenUpdateTime); // (HONG SHING) Added in start time so that mysterybox will know how much time has elapsed
      setInterval(function () {renderingEngine.draw();}, screenUpdateTime);

      // Update the game clock
      //setInterval(function () {renderingEngine.update_timer();}, screenUpdateTime);
    }

    document.addEventListener('keydown', function(event) {

           var playerrow = pathfinding.getObjectIndexRow(player);
           var playercol = pathfinding.getObjectIndexCol(player);
           var trackActiveWeapon = 0;
           var activeWeapon = trackActiveWeapon%3; // three types of weapons
           var mb = room.getmysterybox();
           var health = room.getHealth();

           // Press 1,2,3 to switch weapon ~ jensen
           if(event.keyCode == 49) {
                if(player.hasBombEquipped) {
                    player.Intrinsic.attackcolor = 'aqua';  
                    player.activeWeapon = 'Bomb';
                    document.getElementById("active-weapon").innerHTML = 'Bomb';
                }
                    
           }

           if(event.keyCode == 50) {
                if(player.hasKnifeEquipped){
                    player.Intrinsic.attackcolor = 'grey';    
                    player.activeWeapon = 'Knife';
                    document.getElementById("active-weapon").innerHTML = 'Knife';
                }
                    
           }

           if(event.keyCode == 51) {
                if(player.hasShurikenEquipped){
                  player.Intrinsic.attackcolor = 'red';    
                  player.activeWeapon = 'Shuriken';
                  document.getElementById("active-weapon").innerHTML = 'Shuriken';
                }
                    
           }

           // Press z to use Active Weapon ~ jensen
           if(event.keyCode == 90) {
                

                switch(player.activeWeapon)
                {
                  case 'Knife':
                      player.usingKnife();
                      break;
                  case 'Bomb':
                      player.usingBomb(playerrow, playercol);
                      break;
                  case 'Shuriken':
                     player.usingShuriken();
                    break;
                  default:
                      player.usingPunch();
                      break;

                }
                hollywoodCounter=0;

           }

           // Press up down left right to move Bob
          if(event.keyCode == 37) {
            //go left
            if(playercol != 0)
            {
              physicsEngine.applyForceAtAngle(player,0,Math.PI);
            if(playercol - 1 == mb.cellpos.x && playerrow == mb.cellpos.y) // This is to check if there is a mysterybox, if so, unlock instead of moving into it
              mb.unlock_mysteryBox(room, start_time);
            else
            {
            if(!room.map[playerrow][playercol-1].occupied)
              physicsEngine.applyForceAtAngle(player,playerspeed,Math.PI);
            if(room.map[playerrow][playercol-1].isWeapon) {
              ai.pickedUpWeapon(playerrow, playercol-1);
            }
            if(playercol-1 == health.cellpos.x && playerrow == health.cellpos.y) // This is to check if there is health next to the player (Hong Shing)
            {
              player.heal(health.healing);  // Adds health.healing(in health.js) to the players hp
              health.destroyHealth();       // Removes the health from the screen
            }
            }
            }
          }//end if(event.keyCode == 37)
          if(event.keyCode == 39) {
            //go right
            if(playercol != room.columns-1)
            {
              physicsEngine.applyForceAtAngle(player,0,0);
            if(playercol + 1 == mb.cellpos.x && playerrow == mb.cellpos.y)
              mb.unlock_mysteryBox(room, start_time);
            else
            {
            if(!room.map[playerrow][playercol+1].occupied)
            physicsEngine.applyForceAtAngle(player,playerspeed,0);
            if(room.map[playerrow][playercol+1].isWeapon) {
              ai.pickedUpWeapon(playerrow, playercol+1);
            }
            if(playercol + 1 == health.cellpos.x && playerrow == health.cellpos.y)
            {
              player.heal(health.healing);
              health.destroyHealth();
            }
            }
            }
          }//end if(event.keyCode == 39)
          if(event.keyCode == 38) {
            //go up
            if(playerrow != 0)
            {
              physicsEngine.applyForceAtAngle(player,0,Math.PI*3/2);
            if(playercol == mb.cellpos.x && playerrow - 1 == mb.cellpos.y)
              mb.unlock_mysteryBox(room, start_time);
            else
            {
            if(!room.map[playerrow-1][playercol].occupied)
            physicsEngine.applyForceAtAngle(player,playerspeed,Math.PI*3/2);
            if(room.map[playerrow-1][playercol].isWeapon) {
              ai.pickedUpWeapon(playerrow-1, playercol);
            }
            if(playercol == health.cellpos.x && playerrow - 1 == health.cellpos.y)
            {
              player.heal(health.healing);
              health.destroyHealth();

            }
            }
            }
          }//end if(event.keyCode == 38)
          if(event.keyCode == 40) {
            //go down
            physicsEngine.applyForceAtAngle(player,0,Math.PI/2);
            if(playerrow != room.rows-1)
            {
            if(playercol == mb.cellpos.x && playerrow + 1 == mb.cellpos.y)
              mb.unlock_mysteryBox(room, start_time);
            else
            {
            if(!room.map[playerrow+1][playercol].occupied)
            physicsEngine.applyForceAtAngle(player,playerspeed,Math.PI/2);
            if(room.map[playerrow+1][playercol].isWeapon) {
              ai.pickedUpWeapon(playerrow+1, playercol);
            }
            if(playercol == health.cellpos.x && playerrow + 1 == health.cellpos.y)
            {
              player.heal(health.healing);
              health.destroyHealth();
            }
            }
            }
          }//end if(event.keyCode == 40)
        } 
    );///end addEventListener


  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
              window.setTimeout(callback, 1000 / 1);
            };
          })();
  // usage:
  // instead of setInterval(render, 16) ....
  (function animloop(){
    requestAnimFrame(animloop);
    //what to render here
//    renderingEngine.updatePoints();
//    renderingEngine.draw();
  })();





  }
