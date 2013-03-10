function Health(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.centerPoint = centerPoint;	
	this.Intrinsic.color = '#ACFA58';
	this.istaken = false;
	this.isvisible = false;
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
				if((!room.map[i][j].occupied && !room.map[i][j].isWeapon)) //&& i != mb.cellpos.y && j != mb.cellpos.x)
					available.push(room.map[i][j]);
			}
		}

		var index = Math.floor(Math.random() * (available.length - 1));
		this.cellpos = new Point((available[index].x - 20) / 40 , (available[index].y-20)/40); 
		console.log(available[index].x  + "," + available[index].y);
	}

	this.destroyHealth = function(){
		this.cellpos = new Point(-1 , -1);
	}
}