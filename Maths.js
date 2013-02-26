function Maths(){
	this.calculatePointInCircumference = function(ant, angularPoint){
		var resultPoint = new Point(0,0);

		var angleInQuadrant = this.getAngleWithQuadrant(angularPoint);
		var quadrant = this.getQuadrantByAngle(angularPoint);

		var displace_x = ant.radius*Math.cos(angleInQuadrant);
		var displace_y = ant.radius*Math.sin(angleInQuadrant);

		if (quadrant == 1){
			resultPoint.x = ant.centerPoint.x + displace_x;
			resultPoint.y = ant.centerPoint.y - displace_y;
		} else if (quadrant == 2){
			resultPoint.x = ant.centerPoint.x - displace_x;
			resultPoint.y = ant.centerPoint.y - displace_y;
		} else if (quadrant == 3){
			resultPoint.x = ant.centerPoint.x - displace_x;
			resultPoint.y = ant.centerPoint.y + displace_y;
		} else {
			resultPoint.x = ant.centerPoint.x + displace_x;
			resultPoint.y = ant.centerPoint.y + displace_y;
		}

		resultPoint = this.roundPoint(resultPoint);

		return resultPoint;
	}

	this.pythagorasTheorem = function(x, y){
		var squared = Math.pow(x,2) + Math.pow(y,2);
		var root = Math.sqrt(squared);

		return root;
	}


	this.getAngleFromCollisionPoint = function(ant, point){
		var quadrant = this.getQuadrantByPoint(point.x - ant.centerPoint.x, point.y - ant.centerPoint.y);
		var angle;
		if (point.y-ant.centerPoint.y == 0){
			logger.log("Div by zero error: line 42: Maths.js")
		}

		var x = point.x-ant.centerPoint.x;
		var y = point.y-ant.centerPoint.y;

		if (x < 0){
			x = -1*x;
		}

		if (y < 0){
			y = -1*y;
		}

		if (quadrant == 1){
			angle = (2*Math.PI) - Math.atan(y/x);
		}
		else if (quadrant == 4){
			angle = Math.atan(y/x);
		} 
		else if (quadrant == 2){
			angle = Math.PI + Math.atan(y/x);
		}
		else if (quadrant == 3){
			angle = Math.PI - Math.atan(y/x);
		}
		//console.log(quadrant);
		//console.log(angle);
		//angle = Math.round(angle*100)/100;
		return angle;
	}

//Need to recalculate for every quadrant because t is not a circle.
	this.getAngleFromAnyPoint = function(ant, point){
		var quadrant = this.getQuadrantByPointforshoot(ant.centerPoint.x - point.x, ant.centerPoint.y - point.y);
		var angle;
		var distancebetpoints = this.getDistanceBetweenTwoPoints(ant.centerPoint,point);

	//	if ((point.y-ant.centerPoint.y == 0)||(ant.centerPoint.x-point.x)){
	//		logger.log("Div by zero error: line 69: Maths.js")
	//	}

		if (quadrant == 1)
		{
			if((point.x-ant.centerPoint.x) != 0)
			{angle = Math.atan((point.y - ant.centerPoint.y)/(point.x-ant.centerPoint.x));}
		else
			{angle = Math.atan(0);}
		}
		else if(quadrant == 2)
		{
			if((point.y - ant.centerPoint.y) != 0)
			{angle = (Math.PI/2) + Math.atan((ant.centerPoint.x-point.x)/(point.y - ant.centerPoint.y));}
		else
			{angle = Math.atan(0);}		
		}
		else if(quadrant == 3)
		{
			if((ant.centerPoint.x-point.x) != 0)
			{angle = (Math.PI) + Math.atan((ant.centerPoint.y - point.y)/(ant.centerPoint.x-point.x));}
		else
			{angle = Math.atan(0);}			
		}
		else
		{
			if((ant.centerPoint.y - point.y) != 0)			
			{angle = (3*Math.PI/2) + Math.atan((point.x - ant.centerPoint.x)/(ant.centerPoint.y - point.y));}
		else
			{angle = Math.atan(0);}			
		}

		//console.log(quadrant);
		
		angle = Math.round(angle*100)/100;

		//ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.font = '18pt Calibri';
        //ctx.fillStyle = 'black';
        //ctx.fillText("Angle in radians: " + angle, 10, 25);
		return angle;
	}

		this.getQuadrantByPointforshoot = function(xDiff,yDiff){
		//if point is on the right side
		if (xDiff < 0){
			//if on top
			if (yDiff >= 0){
				return 4;
			}
			else if (yDiff < 0){
				return 1;
			}
		}
		else{
			//if point is on the right side
			if (yDiff >= 0){
				return 3;
			}
			else if (yDiff < 0){
				return 2;
			}
		}
	}

	this.getQuadrantByPoint = function(xDiff,yDiff){
		//if point is on the right side
		if (xDiff < 0){
			//if on top
			if (yDiff >= 0){
				return 3;
			}
			else if (yDiff < 0){
				return 2;
			}
		}
		else{
			//if point is on the right side
			if (yDiff >= 0){
				return 4;
			}
			else if (yDiff < 0){
				return 1;
			}
		}
	}

	this.roundPoint = function(point, dp){
		var rounded = new Point(0,0);
		rounded.x = Math.round(point.x*100)/100;
		rounded.y = Math.round(point.y*100)/100;
		return rounded;
	}

	this.getAngleWithQuadrant = function(angle){
		if (angle >= 0 && angle <= Math.PI/2){
			return angle;
		}
		else if (angle > Math.PI/2 && angle <= Math.PI){
			return Math.PI-angle;
		}
		else if (angle > Math.PI && angle <= (3*Math.PI)/2){
			return angle - Math.PI;
		}
		else {
			return (2*Math.PI) - angle;
		}
	}

	this.getQuadrantByAngle = function(angle){
		if (angle > 2*Math.PI){
			angle = this.correctAngleToFirstCircle(angle);
		}

		if (angle >= 0 && angle <= Math.PI/2){
			return 4;
		}
		else if (angle > Math.PI/2 && angle <= Math.PI){
			return 3;
		}
		else if (angle > Math.PI && angle <= (3*Math.PI)/2){
			return 2;
		}
		else {
			return 1;
		}
	}

	this.correctAngleToFirstCircle = function(angle){
		while (angle > 2*Math.PI){
			angle = angle - 2*Math.PI;
		}

		return angle;
	}

	this.getDistanceBetweenTwoPoints = function(p1, p2){
		var x_p1 = p1.x;
		var y_p1 = p1.y;
		var x_p2 = p2.x;
		var y_p2 = p2.y;

		var distanceSquared = Math.pow((x_p1-x_p2),2) + Math.pow((y_p1-y_p2),2);

		var distance = Math.sqrt(distanceSquared);

	//	console.log("Distance between " + p1.toString()+" and "+p2.toString()+ " is " + distance);

		return distance;
	}
}
