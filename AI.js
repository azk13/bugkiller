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

        weaponIndex = weapons.indexOf(room.map[row][column].weapon);
        // delete weapon from weapons array
        weapons.splice(weaponIndex, 1);

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
        
 }

 this.stepBombCheck = function(enemy){
    var enemyRow = enemy.Intrinsic.cellPos.x;
    var enemyColumn = enemy.Intrinsic.cellPos.y;
    var enemyType = enemy.identity;
    var bombLocation = room.map[enemyRow][enemyColumn].weapon;

    if(bombLocation.activeBomb == true) {

        this.bombBlast(bombLocation);

        // Get Bomb's location in weapons array
        weaponIndex = weapons.indexOf(bombLocation);
        // delete weapon from weapons array
        weapons.splice(weaponIndex, 1);

    }
 }
 
 this.bombBlast = function(bombLocation){

    for(var k=0; k<ants.length; ){
        var distance =math.getDistanceBetweenTwoPoints(ants[k].Intrinsic.centerPoint,bombLocation.Intrinsic.centerPoint);
        if(distance <= 400){
            ants.splice(ants.indexOf(ants[k]),1);
            player.kills++;
        }else{
            k++;
        }
    }

    for(var k=0; k<bees.length; ){
        var distance =math.getDistanceBetweenTwoPoints(bees[k].Intrinsic.centerPoint,bombLocation.Intrinsic.centerPoint);
        if(distance <= 400){
            bees.splice(ants.indexOf(bees[k]),1);
            player.kills++;
        }else{
            k++;
        }
    }

}




//ant attack function Azri
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

this.beeclose = function(bee)
{
    bee.Intrinsic.attackrating = 5;
    var count = 5;
  if(math.getDistanceBetweenTwoPoints(player.Intrinsic.centerPoint,bee.Intrinsic.centerPoint) < (room.cellsize*5.2))
    {
        var beecell = bee.Intrinsic.cellPos;
        var playercell = player.Intrinsic.cellPos;

        if(bee.shootcounter == count)
        {
        //alert("bee shoot");
        //shoot down
        if((beecell.y == playercell.y) && bee.Intrinsic.direction.toFixed(2) == (Math.PI/2).toFixed(2) && playercell.x>beecell.x) 
        {
            bee.stingpos.x = bee.Intrinsic.centerPoint.x;
            bee.stingpos.y = bee.Intrinsic.centerPoint.y;
            bee.stingdir ='down';                                        
        }
        //shoot up
        else if((beecell.y == playercell.y) && bee.Intrinsic.direction.toFixed(2) == (Math.PI*3/2).toFixed(2) && playercell.x<beecell.x) 
        {
            bee.stingpos.x = bee.Intrinsic.centerPoint.x;
            bee.stingpos.y = bee.Intrinsic.centerPoint.y;
            bee.stingdir = 'up';       
        }
        //shoot right
        else if((beecell.x == playercell.x) && bee.Intrinsic.direction == 0 && playercell.y>beecell.y) 
        {
            bee.stingpos.x = bee.Intrinsic.centerPoint.x;
            bee.stingpos.y = bee.Intrinsic.centerPoint.y;
            bee.stingdir = 'right';                     
        }
        //shoot left
        else if((beecell.x == playercell.x) && bee.Intrinsic.direction.toFixed(2) == Math.PI.toFixed(2) && playercell.y<beecell.y)
        {
            bee.stingpos.x = bee.Intrinsic.centerPoint.x;
            bee.stingpos.y = bee.Intrinsic.centerPoint.y;            
            bee.stingdir = 'left';            
        }

        }//bee shootcounter ==5
    bee.shootcounter--;
    if(bee.shootcounter <= 0)
    {bee.shootcounter=count;}        
    }//end of if distance within range
    else
        {
 //           bee.stingpos.x = bee.stingpos.y = 9999;
            bee.shootcounter = count;
        }

}



 this.Action = function(enemy)
    {
        var enemyarray;
        var segment = 1;
        var timenow = Math.round((Date.now() - start_time)/1000);
        var stagelength = 10;

        if(timenow < stagelength)
            {segment = 1;}
        else if(timenow < stagelength*2)
            {segment = 99;}
        else if(timenow < stagelength*2.5)
            {segment = 2;}        
        else if(timenow < stagelength*3)
            {segment = 99;}
        else 
            {segment = 3;}


        switch(segment){
        case 1:
        //stage 1
        document.getElementById("stage-level").innerHTML = 1;        
        if(enemy.identity == 'ant')
            {room.spawnEnemies(room.maxAnts,enemy.identity);}
        else
            {room.spawnEnemies(room.maxBees,enemy.identity);}

//        console.log("Stage 1:"+timenow);
//        alert("stage1");
        break;
        case 2:
        document.getElementById("stage-level").innerHTML = 2;
//        console.log("Stage 2:"+timenow);
//        alert("stage2");
        //stage 2
        break;
        case 3:
        document.getElementById("stage-level").innerHTML = 3;
//        console.log("Stage 3:"+timenow);
//        alert("stage3");
        //stage 3
        break;

        default:
        //processing player behavior
        if(player.kills > 5 || player.Intrinsic.health>70)
            {player.skill = 'good';}
        else
            {player.skill = 'bad';}
   //     alert("Processing player ability");
        break;

    }
    
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