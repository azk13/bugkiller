function Health(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.centerPoint = centerPoint;	
	this.Intrinsic.color = '#ACFA58';
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
	this.isenemy = false;
	this.cellpos = new Point((centerPoint.x - 20)/40, (centerPoint.y - 20)/40);
	this.healing = 50; // How much to heal the player when the player picks up health
	//this.index = index; // Which part of the array is the current health at

	this.spawnHealth = function(){

	}

	this.destroyHealth = function(room, array, point){

		for(var i; i < array.length; i++)
		{
			if(array[i].cellpos.x == point.x && array[i].cellpos.y == point.y)
				array.splice(i, 1);
			break;
			console.log(array[i].cellpos.x + array[i].cellpos.y);
		}

		room.map[point.x][point.y].isHealth = -1;

	}
}