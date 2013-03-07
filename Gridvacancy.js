function Gridvacancy()
{

		var row, columns; // jensen (used for weapons)
		this.occupancy = function()
	{
		var ants = room.getAnts();
		var bees = room.getBees();
		var baskets = room.getBaskets();
		var weapons = room.getWeapons();		

		//Initialize all occupancy zero;
		for(var i=0;i<room.rows;i++)
		{
			for(var j=0;j<room.columns;j++)
			{
				room.map[i][j].occupied = false;
				room.map[i][j].isBob = false;
				room.map[i][j].isBasket = false;
				room.map[i][j].isEnemy = false;
				room.map[i][j].isWeapon = false;
				if(player.Intrinsic.centerPoint.x == room.map[i][j].point.x && player.Intrinsic.centerPoint.y == room.map[i][j].point.y)
					{
						room.map[i][j].occupied=true;
						room.map[i][j].isBob = true;
						player.Intrinsic.cellpos.x = i;
						player.Intrinsic.cellpos.y = j;

					}
				for(var k=0;k<ants.length;k++)
				{
					if(ants[k].Intrinsic.centerPoint.x == room.map[i][j].point.x && ants[k].Intrinsic.centerPoint.y == room.map[i][j].point.y)
					{
						room.map[i][j].occupied=true;
						room.map[i][j].isEnemy = true;
						ants[k].Intrinsic.cellpos.x = i;
						ants[k].Intrinsic.cellpos.y = j;
					}		
				}
				for(var k=0;k<bees.length;k++)
				{
					if(bees[k].Intrinsic.centerPoint.x == room.map[i][j].point.x && bees[k].Intrinsic.centerPoint.y == room.map[i][j].point.y)
					{
						room.map[i][j].occupied=true;
						room.map[i][j].isEnemy = true;
						bees[k].Intrinsic.cellpos.x = i;
						bees[k].Intrinsic.cellpos.y = j;						
					}		
				}		
				for(var k=0;k<baskets.length;k++)
				{
					if(baskets[k].Intrinsic.centerPoint.x == room.map[i][j].point.x && baskets[k].Intrinsic.centerPoint.y == room.map[i][j].point.y)
					{
						room.map[i][j].occupied=true;
						room.map[i][j].isBasket = true;
						baskets[k].Intrinsic.cellpos.x = i;
						baskets[k].Intrinsic.cellpos.y = j;					
					}		
				}
				for(var k=0;k<weapons.length;k++)
				{
					if(weapons[k].Intrinsic.centerPoint.x == room.map[i][j].point.x && weapons[k].Intrinsic.centerPoint.y == room.map[i][j].point.y)
					{
				//		room.map[i][j].occupied=true;
				//console.log('loading weapon');

						room.map[i][j].isWeapon = true;
						weapons[k].Intrinsic.cellpos.x = i;
						weapons[k].Intrinsic.cellpos.y = j;						

						// load weapon object in the cell
						room.map[i][j].weapon = weapons[k];

						// set the weapon's row and columns - for picking up weapon purposes ~ jensen


						



					}	
				}											
			}
		}		
	}
}