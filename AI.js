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

this.determineMaxant=function(time,max)
{
    var ymax_time = 0.9;
    var secdiv= 93/ymax_time;
    var tensiondivision=1/secdiv;
    var newTime= time/tensiondivision;
    var maxAnt =Math.round(newTime +Math.sin((2*newTime)-1)+Math.sin(9*newTime)+(max-2.5));

    return maxAnt;
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
        if(distance <= room.cellsize*2){
            ants.splice(ants.indexOf(ants[k]),1);
            player.kills++;
        }else{
            k++;
        }
    }

    for(var k=0; k<bees.length; ){
        var distance =math.getDistanceBetweenTwoPoints(bees[k].Intrinsic.centerPoint,bombLocation.Intrinsic.centerPoint);
        if(distance <= room.cellsize*2){
            bees.splice(ants.indexOf(bees[k]),1);
            player.kills++;
        }else{
            k++;
        }
    }

}
//ant attack function Azri
 this.antclose = function(ant){
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
//Bee's action when player comes within his range Azri
 this.beeclose = function(bee){
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
        if((beecell.y == playercell.y) && playercell.x>beecell.x) 
        {
            bee.Intrinsic.direction = Math.PI/2;
            bee.stingpos.x = bee.Intrinsic.centerPoint.x;
            bee.stingpos.y = bee.Intrinsic.centerPoint.y;
            bee.stingdir ='down';                                        
        }
        //shoot up
        else if((beecell.y == playercell.y) && playercell.x<beecell.x) 
        {
            bee.Intrinsic.direction = Math.PI*3/2;            
            bee.stingpos.x = bee.Intrinsic.centerPoint.x;
            bee.stingpos.y = bee.Intrinsic.centerPoint.y;
            bee.stingdir = 'up';       
        }
        //shoot right
        else if((beecell.x == playercell.x) && playercell.y>beecell.y) 
        {
            bee.Intrinsic.direction = 0;            
            bee.stingpos.x = bee.Intrinsic.centerPoint.x;
            bee.stingpos.y = bee.Intrinsic.centerPoint.y;
            bee.stingdir = 'right';                     
        }
        //shoot left
        else if((beecell.x == playercell.x)  && playercell.y<beecell.y)
        {
            bee.Intrinsic.direction = Math.PI;            
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



  //Basic staging and spawning stuff  Azri & Jensen
 this.Action = function(enemy) 
    {
        var enemyarray;
        var segment = 1;
        var timenow = Math.round((Date.now() - start_time)/1000);
        var stagelength = 30;
        var mysterybox = room.getmysterybox();

        // Global Decision Making
        /************************************/

        // Check Bob Health
        if(player.Intrinsic.health > 70) {

            // 
        }else {

        }

        // Check Bob Attack Power
        if(/* 2 seconds has passed */) {

            if(/*bob kills more than 2 ants in 2 seconds */){

            // Stage 1
            // Bob or Basket (60/40)

            // Stage 2
            // Bob or Basket (70/30)

            // Stage 3
            // Bob or Basket (75/25)

            // Stage 4
            // Bob or Basket (60/40)

            }else {

                // Default
                // Bob or Basket (50/50)
            }
        }
        

        //Setting the different time region
        if(timenow < stagelength)
            {segment = 1;}
        else if(timenow < stagelength*1.1)
            {segment = 12;}
        else if(timenow < stagelength*2)
            {segment = 2;}        
        else if(timenow < stagelength*2.1)
            {segment = 23;}
        else if(timenow < stagelength*3)
            {segment = 3;}
        else if(timenow < stagelength*3.1)
            {segment = 34;}
        else
            {segment = 4;}

        switch(segment){
        case 1: //------------------------stage 1------------------------------------
        document.getElementById("stage-level").innerHTML = 1;        
        if(enemy.identity == 'ant')
            {room.spawnEnemies(room.maxAnts,enemy.identity);}
        else
            {room.spawnEnemies(room.maxBees,enemy.identity);}
        mysterybox.stage = 1;  // Mysterybox spawns the item according to the stage (HS)
        break;
        case 2: //------------------------stage 2------------------------------------
        document.getElementById("stage-level").innerHTML = 2;
        if(enemy.identity == 'ant')
            {room.spawnEnemies(room.maxAnts,enemy.identity);}
        else
            {room.spawnEnemies(room.maxBees,enemy.identity);}        

        mysterybox.stage = 2;
        break;
        case 3: //------------------------stage 3------------------------------------
        if(bees.length == 0)
            {room.spawnEnemies(1,'bee');}
        document.getElementById("stage-level").innerHTML = 3;
        if(enemy.identity == 'ant')
            {room.spawnEnemies(room.maxAnts,enemy.identity);}
        else
            {room.spawnEnemies(room.maxBees,enemy.identity);}        
        mysterybox.stage = 3;
        break;

        case 4: //------------------------stage 4------------------------------------
        document.getElementById("stage-level").innerHTML = 4;          
        if(room.finalStageSpawn == true)
        {
            if(player.skill == 'good')
            {
                room.spawnEnemies(10,'ant');
                room.spawnEnemies(4,'bee');                
            }
            else // player is bad
            {
                room.spawnEnemies(7,'ant');
                room.spawnEnemies(2,'bee');
            }
            room.finalStageSpawn = false;
        }
        mysterybox.stage = 4;

        break;
        default://The place where player's ability is checked        
        if(segment == 12)//Transmission from stage 1 to stage 2
        {
        document.getElementById("stage-level").innerHTML = 1.2;
        //ensure that there is at least an ant
        if(ants.length == 0)
          {room.spawnEnemies(1,'ant');}            
        //check if player is good or bad            
        if(player.kills > 5 || player.Intrinsic.health>70)
            {
                player.skill = 'good';
                document.getElementById("player-skill").innerHTML = 'Good';
                room.maxAnts = 10;
            }
        else
            {
                player.skill = 'bad';
                document.getElementById("player-skill").innerHTML = 'Bad';
                room.maxAnts = 5;
            }   
        }
        else if(segment == 23)//Transmission from stage 2 to stage 3
        {
            document.getElementById("stage-level").innerHTML = 2.3;
            //ensure that there is at least an ant
            if(ants.length == 0)
              {room.spawnEnemies(1,'ant');}
              //check if player is good or bad            
            if(player.kills > 10 || player.Intrinsic.health>70)
              {
                player.skill = 'good';
                document.getElementById("player-skill").innerHTML = 'Good';
                room.maxAnts = 7;
                room.maxBees = 3;
              }
            else
              {
                player.skill = 'bad';
                document.getElementById("player-skill").innerHTML = 'Bad';
                room.maxAnts = 5;
                room.maxBees = 1;
              }   

        } 
        else // transition of stage 3 to 4
          {
            document.getElementById("stage-level").innerHTML = 3.4;  
            room.finalStageSpawn = true;
          }//last else of segment checks
        break;
        mysterybox.stage = 0;
        }//end of the switch
    
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