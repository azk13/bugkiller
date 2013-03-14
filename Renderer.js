function Renderer(){
var alt=1,rr=8,ss=4;

	//var timer = 0;

	this.updatePoints = function(time_start){
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
				ai.Action(ants[i]);
                ai.antAttackBob(ants[i],player);
 //				if(baskets.length !=0)
 //				ai.attackNearestBasket(ants[i]);
                ai.antclose(ants[i]);
            }
			physicsEngine.updatePoint(ants[i]);	

			boundcheck.detectCollisionWithWalls(ants[i]);
			gridvacancy.occupancy();

			// step on Bomb ~ Jensen
			ai.stepBombCheck(ants[i]);
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
			{
				ai.Action(bees[i]);				
			// pathfinding.objectgo(bees[i],player);
				ai.beeclose(bees[i]);
			}
			if(alt%ss == 0)
			physicsEngine.updateSting(bees[i]);
			physicsEngine.updatePoint(bees[i]);	
			boundcheck.detectCollisionWithWalls(bees[i]);
			gridvacancy.occupancy();

			// step on Bomb ~ Jensen
			ai.stepBombCheck(bees[i]);
			//pathfinding.enemyclose(bees[i]);

		}		
		physicsEngine.updateShuriken();
		physicsEngine.updatePoint(player);
		boundcheck.detectCollisionWithWalls(player);		

//		room.setAnts(ants);
//		room.setBees(bees);		

		
		// -Mysterybox updating-
		// Updates the co-ordinates of the mysterybox every 10 counts if it is untouched
		//

		//console.log(mysterybox.counter);
		var time_now = Date.now();
		if((time_now - mysterybox.spawn_time)/1000 >= 10)	
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
				mysterybox.spawn(available[index].point, mysterybox.mysteryBox_spawn(time_start));
				//console.log(timer);
				//console.log(mysterybox.mysteryBox_spawn(timer));
				//console.log(index);
			}
		

		alt++;
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
		this.drawHealth();
		this.drawStings();
		this.updateEnemyKillCount();
		drawShuriken();
		//this.setWeaponHealth();
		//hud.updateHUD();
		//player.Intrinsic.color +=1;

	}

	this.drawWeapons = function() {
		var weapons = room.getWeapons();


		for (var i=0;i<weapons.length;i++){
			if(weapons[i].activeBomb == true) {
				ctx.fillStyle = 'white';
			} else
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

		var hppoint = new Point(baskets[i].Intrinsic.centerPoint.x-baskets[i].Intrinsic.radius, baskets[i].Intrinsic.centerPoint.y-baskets[i].Intrinsic.radius);		
		ctx.beginPath();
	    ctx.moveTo(hppoint.x,hppoint.y);
	    ctx.lineTo(hppoint.x+(baskets[i].Intrinsic.health*(room.cellsize/100)),hppoint.y);
	    ctx.lineWidth = 5;
	    ctx.strokeStyle = 'green';
	    ctx.stroke();		    	
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
		var BobHealth = player.Intrinsic.health;
		document.getElementById("bob-health").style.width= BobHealth + '%';
		
		if(BobHealth <= 0) {
			alert("You are dead!");
		}
	}

	this.updateEnemyKillCount = function(){
		document.getElementById("enemies-killed").innerHTML = player.kills;
	}
    this.drawMysteryBox = function(){
		var mysterybox = room.getmysterybox();
		ctx.fillStyle = '#FF00FF';
		ctx.fillRect(mysterybox.Intrinsic.centerPoint.x-20, mysterybox.Intrinsic.centerPoint.y-20, mysterybox.Intrinsic.width, mysterybox.Intrinsic.height);
	}

	this.drawHealth = function(){
		var health = room.getHealth();
		//for (var i = 0; i < health.length; i++)
		//{
		if(health.cellpos.x != -1)
		{
			ctx.fillStyle = health.Intrinsic.color;
			ctx.fillRect(health.Intrinsic.centerPoint.x - 15, health.Intrinsic.centerPoint.y - 15, health.Intrinsic.width, health.Intrinsic.height);
		//}
		}

	}
	//check all bee stings Azri
	this.drawStings = function(){
		var bees = room.getBees();
		for(var i=0;i<bees.length;i++)
		{
			drawSting(bees[i]);
		}

	}
	//animate bee sting Azri
	function drawSting(bee)
	{
		if(bee.stingdir == 'left')
		{		    
			ctx.beginPath();
		    ctx.moveTo(bee.stingpos.x,bee.stingpos.y);
		    ctx.lineTo(bee.stingpos.x-(room.cellsize/2),bee.stingpos.y);
		    ctx.lineWidth = 5;
		    ctx.strokeStyle = 'black';
		    ctx.stroke();				

		}
		if(bee.stingdir == 'right')
		{
			ctx.beginPath();
		    ctx.moveTo(bee.stingpos.x,bee.stingpos.y);
		    ctx.lineTo(bee.stingpos.x+(room.cellsize/2),bee.stingpos.y);
		    ctx.lineWidth = 5;
		    ctx.strokeStyle = 'black';
		    ctx.stroke();				
//		    console.log(bee.stingpos.x+(room.cellsize*bee.shootcounter));
			
		}
		if(bee.stingdir == 'up')
		{
			ctx.beginPath();
		    ctx.moveTo(bee.stingpos.x,bee.stingpos.y);
		    ctx.lineTo(bee.stingpos.x,bee.stingpos.y-(room.cellsize/2));
		    ctx.lineWidth = 5;
		    ctx.strokeStyle = 'black';
		    ctx.stroke();					
		}
		if(bee.stingdir == 'down')
		{
			ctx.beginPath();
		    ctx.moveTo(bee.stingpos.x,bee.stingpos.y);
		    ctx.lineTo(bee.stingpos.x,bee.stingpos.y+(room.cellsize/2));
		    ctx.lineWidth = 5;
		    ctx.strokeStyle = 'black';
		    ctx.stroke();					

		}
	}
	//animate shuriken Azri
	function drawShuriken()
	{
		if(player.shurikendir == Math.PI)
		{		    
			ctx.beginPath();
		    ctx.moveTo(player.shurikenpos.x,player.shurikenpos.y);
		    ctx.lineTo(player.shurikenpos.x-(room.cellsize/2),player.shurikenpos.y);
		    ctx.lineWidth = 5;
		    ctx.strokeStyle = 'silver';
		    ctx.stroke();				

		}
		if(player.shurikendir == 0)
		{
			ctx.beginPath();
		    ctx.moveTo(player.shurikenpos.x,player.shurikenpos.y);
		    ctx.lineTo(player.shurikenpos.x+(room.cellsize/2),player.shurikenpos.y);
		    ctx.lineWidth = 5;
		    ctx.strokeStyle = 'silver';
		    ctx.stroke();				
//		    console.log(player.shurikenpos.x+(room.cellsize*bee.shootcounter));
			
		}
		if(player.shurikendir == Math.PI*3/2)
		{
			ctx.beginPath();
		    ctx.moveTo(player.shurikenpos.x,player.shurikenpos.y);
		    ctx.lineTo(player.shurikenpos.x,player.shurikenpos.y-(room.cellsize/2));
		    ctx.lineWidth = 5;
		    ctx.strokeStyle = 'silver';
		    ctx.stroke();					
		}
		if(player.shurikendir == Math.PI/2)
		{
			ctx.beginPath();
		    ctx.moveTo(player.shurikenpos.x,player.shurikenpos.y);
		    ctx.lineTo(player.shurikenpos.x,player.shurikenpos.y+(room.cellsize/2));
		    ctx.lineWidth = 5;
		    ctx.strokeStyle = 'silver';
		    ctx.stroke();					

		}
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
		character.Intrinsic.cellPos.x = pathfinding.getObjectIndexRow(character);
		character.Intrinsic.cellPos.y = pathfinding.getObjectIndexCol(character);

		//console.log(character.Intrinsic.color);

		//draw health      Azri
		if(character.identity != 'Bob')
		{
		var hppoint = new Point(character.Intrinsic.centerPoint.x-character.Intrinsic.radius, character.Intrinsic.centerPoint.y-character.Intrinsic.radius);		
		ctx.beginPath();
	    ctx.moveTo(hppoint.x,hppoint.y);
	    ctx.lineTo(hppoint.x+(character.Intrinsic.health*(room.cellsize/100)),hppoint.y);
	    ctx.lineWidth = 5;
	    ctx.strokeStyle = 'green';
	    ctx.stroke();	
		}
	
		var linelength = 25;
		// Draw arrow of direction
	    var endX = character.Intrinsic.centerPoint.x + linelength * Math.cos(character.Intrinsic.direction);
	    var endY = character.Intrinsic.centerPoint.y + linelength * Math.sin(character.Intrinsic.direction);
	    ctx.beginPath();
	    ctx.moveTo(character.Intrinsic.centerPoint.x,character.Intrinsic.centerPoint.y);
	    ctx.lineTo(endX,endY);
	    ctx.lineWidth = 5;
	    ctx.strokeStyle = 'red';
	    ctx.stroke();


	    //debug mode Azri
		if(debugMode == true){
			
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

			//Identity
			pointToDisplay.y = character.Intrinsic.centerPoint.y-10;
			pointToDisplay.x = character.Intrinsic.centerPoint.x-4;
			stringToSend = character.identity;
			this.writeText(stringToSend, pointToDisplay);



	    }//end if(debugMode == true)

	
	}
	/*write text to the canvas*/
	this.writeText = function (myString, myPoint) {
		ctx.fillStyle = "blue";
		ctx.font = "bold 10px Arial";
		ctx.fillText(myString, myPoint.x, myPoint.y);
	}//end writeText*/

	/*
	this.update_timer = function(){
		timer++;
		//console.log(timer);
		return timer;
	}
	*/
	
}
