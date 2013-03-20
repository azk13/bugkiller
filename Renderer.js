function Renderer(){
this.frametime=1;	
var rr=8,ss=4;

	this.updatePoints = function(time_start){
		var ants = room.getAnts();
		var bees = room.getBees();
		var baskets = room.getBaskets();
		var weapons = room.getWeapons();
		var mysterybox = room.getmysterybox();
		var timenow = Math.round((Date.now() - start_time)/1000);
		if(ants.length == 0 && timenow < 90)
		{
			room.spawnEnemies(1,'ant');
		}
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

			if(this.frametime%rr == 0)			
			{				
				if(baskets.length !=0)
				ai.antAttackrating(ants[i],'bob');

				ai.Action(ants[i],ants.length);

              
                if(this.frametime%240 == 0)
                {
                	if(ants.length == room.maxAnts)
                	{
                	var random=Math.random();
                    if(random<0.5)
                    {ants[i].Intrinsic.goals.push(6);}

                    else
                    {ants[i].Intrinsic.goals.push(7);}

                     ants[i].Intrinsic.goals.push(5);
                	}
                }  
                room.spawnEnemies(room.maxAnts,ants[i].identity);                
                ai.AiCommander(ants[i]);
                ai.antclose(ants[i]);

            }
			physicsEngine.updatePoint(ants[i]);	

			boundcheck.detectCollisionWithWalls(ants[i]);
			gridvacancy.occupancy();

			// step on Bomb ~ Jensen
			ai.stepBombCheck(ants[i]);
			//pathfinding.enemyclose(ants[i]);

		}
		for(var i=0;i<bees.length;i++)
		{		
			if(this.frametime%rr == 0)
			{
				ai.Action(bees[i],bees.length);

                room.spawnEnemies(room.maxBees,bees[i].identity);
                ai.AiCommander(bees[i]);
                ai.beeclose(bees[i]);
			}
			if(this.frametime%ss == 0)
			physicsEngine.updateSting(bees[i]);
			physicsEngine.updatePoint(bees[i]);	
			boundcheck.detectCollisionWithWalls(bees[i]);
			gridvacancy.occupancy();

			// step on Bomb ~ Jensen
			ai.stepBombCheck(bees[i]);
		}		
		physicsEngine.updateShuriken();
		physicsEngine.updatePoint(player);
		boundcheck.detectCollisionWithWalls(player);
		// -Mysterybox updating-
		// Updates the co-ordinates of the mysterybox every 10 counts if it is untouched
		//
		var time_now = Date.now();
		if((time_now - mysterybox.spawn_time)/1000 >= Math.floor((Math.random()*10)+7))	
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
		this.frametime++;
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
	}
	this.draw = function(){
		this.drawRoom();
		this.drawBaskets();
		this.drawAnts();
		this.drawBees();
		this.drawCharacter(player); 
		this.drawWeapons();
		this.drawMysteryBox();
		this.drawHealth();
		this.drawStings();
		this.updateEnemyKillCount();
		this.setBobHealth();

		drawShuriken();

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
	this.drawBaskets = function() {
		var baskets = room.getBaskets();

		for (var i=0;i<baskets.length;i++){
			ctx.fillStyle = baskets[i].Intrinsic.color;
	    	ctx.fillRect(baskets[i].Intrinsic.centerPoint.x-20, baskets[i].Intrinsic.centerPoint.y-20, baskets[i].Intrinsic.width, baskets[i].Intrinsic.height);

	    if(baskets[i].Intrinsic.health > 80)
		{ctx.strokeStyle = 'green';}
		else if(baskets[i].Intrinsic.health > 60)
		{ctx.strokeStyle = 'yellow';}
		else if(baskets[i].Intrinsic.health > 30)
		{ctx.strokeStyle = 'orange';}
		else
		{ctx.strokeStyle = 'red';}	
	
		var hppoint = new Point(baskets[i].Intrinsic.centerPoint.x-baskets[i].Intrinsic.radius, baskets[i].Intrinsic.centerPoint.y-baskets[i].Intrinsic.radius);		
		ctx.beginPath();
	    ctx.moveTo(hppoint.x,hppoint.y);
	    ctx.lineTo(hppoint.x+room.cellsize,hppoint.y);
	    ctx.lineWidth = 5;
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

		if(BobHealth > 80) {
			document.getElementById("bob-health").innerHTML= "1. Good :)";
		}

		else if(BobHealth > 60 && BobHealth < 80) {
			document.getElementById("bob-health").innerHTML= "2. Crippled..";
		}

		else if(BobHealth > 30 && BobHealth < 60) {
			document.getElementById("bob-health").innerHTML= "3. Dying...";
		}

		else if(BobHealth > 0 && BobHealth < 30) {
			document.getElementById("bob-health").innerHTML= "4. Critical!!!";
		}
		
		else if(BobHealth <= 0) {
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
	function drawSting(bee){
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
	function drawShuriken()	{
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
		if(character.Intrinsic.health > 80)
		{ctx.strokeStyle = 'green';}
		else if(character.Intrinsic.health > 60)
		{ctx.strokeStyle = 'yellow';}
		else if(character.Intrinsic.health > 30)
		{ctx.strokeStyle = 'orange';}
		else
		{ctx.strokeStyle = 'red';}

		if(character.identity != 'Bob')
		{
		var hppoint = new Point(character.Intrinsic.centerPoint.x-character.Intrinsic.radius, character.Intrinsic.centerPoint.y-character.Intrinsic.radius);		
		ctx.beginPath();
	    ctx.moveTo(hppoint.x,hppoint.y);
	    ctx.lineTo(hppoint.x+room.cellsize,hppoint.y);
	    ctx.lineWidth = 5;
	    
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
	    ctx.strokeStyle = character.Intrinsic.attackcolor;
	    ctx.stroke();


	    //debug mode Azri
		if(debugMode == true){

			var typeattack = 'none';

			var characterX = character.Intrinsic.centerPoint.x + character.Intrinsic.radius;
			var characterY = character.Intrinsic.centerPoint.y;

			var stringToSend = "1st:"+this.goalName(character.Intrinsic.retrieveLastGoal());			
			var pointToDisplay = new Point(characterX, characterY);
			this.writeText(stringToSend, pointToDisplay,"blue");
			pointToDisplay.y += 10;

			stringToSend = "2nd:"+this.goalName(character.Intrinsic.retrieve2ndLastGoal());
			this.writeText(stringToSend, pointToDisplay,"red");
			pointToDisplay.y += 10;			
			stringToSend = "3rd:"+this.goalName(character.Intrinsic.retrieve3rdLastGoal());
			this.writeText(stringToSend, pointToDisplay,"white");
			pointToDisplay.y += 10;

			//Identity
			pointToDisplay.y = character.Intrinsic.centerPoint.y-10;
			pointToDisplay.x = character.Intrinsic.centerPoint.x-4;
			stringToSend = character.identity;
			this.writeText(stringToSend, pointToDisplay,"blue");



	    }//end if(debugMode == true)
	// /*write text to the canvas*/
	this.goalName = function(number)
	{

			switch(number){
			case 1:
			typeattack = 'attack bob';
			break;
			case 2:
			typeattack = 'attack baskets';
			break;
			case 3:
			typeattack = 'flee';
			break;
			case 4:
			typeattack = 'cornering';
			break;
			case 5:
			typeattack = 'clustering';
			break;
			case 6:
			typeattack = 'shortattack';
			break;
			case 7:
			typeattack = 'short basket';
			break;
			}	

			return typeattack;		
	}
	this.writeText = function (myString, myPoint,color) {
		ctx.fillStyle = color;
		ctx.font = "bold 10px Arial";
		ctx.fillText(myString, myPoint.x, myPoint.y);
	}

}
}


