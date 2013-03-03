function MysteryBox(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.centerPoint = centerPoint;	
	this.Intrinsic.color = '#FF00FF';
	this.istaken = false;
	this.isvisible = false;
	this.isbomb = false;
	this.isknife = false;
	this.isshuriken = false;
	this.isconverter = false;
	this.ispesticide = false;
	this.isbricks = false;
	this.iscamouflage = false;
	this.issheild = false;
	this.isant = false;
	this.cellpos = new Point();
	this.counter = 0; // Counter to keep track of how long the mystery box has not been touched

	
	this.updateCounter = function(){
		this.counter++;
		if(this.counter == 100)
		{
			this.counter = 0;
			return 1;
		}

		return 0;
	}

	// Spawns new point
	this.spawn = function(newPoint){
		this.Intrinsic.centerPoint = newPoint;
	}

	
}