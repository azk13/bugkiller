function Health(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.centerPoint = centerPoint;	
	this.Intrinsic.color = '#ACFA58';
	this.cellpos = new Point((centerPoint.x - 20)/40, (centerPoint.y - 20)/40);
	this.healing = 2; // How much to heal the player when the player picks up health
	//this.index = index; // Which part of the array is the current health at

	this.spawnHealth = function(room){
		var available = new Array();
		var mb = room.getmysterybox();

		// Find places that contain no items to spawn 
		for(var i = 0; i < room.rows; i++)
		{
			for(var j = 0; j < room.columns; j++)
			{
				if((!room.map[i][j].occupied && !room.map[i][j].isWeapon) && i != mb.cellpos.y && j != mb.cellpos.x)
					available.push(room.map[i][j]);
			}
		}

		var index = Math.floor(Math.random() * (available.length - 1));
		this.cellpos = new Point((available[index].point.x - 20) / 40 , (available[index].point.y-20)/40); 
		//console.log(available[index].point.x  + "," + available[index].point.y);
		//console.log(this.cellpos.x + "," + this.cellpos.y);

		this.Intrinsic.centerPoint = new Point(available[index].point.x, available[index].point.y); 
		console.log(available[index].point.x  + "," + available[index].point.y);
		console.log(this.cellpos.x + "," + this.cellpos.y);

	}

	this.destroyHealth = function(){
		this.cellpos = new Point(-1 , -1);
	}
}