function Intrinsic(centerPoint, radius, mass){
	this.centerPoint = centerPoint;
	this.radius = radius;
	this.mass = mass;
	this.velocity = 0;
	this.direction = 0;
	this.color = 'white';
	this.acceleration = 0;
    //Added by renga
    this.health=100;
    //
	this.cellpos = new Point();
	this.attackrating = 0;
	this.defenserating = 0;
	this.isalive = false;
	this.isdefending = false;
	this.isattacking = false;
	this.contructing = false;
	this.isdying = false;
	

	this.stop = function() {
		this.direction=0;
		this.velocity = 0;
		this.acceleration = 0;
	}

}