function Vector(){
	this.magnitude = 0;
	this.direction = 0;

	var mathsValues = new Maths();
	this.getXComponent = function(){
		var angleWithHoriz = mathsValues.getAngleWithQuadrant(this.direction);
		var quadrant = mathsValues.getQuadrantByAngle(this.direction);

		if (quadrant == 1 || quadrant == 4){
			return (this.magnitude * Math.cos(angleWithHoriz));
		}
		else {
			return (-1* this.magnitude * Math.cos(angleWithHoriz));
		}
	}

	this.getYComponent = function(){
		var angleWithHoriz = mathsValues.getAngleWithQuadrant(this.direction);
		var quadrant = mathsValues.getQuadrantByAngle(this.direction);

		if (quadrant == 1 || quadrant == 2){
			return (-1* this.magnitude * Math.sin(angleWithHoriz));
		}
		else {
			return ( this.magnitude * Math.sin(angleWithHoriz));
		}
	}

	this.toCartesianString = function(){
		return "("+this.getXComponent()+","+this.getYComponent()+")";
	}

	this.toString = function(){
		return "("+this.magnitude+"<" + this.direction+")";
	}
}
