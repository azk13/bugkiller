//Everybody contributed
function Physics(){
	this.applyForceAtAngle = function(object, force, forceAngle){
		var direction = forceAngle;
		object.Intrinsic.direction = direction;
		object.Intrinsic.velocity = force;

		return object;
	}

	this.updatePoint = function(object){
		var distMoved = sutat2(object.Intrinsic.velocity, 0.1, object.Intrinsic.acceleration);

		var quadrobject = math.getQuadrobjectByAngle(object.Intrinsic.direction);
		var angleWithHoriz = math.getAngleWithQuadrobject(object.Intrinsic.direction);

		var x_disp = 0;
		var y_disp = 0;

		if (distMoved > 0){
			if (quadrobject == 1){
				x_disp = distMoved*Math.cos(angleWithHoriz);
				y_disp = -1*distMoved*Math.sin(angleWithHoriz);
			} else if (quadrobject == 2){
				x_disp = -1*distMoved*Math.cos(angleWithHoriz);
				y_disp = -1*distMoved*Math.sin(angleWithHoriz);
			} else if (quadrobject == 3){
				x_disp = -1*distMoved*Math.cos(angleWithHoriz);
				y_disp = distMoved*Math.sin(angleWithHoriz);
			} else {
				x_disp = distMoved*Math.cos(angleWithHoriz);
				y_disp = distMoved*Math.sin(angleWithHoriz);
			}
		}
		//this is where the next position of x and y is decided
		object.Intrinsic.centerPoint.x = Math.round(object.Intrinsic.centerPoint.x + x_disp);
		object.Intrinsic.centerPoint.y = Math.round(object.Intrinsic.centerPoint.y + y_disp);

		object.Intrinsic.velocity = 0;

		return object;
	}

this.updateSting = function(bee)
	{
//		console.log(bee.stingdir);
		if(bee.stingdir == 'left')
		{		    
			bee.stingpos.x = bee.stingpos.x-room.cellsize;
		}
		if(bee.stingdir == 'right')
		{
			bee.stingpos.x = bee.stingpos.x+room.cellsize;			
		}
		if(bee.stingdir == 'up')
		{
			bee.stingpos.y=bee.stingpos.y-room.cellsize;				
		}
		if(bee.stingdir == 'down')
		{
			bee.stingpos.y=bee.stingpos.y+room.cellsize;	
		}
		if(bee.stingpos.x == player.Intrinsic.centerPoint.x && bee.stingpos.y == player.Intrinsic.centerPoint.y)
		{
			bee.Intrinsic.attackrating = 5;
		    player.Intrinsic.health -= bee.Intrinsic.attackrating;
		    renderingEngine.setBobHealth();		
		    bee.stingpos.x = bee.stingpos.y = 9999;		
		}			

		return bee;
	}	
this.updateShuriken = function()
	{
//		console.log(bee.stingdir);
		if(player.shurikendir == Math.PI)
		{		    
			player.shurikenpos.x = player.shurikenpos.x-room.cellsize;
		}
		if(player.shurikendir == 0)
		{
			player.shurikenpos.x = player.shurikenpos.x+room.cellsize;			
		}
		if(player.shurikendir == Math.PI*3/2)
		{
			player.shurikenpos.y=player.shurikenpos.y-room.cellsize;				
		}
		if(player.shurikendir == Math.PI/2)
		{
			player.shurikenpos.y=player.shurikenpos.y+room.cellsize;	
		}
		var ants = room.getAnts();
		var bees = room.getBees();
//update ant health when hit
for(var i=0;i<ants.length;i++)
{
		if(player.shurikenpos.x == ants[i].Intrinsic.centerPoint.x && player.shurikenpos.y == ants[i].Intrinsic.centerPoint.y)
		{
		    ants[i].Intrinsic.health -= player.Intrinsic.attackrating;	
		    player.shurikenpos.x = player.shurikenpos.y = 9999;

		    //ant dies	
		    if(ants[i].Intrinsic.health <= 0)	
		    {
		    	ants.splice(ants.indexOf(ants[i]),1); 
		    	player.kills++;
		    }
		}	
}		
//update ant health when hit
for(var i=0;i<bees.length;i++)
{
		if(player.shurikenpos.x == bees[i].Intrinsic.centerPoint.x && player.shurikenpos.y == bees[i].Intrinsic.centerPoint.y)
		{
		    bees[i].Intrinsic.health -= player.Intrinsic.attackrating;	
		    player.shurikenpos.x = player.shurikenpos.y = 9999;	
		    //bee dies	
		    if(bees[i].Intrinsic.health <= 0)	
		    {
		    	bees.splice(bees.indexOf(bees[i]),1); 
		    	player.kills++;
		    }		    	
		}	
}		

		return player;
	}	
	// s = ut + 1/2 at^2
	function sutat2(u,t,a){
		return (u*t)+(0.5*a*Math.pow(t,2));
	}

}
