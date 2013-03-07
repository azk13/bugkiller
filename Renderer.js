function Renderer(){
var alt=1,rr=8;

	var timer = 0;

	this.updatePoints = function(){
		var ants = room.getAnts();
		var bees = room.getBees();
		var baskets = room.getBaskets();
		var weapons = room.getWeapons();
		var mysterybox = room.getmysterybox();
		
		//Ai.towin(ants)
		//if(player == winningbig)
		//Ai.lose(ants)
		//Ai.towin(bee)
		for(var i=0;i<baskets.length;i++)
		{		
			physicsEngine.updatePoint(baskets[i]);	
			gridvacancy.occupancy();
		}
		for(var i=0;i<weapons.length;i++)
		{		
			physicsEngine.updatePoint(weapons[i]);	
			gridvacancy.occupancy();
		}		
				
		for(var i=0;i<ants.length;i++)
		{

			if(alt%rr == 0)			
			{//pathfinding.objectgo(ants[i],player);
                ai.antAttackBob(ants[i],player);
            }
			physicsEngine.updatePoint(ants[i]);	

			boundcheck.detectCollisionWithWalls(ants[i]);
			gridvacancy.occupancy();
			//pathfinding.enemyclose(ants[i]);

		}

		//ant to go for basket
//		physicsEngine.updatePoint(ants[0]);	
//		boundcheck.detectCollisionWithWalls(ants[0]);
//		gridvacancy.occupancy();
//        ai.antfleefromBob(ants,player);

		for(var i=0;i<bees.length;i++)
		{		
			if(alt%rr == 0)
			pathfinding.objectgo(bees[i],player);
			physicsEngine.updatePoint(bees[i]);	
			boundcheck.detectCollisionWithWalls(bees[i]);
			gridvacancy.occupancy();
			//pathfinding.enemyclose(bees[i]);

		}		
		alt++;
		physicsEngine.updatePoint(player);
		boundcheck.detectCollisionWithWalls(player);		

//		room.setAnts(ants);
//		room.setBees(bees);		

		
		// -Mysterybox updating-
		// Updates the co-ordinates of the mysterybox every 10 counts if it is untouched
		//

		//console.log(mysterybox.counter);
		if(mysterybox.updateCounter() == 1)
			{
				var available = new Array();
				// Find places that contain no items to spawn 
				for(var i = 0; i < room.rows; i++)
				{
					for(var j = 0; j < room.columns; j++)
					{
						if(room.map[i][j].occupied == false)
							available.push(room.map[i][j]);
					}
				}
				//mysterybox.spawn(new Point((Math.floor((Math.random() * 880) / 40) + 1) * 40 + 20, (Math.floor((Math.random() * 560) / 40) + 1) * 40 + 20), mysterybox.mysteryBox_spawn(timer));
				index = Math.floor(Math.random() * (available.length - 1));

				mysterybox.spawn(available[index].point, mysterybox.mysteryBox_spawn(timer));
				//console.log(timer);
				//console.log(mysterybox.mysteryBox_spawn(timer));
				//console.log(index);
			}
	}

	this.drawRoom = function (){
		//Draw the entire room
		canvas.width = room.width;
		canvas.height = room.height;
	    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	    ctx.fillRect(0, 0, room.width, room.height);

	    // Draw the grids
	    for( var i= 0,l=room.columns;i<l;i++)
    	{
    		// horizontal
		    ctx.moveTo(0,i*room.cellsize);
			ctx.lineTo(room.width,i*room.cellsize);

			// vertical
			ctx.moveTo(i*room.cellsize, 0);
			ctx.lineTo(i*room.cellsize, room.height);

			ctx.stroke();
		}


	    
//		for (var i = 0; i<room.regions.length; i++){
//			ctx.fillStyle = room.regions[i].color;
//			ctx.fillRect(room.regions[i].x, room.regions[i].y, room.regions[i].width, room.regions[i].height);
//		}		
	}
	
	this.draw = function(){
		var ants = room.getAnts();
		this.drawRoom();
		this.drawBaskets();
		this.drawAnts();
		this.drawBees();
		this.drawCharacter(player); 
		this.drawWeapons();
		this.drawPath();
		this.drawMysteryBox();
		//this.setWeaponHealth();
		//hud.updateHUD();
		//player.Intrinsic.color +=1;


	}
	this.drawWeapons = function() {
		var weapons = room.getWeapons();

		for (var i=0;i<weapons.length;i++){
			ctx.fillStyle = weapons[i].Intrinsic.color;
	    	ctx.fillRect(weapons[i].Intrinsic.centerPoint.x-10, weapons[i].Intrinsic.centerPoint.y-10, weapons[i].Intrinsic.width, weapons[i].Intrinsic.height);
		}
	}
	this.drawPath = function() {

		// draw the path of all enemies
		// use bees[] and ants[] etc.

	}
	this.drawBaskets = function() {
		var baskets = room.getBaskets();

		for (var i=0;i<baskets.length;i++){
			ctx.fillStyle = baskets[i].Intrinsic.color;
	    	ctx.fillRect(baskets[i].Intrinsic.centerPoint.x-20, baskets[i].Intrinsic.centerPoint.y-20, baskets[i].Intrinsic.width, baskets[i].Intrinsic.height);
		}
	}
	this.drawAnts = function(){
		var ants = room.getAnts();

		for (var i=0;i<ants.length;i++){
			this.drawCharacter(ants[i]);  // Jensen
		}
	}
	this.drawBees = function(){
		var bees = room.getBees();

		for (var i=0;i<bees.length;i++){
			this.drawCharacter(bees[i]);  // Jensen
		}
	}
	this.setBobHealth = function(){ // Jensen
		var BobHealth = player.health;
		document.getElementById("bob-health").style.width= BobHealth + '%';
		
		if(BobHealth <= 0) {
			alert("You are dead!");
		}
	}
	this.setWeaponHealth = function(){

		var activeWeaponHealth = player.activeWeapon;


		switch(activeWeaponHealth)
		{
			case 'Knife':
			  	//player.knifeHealth -=0.5;
			  	document.getElementById("knife-health").style.width= player.knifeHealth + '%';
			  	if(player.knifeHealth <= 0) {
					player.hasKnifeEquipped = false;
					document.getElementById("knife-picked").innerHTML = 0;

				}
			  	break;
			case 'Bomb':
			  	//player.bombHealth -=0.5;
			  	document.getElementById("bomb-health").style.width= player.bombHealth + '%';
			  	if(player.bombHealth <= 0) {
					player.hasBombEquipped = false;
					document.getElementById("bomb-picked").innerHTML = 0;
				}
			  	break;
			case 'Shuriken':
				//player.shurikenHealth -=0.5;
			  	document.getElementById("shuriken-health").style.width= player.shurikenHealth + '%';
			  	if(player.shurikenHealth <= 0) {
					player.hasShurikenEquipped = false;
					document.getElementById("shuriken-picked").innerHTML = 0;
				}
				break;
			default:
			  	break;
		}
	}


	this.drawMysteryBox = function(){
		var mysterybox = room.getmysterybox();
		ctx.fillStyle = '#FF00FF';
		ctx.fillRect(mysterybox.Intrinsic.centerPoint.x-20, mysterybox.Intrinsic.centerPoint.y-20, mysterybox.Intrinsic.width, mysterybox.Intrinsic.height);
	}
	this.drawCharacter = function(character){

		// clear current image
		//ctx.clearRect(character.Intrinsic.centerPoint-20, character.Intrinsic.centerPoint-20, character.Intrinsic.width, character.Intrinsic.height);


		//ctx.drawImage(character.image, character.Intrinsic.centerPoint-20, character.Intrinsic.centerPoint-20);

		//console.log(character.image)

	
		ctx.beginPath();
		ctx.arc(character.Intrinsic.centerPoint.x, character.Intrinsic.centerPoint.y, character.Intrinsic.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = character.Intrinsic.color;
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#000000';
		ctx.stroke();

		// Jensen
		character.row = pathfinding.getObjectIndexRow(character);
		character.column = pathfinding.getObjectIndexCol(character);

		//console.log(character.Intrinsic.color);


		if(debugMode == true){
			var linelength = 25;
			var characterX = character.Intrinsic.centerPoint.x + character.Intrinsic.radius;
			var characterY = character.Intrinsic.centerPoint.y;
			var stringToSend = "Row:"+Math.floor(character.Intrinsic.centerPoint.x/room.cellsize)+" Column:"+Math.floor(characterY/room.cellsize);			
			var pointToDisplay = new Point(characterX, characterY);
			this.writeText(stringToSend, pointToDisplay);
			pointToDisplay.y += 10;
			stringToSend = "X:"+character.Intrinsic.centerPoint.x+" Y:"+characterY;
			this.writeText(stringToSend, pointToDisplay);
			pointToDisplay.y += 10;			
			stringToSend = "Dir:"+character.Intrinsic.direction.toFixed(2);
			this.writeText(stringToSend, pointToDisplay);
			pointToDisplay.y += 10;

			pointToDisplay.y = character.Intrinsic.centerPoint.y-10;
			pointToDisplay.x = character.Intrinsic.centerPoint.x-4;
			stringToSend = character.identity;
			this.writeText(stringToSend, pointToDisplay);
	    	// Draw arrow of velocity

	    	var endX = character.Intrinsic.centerPoint.x + linelength * Math.cos(character.Intrinsic.direction);
	    	var endY = character.Intrinsic.centerPoint.y + linelength * Math.sin(character.Intrinsic.direction);
	    	ctx.beginPath();
	    	ctx.moveTo(character.Intrinsic.centerPoint.x,character.Intrinsic.centerPoint.y);
	    	ctx.lineTo(endX,endY);
	    	ctx.lineWidth = 5;
	    	ctx.strokeStyle = 'red';
	    	ctx.stroke();

	    }//end if(debugMode == true)

	
	}
	/*write text to the canvas*/
	this.writeText = function (myString, myPoint) {
		ctx.fillStyle = "blue";
		ctx.font = "bold 10px Arial";
		ctx.fillText(myString, myPoint.x, myPoint.y);
	}//end writeText*/

	
	this.update_timer = function(){
		timer++;
		//console.log(timer);
		return timer;
	}
	
}
