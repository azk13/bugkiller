function Renderer(){

	this.updatePoints = function(){
		var ants = room.getAnts();

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
	    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	    ctx.fillRect(0, 0, room.width, room.height);
//		for (var i = 0; i<room.regions.length; i++){
//			ctx.fillStyle = room.regions[i].color;
//			ctx.fillRect(room.regions[i].x, room.regions[i].y, room.regions[i].width, room.regions[i].height);
//		}		
	}
	
	this.draw = function(){
		this.drawRoom();
		this.drawAnts();
		this.drawAnt(player);
		hud.updateHUD();
		renderingEngine.writeText("X:"+player.Intrinsic.centerPoint.x+" Y:"+player.Intrinsic.centerPoint.y,player.Intrinsic.centerPoint);
		player.Intrinsic.color +=1;
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
		ctx.arc(ant.Intrinsic.centerPoint.x, ant.Intrinsic.centerPoint.y, ant.Intrinsic.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = ant.Intrinsic.color;
		ctx.fill();
		ctx.lineWidth = 1;

		ctx.strokeStyle = '#000000';
		ctx.stroke();

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
		ctx.fillStyle = "black";
		ctx.font = "bold 10px Arial";
		ctx.fillText(myString, myPoint.x, myPoint.y);
	}//end writeText*/

}