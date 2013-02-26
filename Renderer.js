function Renderer(){
	var antsPosXToClear = new Array();
	var antsPosYToClear = new Array();
	var antsRadToClear = new Array();
	var ctr = 0;

	this.updatePoints = function(){
		var ants = room.getAnts();
		antsPosXToClear.length = 0;
		antsPosYToClear.length = 0;
		antsRadToClear.length = 0;


		//Ai.towin(ants)
		//if(player == winningbig)
		//Ai.lose(ants)
		//Ai.towin(bee)
		physicsEngine.updatePoint(player);
		boundcheck.detectCollisionWithWalls(player);
		physicsEngine.updatePoint(ants[0]);
		
		room.setAnts(ants);


	}

	this.drawRoom = function (){
		//clearing function
		canvas.width = room.width;
		canvas.height = room.height;

		for (var i = 0; i<room.regions.length; i++){
			ctx.fillStyle = room.regions[i].color;
			ctx.fillRect(room.regions[i].x, room.regions[i].y, room.regions[i].width, room.regions[i].height);
		}		
	}
	
	this.draw = function(){
		this.drawRoom();
		this.drawAnts();
		this.drawAnt(player);
		hud.updateHUD();
		renderingEngine.writeText(player.velocity,player.centerPoint);
	}

	this.drawAnts = function(){
		var ants = room.getAnts();

		for (var i=0;i<ants.length;i++){
			this.drawAnt(ants[i]);  
		}

		//console.log("Drew "+ ants.length + " ants");
	}

	this.drawAnt = function(ant){

		ctx.beginPath();
		ctx.arc(ant.centerPoint.x, ant.centerPoint.y, ant.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = ant.color;
		ctx.fill();
		ctx.lineWidth = 1;

		ctx.strokeStyle = '#000000';
		ctx.stroke();

/*
		if(debugMode == true){
			var stringToSend = "Vel:"+ant.velocity;
			var antX = ant.centerPoint.x + ant.radius;
			var antY = ant.centerPoint.y;
			var pointToDisplay = new Point(antX, antY);
			this.writeText(stringToSend, pointToDisplay);
			pointToDisplay.y += 10;
			stringToSend = "Dir:"+ant.direction;
			this.writeText(stringToSend, pointToDisplay);
			pointToDisplay.y += 10;
			stringToSend = "Acc:"+ant.acceleration;
			this.writeText(stringToSend, pointToDisplay);
			pointToDisplay.y += 10;
			stringToSend = "Spin:"+ant.spin;
			this.writeText(stringToSend, pointToDisplay);

			pointToDisplay.y = ant.centerPoint.y-3;
			pointToDisplay.x = ant.centerPoint.x-4;
			stringToSend = ant.id;
			this.writeText(stringToSend, pointToDisplay);
	    	// Draw arrow of velocity

	    	var endX = ant.centerPoint.x + ant.velocity * Math.cos(ant.direction);
	    	var endY = ant.centerPoint.y + ant.velocity * Math.sin(ant.direction);
	    	ctx.beginPath();
	    	ctx.moveTo(ant.centerPoint.x,ant.centerPoint.y);
	    	ctx.lineTo(endX,endY);
	    	ctx.lineWidth = 5;
	    	ctx.strokeStyle = 'red';
	    	ctx.stroke();

	    	var horizX = ant.centerPoint.x - 45;
	    	var horizY = ant.centerPoint.x + 45;
	    	ctx.beginPath();
	    	ctx.moveTo(horizX,ant.centerPoint.y);
	    	ctx.lineTo(horizY,ant.centerPoint.y);
	    	ctx.lineWidth = 1;
	    	ctx.strokeStyle = 'black';
	    	ctx.stroke();

	    	var vertX = ant.centerPoint.y - 45;
	    	var vertY = ant.centerPoint.y + 45;
	    	ctx.beginPath();
	    	ctx.moveTo(ant.centerPoint.x,vertX);
	    	ctx.lineTo(ant.centerPoint.x,vertY);
	    	ctx.lineWidth = 0.5;
	    	ctx.strokeStyle = 'blue';
	    	ctx.stroke();
	    }//end if(debugMode == true)
*/
	
	}


	/*write text to the canvas*/
	this.writeText = function (myString, myPoint) {
		ctx.fillStyle = "black";
		ctx.font = "bold 10px Arial";
		ctx.fillText(myString, myPoint.x, myPoint.y);
	}//end writeText*/

}
