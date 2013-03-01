function AI(){


this.attackNearestBasket = function(enemy)
{
	var baskets = room.getBaskets();
	pathfinding.objectgo(enemy,baskets[getNearestBasketIndex(enemy)]);
}

function getNearestBasketIndex(enemy)
{
	var baskets = room.getBaskets();
	var prevDistance=0,Distance =0;
	var Index = 0;
	for(var i=0;i<baskets.length;i++)
	{
		Distance=math.getDistanceBetweenTwoPoints(enemy.Intrinsic.centerPoint,baskets[i].centerPoint);
		if(Distance>prevDistance)
		{
			Index=i;
			prevDistance=Distance;
		}
	}
return Index;
			
}



this.Action = function(enemies)
{
}


	function ToWin(enemies)
	{


	}

	function ToLose(enemies)
	{


	}


	function Attack(enemies,bob)
	{

	}

	function Defend(self)
	{

	}

	function Construct(self)
	{

	}

}