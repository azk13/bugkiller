function Physics(){
    var gravity = 9.81;

	this.applyForceAtAngle = function(object, force, forceAngle){
		var direction = forceAngle;
		//var acceleration = getAccelerationFromForce(force,object.Intrinsic.mass);

		object.Intrinsic.direction = direction;
		//object.Intrinsic.acceleration = acceleration*5.5;
		//object.Intrinsic.velocity = force*0.2;
		object.Intrinsic.velocity = force;
		//console.log("Force applied: "+force+" at angle: " + forceAngle);

		return object;
	}

	this.updatePoint = function(object){


		var endVelocity = vuat(object.Intrinsic.velocity, object.Intrinsic.acceleration, 0.1);
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
		object.Intrinsic.velocity = endVelocity;

		if (object.Intrinsic.velocity > 0){
			if (object.Intrinsic.acceleration > 0){
			object.Intrinsic.acceleration = object.Intrinsic.acceleration - getAccelerationFromFriction(object.Intrinsic.centerPoint);
			} else {
				object.Intrinsic.acceleration = - getAccelerationFromFriction(object.Intrinsic.centerPoint);
			}//end if(object.Intrinsic.acceleration > 0)
		} else {
			object.Intrinsic.acceleration = 0;
			object.Intrinsic.velocity = 0;
			object.Intrinsic.spin = 0;
		}//end if(object.Intrinsic.velocity > 0)
		// console.log("distMoved"+ distMoved);
		if (x_disp != 0 || y_disp != 0){
			/* console.log("Direction "+ object.Intrinsic.direction);
			 console.log("X disp "+ x_disp);
			 console.log("Y disp "+ y_disp);
			 console.log("Quadrobject "+ quadrobject);
			 console.log("angleWithHoriz "+ angleWithHoriz);
			 console.log("Ant position updated to "+object.Intrinsic.centerPoint.x);
			 console.log ("Ant acceleration " + object.Intrinsic.acceleration);
			 console.log ("Ant velocity " + object.Intrinsic.velocity);*/
		}//end if(x_disp != 0 || y_disp != 0)
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
		    player.Intrinsic.health -= bee.Intrinsic.attackrating;
		    renderingEngine.setBobHealth();				
		}			

		return bee;
	}	

	this.getVector = function(x,y){
		var result = new Vector();
		var magnitude = math.pythagorasTheorem(x,y);

		var quadrobject = math.getQuadrobjectByPoint(x,y);
		var angle = Math.atan(Math.abs(y)/Math.abs(x));

		if (quadrobject == 4){
			result.direction = angle;
		} else if (quadrobject == 3) {
			result.direction = Math.PI - angle;
		} else if (quadrobject == 2) {
			result.direction = Math.PI + angle;
		} else {
			result.direction = (2* Math.PI) - angle;
		}

		result.magnitude = magnitude;

		return result;
	}

	this.vectorSubtract = function(vector1, vector2){
		
		var x1 = vector1.getXComponent();
		var x2 = vector2.getXComponent();
		var y1 = vector1.getYComponent();
		var y2 = vector2.getYComponent();

		var result = this.getVector(x1-x2, y1-y2);

		return result;
	}

	// F - (mu)R = ma
	function getAccelerationFromFriction(point){
		var region = room.getRegionFromPoint(point);
		//logger.log("Friction is "+ region.coefficientOfFriction);
		return region.coefficientOfFriction*gravity*99999999999999999;
	}

	// F = ma
	function getAccelerationFromForce(force, mass){
		return (force/mass);
	}

	// v = u + at
	function vuat(u,a,t){
		return u+(a*t);
	}

	// s = ut + 1/2 at^2
	function sutat2(u,t,a){
		return (u*t)+(0.5*a*Math.pow(t,2));
	}

	this.getMomentum = function(mass,velocityVector){
		var mom_x = mass*velocityVector.getXComponent();
		var mom_y = mass*velocityVector.getYComponent();

		var resultobject = this.getVector(mom_x, mom_y);

		return resultobject;
	}

}
