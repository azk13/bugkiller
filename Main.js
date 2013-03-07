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

  var hudCanvas;
  var hudCtx;

  var sideCanvas;
  var sideCtx;

  // Objects
  var logger = new Logger();
  var room = new Room();  //main object encapsulating other objects
  var math = new Maths();
  var renderingEngine = new Renderer();
  var physicsEngine = new Physics();
  var debugMode = false;
  var hud = new HUD();
  var player = new Bob(new Point(500,380),40,40);

  var boundcheck = new Boundcheck();
  var ai = new AI();
  var pathfinding = new Pathfinding();
  var gridvacancy = new Gridvacancy();


//function called in index
  function init(){

    //the different canvas
    logDiv = document.getElementById('logger');
    canvas = document.getElementById('gameCanvas');
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


    if (canvas.getContext){
      ctx = canvas.getContext('2d');

      //initial draw
      renderingEngine.drawRoom();

      //update points in renderer
      setInterval(function () {renderingEngine.updatePoints();}, screenUpdateTime);
      setInterval(function () {renderingEngine.draw();}, screenUpdateTime);

      // Update the game clock
      setInterval(function () {renderingEngine.update_timer();}, screenUpdateTime);
    }

    document.addEventListener('keydown', function(event) {

           var playerrow = pathfinding.getObjectIndexRow(player);
           var playercol = pathfinding.getObjectIndexCol(player);
           var trackActiveWeapon = 0;
           var activeWeapon = trackActiveWeapon%3; // three types of weapons
           var mb = room.getmysterybox();

           // Press 1,2,3 to switch weapon
           if(event.keyCode == 49) {
                if(player.hasBombEquipped) {
                    player.activeWeapon = 'Bomb';
                    document.getElementById("active-weapon").innerHTML = 'Bomb';
                }
                    
           }

           if(event.keyCode == 50) {
                if(player.hasKnifeEquipped){
                    
                    player.activeWeapon = 'Knife';
                    document.getElementById("active-weapon").innerHTML = 'Knife';
                }
                    
           }

           if(event.keyCode == 51) {
                if(player.hasShurikenEquipped){
                  player.activeWeapon = 'Shuriken';
                  document.getElementById("active-weapon").innerHTML = 'Shuriken';
                }
                    
           }

           // Press Shift to use Active Weapon
           if(event.keyCode == 16) {
              
                switch(player.activeWeapon)
                {
                  case 'Knife':
                      console.log('use knife');
                      player.knifeHealth -= 20;
                      document.getElementById("knife-health").style.width= player.knifeHealth + '%';
                      if(player.knifeHealth <= 0) {
                        player.hasKnifeEquipped = false;
                        document.getElementById("knife-picked").innerHTML = 0;
                        document.getElementById("active-weapon").innerHTML = 'none';
                        player.activeWeapon = 'null';

                      }
                      break;
                  case 'Bomb':
                      console.log('place bomb');
                      player.bombHealth -= 100;
                      weapons[weapons.length] = new Weapon(new Point(room.map[playerrow][playercol].point.x, room.map[playerrow][playercol].point.y), weapons.length, 'Attack', 'Bomb');
                      room.map[playerrow][playercol].isWeapon = true;
                      //weapons[weapons.length].Intrinsic.cellpos.x = playerrow;
                      //weapons[weapons.length].Intrinsic.cellpos.y = playercol;           

                      // load weapon object in the cell
                      room.map[playerrow][playercol].weapon = weapons[weapons.length];


                      document.getElementById("bomb-health").style.width= player.bombHealth + '%';
                      if(player.bombHealth <= 0) {
                        player.hasBombEquipped = false;
                        document.getElementById("bomb-picked").innerHTML = 0;
                        document.getElementById("active-weapon").innerHTML = 'none';
                        player.activeWeapon = 'null';
                      }
                      break;
                  case 'Shuriken':
                      player.shurikenHealth -=20;
                      document.getElementById("shuriken-health").style.width= player.shurikenHealth + '%';
                      console.log('shoot Shuriken');
                      if(player.shurikenHealth <= 0) {
                        player.hasShurikenEquipped = false;
                        document.getElementById("shuriken-picked").innerHTML = 0;
                        document.getElementById("active-weapon").innerHTML = 'none';
                        player.activeWeapon = 'null';
                      }
                                  
                    break;
                  default:
                      break;
                }
                    
           }

           // Press up down left right to move Bob
          if(event.keyCode == 37) {
            //go left
            if(playercol != 0)
            {
            if(playercol - 1 == mb.cellpos.x && playerrow == mb.cellpos.y) // This is to check if there is a mysterybox, if so, unlock instead of moving into it
              mb.unlock_mysteryBox(room, renderingEngine.timer);
            else
            {
            if(!room.map[playerrow][playercol-1].occupied)
              physicsEngine.applyForceAtAngle(player,playerspeed,Math.PI);
            if(room.map[playerrow][playercol-1].isWeapon) {
              ai.pickedUpWeapon(playerrow, playercol-1);
            }
            }
            }
          }//end if(event.keyCode == 37)
          if(event.keyCode == 39) {
            //go right
            if(playercol != room.columns-1)
            {
            if(playercol + 1 == mb.cellpos.x && playerrow == mb.cellpos.y)
              mb.unlock_mysteryBox(room, renderingEngine.timer);
            else
            {
            if(!room.map[playerrow][playercol+1].occupied)
            physicsEngine.applyForceAtAngle(player,playerspeed,0);
            if(room.map[playerrow][playercol+1].isWeapon) {
              ai.pickedUpWeapon(playerrow, playercol+1);
            }
            }
            }
          }//end if(event.keyCode == 39)
          if(event.keyCode == 38) {
            //go up
            if(playerrow != 0)
            {
            if(playercol == mb.cellpos.x && playerrow - 1 == mb.cellpos.y)
              mb.unlock_mysteryBox(room, renderingEngine.timer);
            else
            {
            if(!room.map[playerrow-1][playercol].occupied)
            physicsEngine.applyForceAtAngle(player,playerspeed,Math.PI*3/2);
            if(room.map[playerrow-1][playercol].isWeapon) {
              ai.pickedUpWeapon(playerrow-1, playercol);
            }
            }
            }
          }//end if(event.keyCode == 38)
          if(event.keyCode == 40) {
            //go down
            if(playerrow != room.rows-1)
            {
            if(playercol == mb.cellpos.x && playerrow + 1 == mb.cellpos.y)
              mb.unlock_mysteryBox(room, renderingEngine.timer);
            else
            {
            if(!room.map[playerrow+1][playercol].occupied)
            physicsEngine.applyForceAtAngle(player,playerspeed,Math.PI/2);
            if(room.map[playerrow+1][playercol].isWeapon) {
              ai.pickedUpWeapon(playerrow+1, playercol);
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
