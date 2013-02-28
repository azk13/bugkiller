function Renderer(){


	this.updatePoints = function(){
		var ants = room.getAnts();
		var bees = room.getBees();

		//Ai.towin(ants)
		//if(player == winningbig)
		//Ai.lose(ants)
		//Ai.towin(bee)
//		this.occupancy();
					


				
		for(var i=0;i<ants.length;i++)
		{		
			physicsEngine.updatePoint(ants[i]);	
			boundcheck.detectCollisionWithWalls(ants[i]);
			pathfinding.objectgo(ants[i],player);

		}
		for(var i=0;i<bees.length;i++)
		{		
			physicsEngine.updatePoint(bees[i]);	
			boundcheck.detectCollisionWithWalls(bees[i]);
			pathfinding.objectgo(bees[i],player);

		}		

		physicsEngine.updatePoint(player);
		boundcheck.detectCollisionWithWalls(player);		

		room.setAnts(ants);
		room.setBees(bees);		
		this.occupancy();
	}

	this.occupancy = function()
	{
		var ants = room.getAnts();
		var bees = room.getBees();

		//Initialize all occupancy zero;
		for(var i=0;i<room.rows;i++)
		{
			for(var j=0;j<room.columns;j++)
			{
				room.map[i][j].occupied = false;
				if(player.Intrinsic.centerPoint.x == room.map[i][j].point.x && player.Intrinsic.centerPoint.y == room.map[i][j].point.y)
					{
						room.map[i][j].occupied=true;
					}
				for(var k=0;k<ants.length;k++)
				{
					if(ants[k].Intrinsic.centerPoint.x == room.map[i][j].point.x && ants[k].Intrinsic.centerPoint.y == room.map[i][j].point.y)
					{
						room.map[i][j].occupied=true;
					}		
				}
				for(var k=0;k<bees.length;k++)
				{
					if(bees[k].Intrinsic.centerPoint.x == room.map[i][j].point.x && bees[k].Intrinsic.centerPoint.y == room.map[i][j].point.y)
					{
						room.map[i][j].occupied=true;
					}		
				}					
			}
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
		//hud.updateHUD();
		renderingEngine.writeText("X:"+player.Intrinsic.centerPoint.x+" Y:"+player.Intrinsic.centerPoint.y,player.Intrinsic.centerPoint);
				renderingEngine.writeText("X:"+ants[0].Intrinsic.centerPoint.x+" Y:"+ants[0].Intrinsic.centerPoint.y,ants[0].Intrinsic.centerPoint);
		//player.Intrinsic.color +=1;
	}

	this.filloccupancy = function(object)
	{
		for(var i=0;i<room.rows;i++)
		{
			
			for(var j=0;j<room.columns;j++)
			{
				
				for(var k=0;k<object.length;k++)
				{
					alert("im in k");
					console.log("Object X:"+object.Intrinsic.centerPoint.x+" Room X:"+room.map[i][j].x);
					if(object.Intrinsic.centerPoint.x == room.map[i][j].point.x && object.Intrinsic.centerPoint.y == room.map[i][j].point.y)
					{
						room.map[i][j].occupied=true;
					}	
				}
				
			}
		}		
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

		//console.log(character.Intrinsic.color);

/*
		if(debugMode == true){
			var stringToSend = "Vel:"+ant.Intrinsic.velocity;
			var antX = ant.Intrinsic.centerPoint.x + ant.Intrinsic.radius;
			var antY = ant.Intrinsic.centerPoint.y;
			var pointToDisplay = new Point(antX, antY);
			this.writeText(stringToSend, pointToDisplay);
			pointToDisplay.y += 10;
			stringToSend = "Dir:"+ant.Intrinsic.direction;
			this.writeText(stringToSend, pointToDisplay);
			pointToDisplay.y += 10;
			stringToSend = "Acc:"+ant.Intrinsic.acceleration;
			this.writeText(stringToSend, pointToDisplay);
			pointToDisplay.y += 10;
			stringToSend = "Spin:"+ant.Intrinsic.spin;
			this.writeText(stringToSend, pointToDisplay);

			pointToDisplay.y = ant.Intrinsic.centerPoint.y-3;
			pointToDisplay.x = ant.Intrinsic.centerPoint.x-4;
			stringToSend = ant.Intrinsic.id;
			this.writeText(stringToSend, pointToDisplay);
	    	// Draw arrow of velocity

	    	var endX = ant.Intrinsic.centerPoint.x + ant.Intrinsic.velocity * Math.cos(ant.Intrinsic.direction);
	    	var endY = ant.Intrinsic.centerPoint.y + ant.Intrinsic.velocity * Math.sin(ant.Intrinsic.direction);
	    	ctx.beginPath();
	    	ctx.moveTo(ant.Intrinsic.centerPoint.x,ant.Intrinsic.centerPoint.y);
	    	ctx.lineTo(endX,endY);
	    	ctx.lineWidth = 5;
	    	ctx.strokeStyle = 'red';
	    	ctx.stroke();

	    	var horizX = ant.Intrinsic.centerPoint.x - 45;
	    	var horizY = ant.Intrinsic.centerPoint.x + 45;
	    	ctx.beginPath();
	    	ctx.moveTo(horizX,ant.Intrinsic.centerPoint.y);
	    	ctx.lineTo(horizY,ant.Intrinsic.centerPoint.y);
	    	ctx.lineWidth = 1;
	    	ctx.strokeStyle = 'black';
	    	ctx.stroke();

	    	var vertX = ant.Intrinsic.centerPoint.y - 45;
	    	var vertY = ant.Intrinsic.centerPoint.y + 45;
	    	ctx.beginPath();
	    	ctx.moveTo(ant.Intrinsic.centerPoint.x,vertX);
	    	ctx.lineTo(ant.Intrinsic.centerPoint.x,vertY);
	    	ctx.lineWidth = 0.5;
	    	ctx.strokeStyle = 'blue';
	    	ctx.stroke();
	    }//end if(debugMode == true)
*/
	
	}


	/*write text to the canvas*/
	this.writeText = function (myString, myPoint) {
		ctx.fillStyle = "purple";
		ctx.font = "bold 10px Arial";
		ctx.fillText(myString, myPoint.x, myPoint.y);
	}//end writeText*/

}
