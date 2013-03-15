function Intrinsic(centerPoint, width, height){

	this.centerPoint = centerPoint;
	this.width = width;
	this.height = height;

	this.radius = 20;

	this.velocity = 0;
	this.direction = 0;
	this.color = 'white';
	this.acceleration = 0;
    //Added by renga
    this.health=100;
    //
	this.cellPos = new Point(0,0);
	this.attackrating = 0.5;
	this.isattacking = false;
	this.attackcolor = 'blue';

	this.stop = function() {
		this.direction=0;
		this.velocity = 0;
		this.acceleration = 0;
	}

}