function Boundcheck(){

	this.detectCollisionWithWalls = function(object) {
		var roomWidth = room.width;
		var roomHeight = room.height;

		if (((object.Intrinsic.centerPoint.x + object.Intrinsic.radius) > room.width)){
		object.Intrinsic.stop();
		object.Intrinsic.centerPoint.x = room.map[0][room.columns-1].point.x;
			//logger.log('object hit right wall!');

		}
		else if (((object.Intrinsic.centerPoint.y + object.Intrinsic.radius) > room.height)){
			//logger.log('object hit bottom wall');
		object.Intrinsic.stop();
		object.Intrinsic.centerPoint.y = room.map[room.rows-1][0].point.y;
		}
		else if (((object.Intrinsic.centerPoint.y - object.Intrinsic.radius) < 0)){
			//logger.log('object hit top wall');	
		object.Intrinsic.stop();
		object.Intrinsic.centerPoint.y = room.map[0][0].point.y;
		}
		else if ((Math.floor(object.Intrinsic.centerPoint.x - object.Intrinsic.radius) < 0)){
		//	logger.log('Ant hit left wall');
		object.Intrinsic.stop();
		object.Intrinsic.centerPoint.x = room.map[0][0].point.x;
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