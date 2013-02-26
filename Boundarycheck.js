function Boundcheck(){

	this.detectCollisionWithWalls = function(ant) {
		var roomWidth = room.width;
		var roomHeight = room.height;

		if (((ant.centerPoint.x + ant.radius) > room.width)){
		ant.stop();
		ant.centerPoint.x = Math.floor(room.width - ant.radius);
			//logger.log('ant hit right wall!');

		}
		else if (((ant.centerPoint.y + ant.radius) > room.height)){
			//logger.log('ant hit bottom wall');
		ant.stop();
		ant.centerPoint.y = Math.floor(room.height - ant.radius);
		}
		else if (((ant.centerPoint.y - ant.radius) < 0)){
			//logger.log('ant hit top wall');	
		ant.stop();
		ant.centerPoint.y = Math.floor(ant.radius);
		}
		else if (((ant.centerPoint.x - ant.radius) < 0)){
			//logger.log('Ant hit left wall');
		ant.stop();
		ant.centerPoint.x = Math.floor(ant.radius);
		}
	}

	this.detectCollisionWithWallsBoolean = function(ant) {
		var roomWidth = room.width;
		var roomHeight = room.height;

		if (((ant.centerPoint.x + ant.radius) >= room.width)){
			//logger.log('Ant hit right wall!');
			return true;
		}
		else if (((ant.centerPoint.y + ant.radius) >= room.height)){
			//logger.log('Ant hit bottom wall');
			return true;
		}
		else if (((ant.centerPoint.y - ant.radius) <= 0)){
			//logger.log('Ant hit top wall');
			return true;
		}
		else if (((ant.centerPoint.x - ant.radius) <= 0)){
			//logger.log('Ant hit left wall');
			return true;
		}
	}	
}