function Room(){
	var ants = new Array();

	this.width = 1000;
	this.height = 500;

	this.regions = new Array();

	// Always label regions from largest to smallest
	this.regions[0] = new Region(0,0,1000,500, 0.8);
	this.regions[0].color = 'brown';
	this.regions[1] = new Region(50,50,900,400, 0.6);
	this.regions[1].color = '#31B404';
	this.regions[2] = new Region(150,130,700,240, 0.3);
	this.regions[2].color = '#00FF00';



	//object setup
	ants[0] = new Ants(new Point(699,250),23,2);
	ants[0].color = 'red';
	ants[0].id = 0;

	this.getAnts = function(){
		return ants;
	}

	 this.setAnts = function(allAnts){
	 	this.ants = allAnts;
	 }


	 	 this.getRegionFromPoint = function(point){
	 	if ((point.x > this.regions[2].x) && (point.x < this.regions[2].x + this.regions[2].width) 
	 		&& (point.y > this.regions[2].y) && (point.y < this.regions[2].y + this.regions[2].height)){
	 		return this.regions[2];
	 	}
	 	else if ((point.x > this.regions[1].x) && (point.x < this.regions[1].x + this.regions[1].width) 
	 		&& (point.y > this.regions[1].y) && (point.y < this.regions[1].y + this.regions[1].height)){
	 		return this.regions[1];
	 	}
	 	else {
	 		return this.regions[0];
	 	}

	 }


}
