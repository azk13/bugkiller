function AI(){


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
function getNearestAntIndex(enemy,indextoexclude)
{
        var ants = room.getAnts();
        var prevDistance=999999,Distance =0;
        var Index = 0;
        for(var i=0;i<ants.length;i++)
        {
            Distance=math.getDistanceBetweenTwoPoints(enemy.Intrinsic.centerPoint,ants[i].Intrinsic.centerPoint);
           if(i!=indextoexclude)
             if(Distance<prevDistance)
               {
                   Index=i;
                   prevDistance=Distance;
               }
        }
        return Index;

  }
/************************************
     Input : Enemy centrepoint,player centre point,how many cells to check
     Output: True if Enemy no of cells  from bee cell
     ************************************/
function checkEnemyFromBob(enemy,player,noOfCells)
{
  var checkdistance=room.cellsize*noOfCells;
  var distance =math.getDistanceBetweenTwoPoints(enemy,player);
  if(distance<=checkdistance)
    return true;
  else
    return false;
}
this.attackNearestBasket = function(enemy)
{
  var baskets = room.getBaskets();
  pathfinding.objectgo(enemy,baskets[getNearestBasketIndex(enemy)]);
}
/************************************
 Input : ant that need to go to the nearest ant and its index
 Output: The enemy move to nearest ant
************************************/
this.antMoveToNearestAnt=function(enemy,ants,excludeindex)
{
 pathfinding.objectgo(enemy,ants[getNearestAntIndex(enemy,excludeindex)]);
}
/************************************
Input : Ant,bob
Output:Decide whether this ant can attack bob and then attack
************************************/
 this.antAttackBob=function(ant,bob)
 {
     //Todo must implement attack function for the ant to attack

     //how many cell difference
     var noofCells=5;
     //ant properties
     var antCenterPoint=ant.Intrinsic.centerPoint;
     var anthealth=ant.Intrinsic.health;
     var anthasweapon=ant.hasWeapons();
     //player properties
     var bobCenterPoint =bob.Intrinsic.centerPoint;
     var bobhealth=bob.health;
     var bobhasWeapons=bob.hasWeapons();

     var attack=false;
    // check whether ant is within no of cells specified
    if(checkEnemyFromBob(antCenterPoint,bobCenterPoint,noofCells))
    {
        //move towards the bob first
        pathfinding.objectgo(ant,bob);
         //if ant health below 10%  and has weapon just try to attack and die
         if(anthealth<10&anthasweapon)
         {
             attack=true;
         }
         //if anthealth is greater than bob health and ant has a weapon
         else if((anthealth>bobhealth)&&anthasweapon)
         {
             attack =true
         }
         // bobhashealth is greater than 70 %  and no weapon go then attach
         else if(!bobhasWeapons&&bobhealth>70)
         {
             attack=true

         }
      }
     // any of the above three conditions meet
     if(attack)
     {
         //find bob
         pathfinding.objectgo(ant,bob);
         //and attack him
     }

 }
/************************************
Input : Ant,bob
 Output:Decide whether this ant can attack bob
************************************/
 this.antDefendBob=function(ant,bob)
 {


 }
/************************************
Input : All the Ants and bob and the index of the ant
Output: Id ant is 10 cells closet to bob it will move towards another ant
 ************************************/
 this.antfleefromBob=function(ants,bob)
 {
     //if bob is 3 cell away from ant
        var  noofcells=3;
     var antCenterPoint;
     var bobCenterPoint=bob.Intrinsic.centerPoint;;
     for(var i=0;i<ants.length;i++)
     {
         antCenterPoint=ants[i].Intrinsic.centerPoint;;

     if(checkEnemyFromBob(antCenterPoint,bobCenterPoint,noofcells))
     {
         this.antMoveToNearestAnt(ants[i],ants,i)
     }
     }

 }
/************************************
Input : Ants which need to pickup health
 Output: Ant will pickup health
************************************/
 this.antpickUpHealth=function(ant)
 {

 }
 this.pickedUpWeapon = function(row, column){

		var weaponIdentity;

		weaponIdentity = room.map[row][column].weapon.identity;
		weaponIndex = room.map[row][column].weapon.index;


		switch(weaponIdentity)
		{
			case 'Knife':
			  	document.getElementById("knife-picked").innerHTML = 1;
			  	player.hasKnifeEquipped = true;
                player.knifeHealth = 100;
			  	break;
			case 'Bomb':
			  	document.getElementById("bomb-picked").innerHTML = 1;
			  	player.hasBombEquipped = true;
                player.bombHealth = 100;
			  	break;
			case 'Shuriken':
				document.getElementById("shuriken-picked").innerHTML = 1;
				player.hasShurikenEquipped = true;
                player.shurikenHealth = 100;
				break;
			default:
			  	break;
		}

        // Update the Room's knowledge of existing weapons
		this.updateWeapon(weaponIndex);
 }

 this.stepBombCheck = function(enemy){
    var enemyRow = enemy.Intrinsic.cellPos.x;
    var enemyColumn = enemy.Intrinsic.cellPos.y;
    var enemyType = enemy.identity;
    var bombLocation = room.map[enemyRow][enemyColumn].weapon;

    if(bombLocation.activeBomb == true) {
        // delete the enemy
        if(enemyType == 'bee') {
            this.bombBlast();
            bees.splice(enemy.index, 1);
            // update all enemy's location in the wewapons array
            for(var k=0; k<bees.length; k++){
                bees[k].index = k;
            }
        } else if (enemyType == 'ant') {
            ants.splice(enemy.index, 1);
            // update all enemy's location in the wewapons array
            for(var k=0; k<ants.length; k++){
                ants[k].index = k;
            }
        }
       this.updateWeapon(bombLocation.index);
    }
 }
 
 this.bombBlast = function(){
    var blastRadius = 100;
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 100, 100, 100);
    //alert('entered BombBlast');
    //setTimeout( this.bombBlast(), 1 );
}


 // jensen
 this.updateWeapon = function(weaponIndex){

    // delete weapon
    weapons.splice(weaponIndex, 1);

    // update the weapon's location in the weapons array
    for(var k=0; k<weapons.length; k++){
        weapons[k].index = k;
    }
 }


this.antclose = function(ant)
{
  if(math.getDistanceBetweenTwoPoints(player.Intrinsic.centerPoint,ant.Intrinsic.centerPoint) < (room.cellsize*1.5))
    {
        var antcell = ant.Intrinsic.cellPos;
        var playercell = player.Intrinsic.cellPos;


        if( ((antcell.y == playercell.y) && ant.Intrinsic.direction.toFixed(2) == (Math.PI/2).toFixed(2) && playercell.x>antcell.x) || ((antcell.y == playercell.y) && ant.Intrinsic.direction.toFixed(2) == (Math.PI*3/2).toFixed(2) && playercell.x<antcell.x) || ((antcell.x == playercell.x) && ant.Intrinsic.direction == 0 && playercell.y>antcell.y) || ((antcell.x == playercell.x) && ant.Intrinsic.direction.toFixed(2) == Math.PI.toFixed(2) && playercell.y<antcell.y) )
        {
        //alert("health decreasing");
        console.log(antcell.y+":"+playercell.y);
        player.Intrinsic.health -= ant.Intrinsic.attackrating;
        renderingEngine.setBobHealth();
        }
    }
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
}