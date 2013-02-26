function Region(x, y, width, height, mu){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.color = 'green';

	this.coefficientOfFriction = mu;

	this.frictionIncrease = function(){
		if (this.coefficientOfFriction <=0.8){
			this.coefficientOfFriction += 0.2;
		}
	}

	this.frictionDecrease = function(){
		if (this.coefficientOfFriction >=0.2){
			this.coefficientOfFriction -= 0.2;
		}
	}
		
}
