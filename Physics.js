function Physics(){
    var gravity = 9.81;

	this.applyForceAtAngle = function(ant, force, forceAngle){
		var direction = forceAngle;
		//var acceleration = getAccelerationFromForce(force,ant.mass);

		ant.direction = direction;
		//ant.acceleration = acceleration*5.5;
		//ant.velocity = force*0.2;
		ant.velocity = force;
		//console.log("Force applied: "+force+" at angle: " + forceAngle);

		return ant;
	}

	this.updatePoint = function(ant){


		var endVelocity = vuat(ant.velocity, ant.acceleration, 0.1);
		var distMoved = sutat2(ant.velocity, 0.1, ant.acceleration);

		var quadrant = math.getQuadrantByAngle(ant.direction);
		var angleWithHoriz = math.getAngleWithQuadrant(ant.direction);

		var x_disp = 0;
		var y_disp = 0;

		if (distMoved > 0){
			if (quadrant == 1){
				x_disp = distMoved*Math.cos(angleWithHoriz);
				y_disp = -1*distMoved*Math.sin(angleWithHoriz);
			} else if (quadrant == 2){
				x_disp = -1*distMoved*Math.cos(angleWithHoriz);
				y_disp = -1*distMoved*Math.sin(angleWithHoriz);
			} else if (quadrant == 3){
				x_disp = -1*distMoved*Math.cos(angleWithHoriz);
				y_disp = distMoved*Math.sin(angleWithHoriz);
			} else {
				x_disp = distMoved*Math.cos(angleWithHoriz);
				y_disp = distMoved*Math.sin(angleWithHoriz);
			}
		}

		ant.centerPoint.x = ant.centerPoint.x + x_disp;
		ant.centerPoint.y = ant.centerPoint.y + y_disp;
		ant.velocity = endVelocity;

		if (ant.velocity > 0){
			if (ant.acceleration > 0){
			ant.acceleration = ant.acceleration - getAccelerationFromFriction(ant.centerPoint);
			} else {
				ant.acceleration = - getAccelerationFromFriction(ant.centerPoint);
			}//end if(ant.acceleration > 0)
		} else {
			ant.acceleration = 0;
			ant.velocity = 0;
			ant.spin = 0;
		}//end if(ant.velocity > 0)
		// console.log("distMoved"+ distMoved);
		if (x_disp != 0 || y_disp != 0){
			/* console.log("Direction "+ ant.direction);
			 console.log("X disp "+ x_disp);
			 console.log("Y disp "+ y_disp);
			 console.log("Quadrant "+ quadrant);
			 console.log("angleWithHoriz "+ angleWithHoriz);
			 console.log("Ant position updated to "+ant.centerPoint.x);
			 console.log ("Ant acceleration " + ant.acceleration);
			 console.log ("Ant velocity " + ant.velocity);*/
		}//end if(x_disp != 0 || y_disp != 0)
		return ant;
	}

	this.getVector = function(x,y){
		var result = new Vector();
		var magnitude = math.pythagorasTheorem(x,y);

		var quadrant = math.getQuadrantByPoint(x,y);
		var angle = Math.atan(Math.abs(y)/Math.abs(x));

		if (quadrant == 4){
			result.direction = angle;
		} else if (quadrant == 3) {
			result.direction = Math.PI - angle;
		} else if (quadrant == 2) {
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
		return region.coefficientOfFriction*gravity*999999;
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

		var resultant = this.getVector(mom_x, mom_y);

		return resultant;
	}

}
