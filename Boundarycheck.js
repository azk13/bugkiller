function Boundcheck(){

	this.detectCollisionWithWalls = function(object) {
		var roomWidth = room.width;
		var roomHeight = room.height;

		if (((object.Intrinsic.centerPoint.x + object.Intrinsic.radius) > room.width)){
		object.Intrinsic.stop();
		object.Intrinsic.centerPoint.x = Math.floor(room.width - object.Intrinsic.radius);
			//logger.log('object hit right wall!');

		}
		else if (((object.Intrinsic.centerPoint.y + object.Intrinsic.radius) > room.height)){
			//logger.log('object hit bottom wall');
		object.Intrinsic.stop();
		object.Intrinsic.centerPoint.y = Math.floor(room.height - object.Intrinsic.radius);
		}
		else if (((object.Intrinsic.centerPoint.y - object.Intrinsic.radius) < 0)){
			//logger.log('object hit top wall');	
		object.Intrinsic.stop();
		object.Intrinsic.centerPoint.y = Math.floor(object.Intrinsic.radius);
		}
		else if (((object.Intrinsic.centerPoint.x - object.Intrinsic.radius) < 0)){
			//logger.log('Ant hit left wall');
		object.Intrinsic.stop();
		object.Intrinsic.centerPoint.x = Math.floor(object.Intrinsic.radius);
		}
	}

	this.detectCollisionWithWallsBoolean = function(object) {
		var roomWidth = room.width;
		var roomHeight = room.height;

		if (((object.Intrinsic.centerPoint.x + object.Intrinsic.radius) >= room.width)){
			//logger.log('Ant hit right wall!');
			return true;
		}
		else if (((object.Intrinsic.centerPoint.y + object.Intrinsic.radius) >= room.height)){
			//logger.log('Ant hit bottom wall');
			return true;
		}
		else if (((object.Intrinsic.centerPoint.y - object.Intrinsic.radius) <= 0)){
			//logger.log('Ant hit top wall');
			return true;
		}
		else if (((object.Intrinsic.centerPoint.x - object.Intrinsic.radius) <= 0)){
			//logger.log('Ant hit left wall');
			return true;
		}
	}	
}