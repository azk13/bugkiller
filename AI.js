function AI(){

    var enemyKilledPrev = 0; // Used in this.Action
    var time_previous = 0; // Used in this.Action

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
    { var baskets = room.getBaskets();
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
        var secdiv = ymax_time/93;
        var tensiondivision=1/secdiv;
        var newTime = (time/tensiondivision);
        var maxAnt = Math.round(newTime +Math.sin((2*newTime)-1)+Math.sin(9*newTime)+(max-2.5));
//    console.log("Max Ants:"+maxAnt);
        return maxAnt;
    }

    this.pickedUpWeapon = function(row, column){
        var weaponIdentity;
        weaponIdentity = room.map[row][column].weapon.identity;

        if(room.map[row][column].weapon.activeBomb ==  true){

        }else{
            weaponIndex = weapons.indexOf(room.map[row][column].weapon);
            // delete weapon from weapons array
            weapons.splice(weaponIndex, 1);
        }


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
            room.map[enemyRow][enemyColumn].weapon.activeBomb = false;

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

    this.antAttackrating = function(ant,identity)
    {
        var baskets = room.getBaskets();
        var firstTension = 25,secondTension = 88;
        var timenow = Math.round((Date.now() - start_time)/1000);
        ant.Intrinsic.attackrating = 0.5;

        if(timenow < (firstTension+5) && timenow > firstTension)
        {
            console.log("Tension 1 occuring");
            ant.Intrinsic.attackrating = baskets[getNearestBasketIndex(ant)].Intrinsic.health*0.05;
        }


        if((timenow < (secondTension+5) && timenow > secondTension))
        {
            console.log("Tension 2 occuring");
            ant.Intrinsic.attackrating = player.Intrinsic.health*0.05;
        }

    }

//ant attack function Azri
    this.antclose = function(ant){

        var antcell = ant.Intrinsic.cellPos;
        ant.Intrinsic.attackcolor = 'blue';
        if(math.getDistanceBetweenTwoPoints(player.Intrinsic.centerPoint,ant.Intrinsic.centerPoint) < (room.cellsize*1.5))
        {
            var playercell = player.Intrinsic.cellPos;


            if( ((antcell.y == playercell.y) && ant.Intrinsic.direction.toFixed(2) == (Math.PI/2).toFixed(2) && playercell.x>antcell.x) || ((antcell.y == playercell.y) && ant.Intrinsic.direction.toFixed(2) == (Math.PI*3/2).toFixed(2) && playercell.x<antcell.x) || ((antcell.x == playercell.x) && ant.Intrinsic.direction == 0 && playercell.y>antcell.y) || ((antcell.x == playercell.x) && ant.Intrinsic.direction.toFixed(2) == Math.PI.toFixed(2) && playercell.y<antcell.y) )
            {
                //       alert("health decreasing");
                //       console.log(antcell.y+":"+playercell.y);
                player.Intrinsic.health -= ant.Intrinsic.attackrating;
                if(ant.Intrinsic.isattacking)
                {ant.Intrinsic.attackcolor = 'red';}
                else
                {ant.Intrinsic.attackcolor = 'green';}
                ant.Intrinsic.isattacking = !ant.Intrinsic.isattacking;
                renderingEngine.setBobHealth();
            }



        }

        var baskets = room.getBaskets();

        for(var i=0;i<baskets.length;i++)
        {
            if(math.getDistanceBetweenTwoPoints(baskets[i].Intrinsic.centerPoint,ant.Intrinsic.centerPoint) < (room.cellsize*1.5))
            {
                var basketscell = baskets[i].Intrinsic.cellPos;


                if( ((antcell.y == basketscell.y) && ant.Intrinsic.direction.toFixed(2) == (Math.PI/2).toFixed(2) && basketscell.x>antcell.x) || ((antcell.y == basketscell.y) && ant.Intrinsic.direction.toFixed(2) == (Math.PI*3/2).toFixed(2) && basketscell.x<antcell.x) || ((antcell.x == basketscell.x) && ant.Intrinsic.direction == 0 && basketscell.y>antcell.y) || ((antcell.x == basketscell.x) && ant.Intrinsic.direction.toFixed(2) == Math.PI.toFixed(2) && basketscell.y<antcell.y) )
                {
                    baskets[i].Intrinsic.health -= ant.Intrinsic.attackrating;
                    if(ant.Intrinsic.isattacking)
                    {ant.Intrinsic.attackcolor = 'brown';}
                    else
                    {ant.Intrinsic.attackcolor = 'purple';}
                    ant.Intrinsic.isattacking = !ant.Intrinsic.isattacking;
                    //remove basket if destroyed
                    if(baskets[i].Intrinsic.health <= 0)
                    {
                        baskets.splice(baskets.indexOf(baskets[i]),1);
                    }
                }
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

// Dynamic AI Decision Making
    /************************************/

// based on flags, give commands to AI
    this.AiCommander = function(enemy){

      if(enemy.Intrinsic.lawflag == false)
      {
        if(enemy.Intrinsic.defaultA) // attackbob
        {pathfinding.objectgo(enemy,player);}
        else //attackbasket
        {this.attackNearestBasket(enemy);}
      }
      else // lawflag activated
      {
        if(enemy.Intrinsic.lawA) // attackbob
        {pathfinding.objectgo(enemy,player);}
        else //attackbasket
        {this.attackNearestBasket(enemy);}    
      }


    }

    this.bobHealthGlobal = function(){
        // Check Bob Health
        if(player.Intrinsic.health > 70) {

            //
        }else {

        }
    }

    this.bobKillStrength = function(ant, attackBobPercent){
        var enemyKilledNow = player.kills;
        var timeNow = Date.now();

        // Check Bob Attack Power

        // For every 3 seconds
        if((timeNow-time_previous)/1000 > 3 ) {
            //console.log('entered Loop 1');
            //console.log('The number of enemies killed is ' +(enemyKilledNow - enemyKilledPrev));

            // Enemies killed by Bob is more than 2
            if(enemyKilledNow - enemyKilledPrev > 2 && !ant.Intrinsic.killflag){

                //console.log('entered Loop 2');
                // Stage 1
                // Bob or Basket (60/40)
                if(Math.random() < (attackBobPercent / 100)){
                    pathfinding.objectgo(ant, player);
                }else{
                    this.attackNearestBasket(ant);
                }

            ant.Intrinsic.killflag = true;
            }


            time_previous = timeNow;
            enemyKilledPrev = enemyKilledNow;
        }
    }

    //Basic staging and spawning stuff  Azri & Jensen
    this.Action = function(enemy,length)
    {

        var segment = 1;
        var timenow = (Date.now() - start_time)/1000;
        var stagelength = 30;
        var mysterybox = room.getmysterybox();
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
                {
                    room.maxAnts = this.determineMaxant(timenow,10);
                    room.spawnEnemies(room.maxAnts,enemy.identity);

                    this.bobKillStrength(enemy, 60);

                    if(!enemy.Intrinsic.defaultActivated);
                    {
                      if(Math.random() < 0.4)
                      {enemy.Intrinsic.defaultA = true;}
                      else
                      {}   
                      enemy.Intrinsic.defaultActivated = true;       
                    }

//                    if(!enemy.Intrinsic.lawActivated);
//                    {
//                      if(Math.random() < 0.5)
//                      {enemy.Intrinsic.defaultA = true;}
//                      else
//                      {}   
//                      enemy.Intrinsic.lawActivated = true;       
 //                   }                    

                    //if(law flag is false || default flag == true)
                    //default: bob or basket 50/50
                    //if (2 ants killed in 3 sec and ant law flag is false && default flag is false)
                    //if(Math.random < 0.5)
                    //bob or basket 60/40,  raise law flag for particular ant
                    //else
                    //default flag = true

                    //if(lawflag)
                    //bob or basket 60/40

                    //console.log("tension curve ant :" + this.determineMaxant(timenow,10) + " maxAnt :"+room.maxAnt);

                    this.AiCommander(enemy);

                }
                else
                {
                    room.spawnEnemies(room.maxBees,enemy.identity);
                    this.AiCommander(enemy);
                }
                mysterybox.stage = 1;  // Mysterybox spawns the item according to the stage (HS)


                break;

            case 2: //------------------------stage 2------------------------------------
                document.getElementById("stage-level").innerHTML = 2;
                if(enemy.identity == 'ant')
                {
                    room.maxAnts = this.determineMaxant(timenow,10);
                    room.spawnEnemies(room.maxAnts,enemy.identity);

                    this.bobKillStrength(enemy, 70);

                    //if(law flag is false || default flag == true)
                    //default: bob or basket 50/50
                    //if (2 ants killed in 3 sec and ant law flag is false && default flag is false)
                    //if(Math.random < 0.5)
                    //bob or basket 60/40,  raise law flag for particular ant
                    //else
                    //default flag = true

                    //if(lawflag)
                    //bob or basket 70/30

                    this.AiCommander(enemy);


                }
                else
                {
                    room.spawnEnemies(room.maxBees,enemy.identity);
                    this.AiCommander(enemy);
                }

                mysterybox.stage = 2;
                break;
            case 3: //------------------------stage 3------------------------------------
                if(bees.length == 0)
                {room.spawnEnemies(1,'bee');}
                document.getElementById("stage-level").innerHTML = 3;
                if(enemy.identity == 'ant')
                {
                    room.maxAnts = this.determineMaxant(timenow,10);
                    room.spawnEnemies(room.maxAnts,enemy.identity);

                    this.bobKillStrength(enemy, 75);
                    //if(law flag is false || default flag == true)
                    //default: bob or basket 50/50
                    //if (2 ants killed in 3 sec and ant law flag is false && default flag is false)
                    //if(Math.random < 0.5)
                    //bob or basket 60/40,  raise law flag for particular ant
                    //else
                    //default flag = true

                    //if(lawflag)
                    //bob or basket 75/25

                    this.AiCommander(enemy);

                }
                else
                {
                    room.spawnEnemies(room.maxBees,enemy.identity);
                    this.AiCommander(enemy);
                }
                mysterybox.stage = 3;
                break;

            case 4: //------------------------stage 4------------------------------------
                document.getElementById("stage-level").innerHTML = 4;
                this.bobKillStrength(enemy, 75);


                if(room.finalStageSpawn == true)
                {

                    if(player.skill == 'good')
                    {
                        room.spawnEnemies(10,'ant');
                        room.spawnEnemies(4,'bee');
                        //    console.log("Finalstagespawn:"+ room.finalStageSpawn + " ant length:" + length);
                        if(length >= 10)
                        {room.finalStageSpawn = false;}
                    }
                    else // player is bad
                    {
                        room.spawnEnemies(7,'ant');
                        room.spawnEnemies(2,'bee');
                        if(length >= 7)
                        {room.finalStageSpawn = false;}
                    }

                }
                mysterybox.stage = 4;

                break;
            default://The place where player's ability is checked
                if(segment == 12)//Transmission from stage 1 to stage 2
                {
                    document.getElementById("stage-level").innerHTML = 1.2;

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
}