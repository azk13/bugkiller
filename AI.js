function AI(){


this.attackNearestBasket = function(enemy)
{
	var baskets = room.getBaskets();
	pathfinding.objectgo(enemy,baskets[getNearestBasketIndex(enemy)]);
}

function getNearestBasketIndex(enemy)
{
	var baskets = room.getBaskets();
	var prevDistance=999999,Distance =0;
	var Index = 0;
	for(var i=0;i<baskets.length;i++)
	{
		Distance=math.getDistanceBetweenTwoPoints(enemy.Intrinsic.centerPoint,baskets[i].centerPoint);
		if(Distance<prevDistance)
		{
			Index=i;
			prevDistance=Distance;
		}
	}
return Index;
			
}

 this.antAttackBob=function()
 {
     //get the ants
     var Ants  = room.getAnts();
     var distance =0;
     var distanceFromAntstobob=new Array();
     var centerPointOfPlayer=player.Intrinsic.centerPoint
     var specifics={index:0,Dis:0 }
     for(var i=0;i<Ants.length;i++)
     {
      distance=math.getDistanceBetweenTwoPoints(centerPointOfPlayer,Ants[i].centerPoint);
      distanceFromAntstobob.push(new specifics(i,distance));
     }
     //sort the distance in ascending order with the index to know which ant is the shortest
     distanceFromAntstobob.sort(function(a,b){if (+a.Dis > +b.Dis) return 1;  return -1;});
     for(var i=0;i<specifics.length;i++)
     {
         // if the player centre point is 5 times the centerpoint of ant then attack the player
        if(Ants[specifics.index].centerPoint*5<=centerPointOfPlayer)
        {
            if(Ants[specifics.index].weapons>=1&&Ants[specifics.index].Intrinsic.health>70)
            {
                //move to the player
                pathfinding.objectgo(Ants[specifics.index],player);
                //attack the player
            }
        }
     }

 }

 this.pickedUpWeapon = function(row, column){

		var weaponIdentity;

		weaponIdentity = room.map[row][column].weapon.identity;
		weaponIndex = room.map[row][column].weapon.index;

		switch(weaponIdentity)
		{
			case 'knife':
			  	document.getElementById("knife-picked").innerHTML = 1;
			  	player.hasKnifeEquipped = true;
			  	break;
			case 'bomb':
			  	document.getElementById("bomb-picked").innerHTML = 1;
			  	player.hasBombEquipped = true;
			  	break;
			case 'shuriken':
				document.getElementById("shuriken-picked").innerHTML = 1;
				player.hasShurikenEquipped = true;
				break;
			default:
			  	break;
		}

		// delete weapon
		weapons.splice(weaponIndex, 1);

		// update the weapon's location in the wewapons array
		for(var k=0; k<weapons.length; k++){
			weapons[k].index = k;
		}


 }
 this.moveAntToBob=function(bob,enemy)
 {

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