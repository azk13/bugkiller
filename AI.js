
function AI(){
    this.endTimer =0;
    var enemyKilledPrev = 0; // Used in this.Action
    var time_previous = 0; // Used in this.Action
    var previousdistance = math.getDistanceBetweenTwoPoints(baskets[0].Intrinsic.centerPoint,player.Intrinsic.centerPoint);

//Muhammad Azri A0073951B
    function getNearestBasketIndex(enemy){
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
    function getNearestAntIndex(enemy,indextoexclude) {
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
//Rengaswamy A0073676U
    function checkEnemyFromBob(enemy,player,noOfCells) {
        var checkdistance=room.cellsize*noOfCells;
        var distance =math.getDistanceBetweenTwoPoints(enemy,player);
        if(distance<=checkdistance)
            return true;
        else
            return false;
    }
    function lowestBasketHealthIndex(baskets) {
        var index = 0;
        for(var i=0; i<baskets.length;i++)
        {
            if(baskets[i].Intrinsic.health < baskets[index].Intrinsic.health)
            {
                index = i;
            }
        }
        return index;
    }
//Muhammad Azri A0073951B    
    this.attackDyingBasket = function(enemy) {

        var ants=room.getAnts();
        var baskets = room.getBaskets();
        var attack =true

        pathfinding.objectgo(enemy,baskets[lowestBasketHealthIndex(baskets)]);


    }    
    this.attackNearestBasket = function(enemy) {

        var ants=room.getAnts();
        var baskets = room.getBaskets();
        var attack =true
        for(var i=0;i<ants.length;i++)
        {
            if(ants[i].Intrinsic.ClusterFlag==true)
            {

                enemy.Intrinsic.addGoal(6);
                enemy.Intrinsic.addGoal(5);

                attack=false;
                break;
            }
        }
        if(attack==true)
        pathfinding.objectgo(enemy,baskets[getNearestBasketIndex(enemy)]);
    }

//Rengaswamy A0073676U    
    this.attackBasket = function(enemy) {

        var ants=room.getAnts();
        var baskets = room.getBaskets();
        var attack =true
        for(var i=0;i<ants.length;i++)
        {
            if(ants[i].Intrinsic.ClusterFlag==true)
            {
                enemy.Intrinsic.addGoal(6);
                enemy.Intrinsic.addGoal(5);

                attack=false;
                break;
            }
        }
        if(attack==true)

            pathfinding.objectgo(enemy,baskets[renderingEngine.randombasket]);


    }
    /************************************
     Input : ant that need to go to the nearest ant and its index
     Output: The enemy move to nearest ant
     ************************************/
//Rengaswamy A0073676U     
    this.antMoveToNearestAnt=function(enemy,ants,excludeindex){
        var nearestant= getNearestAntIndex(enemy,excludeindex)
        if(checkEnemyFromBob(enemy,ants[nearestant],1))
        {enemy.Intrinsic.removeGoal();}
        else
        {pathfinding.objectgo(enemy,ants[nearestant]);}
    }
    /************************************
     Input : Ant,bob
     Output:Decide whether this ant can attack bob and then attack
     ************************************/   
    this.antAttackBobnew=function(enemy){
        var attack =true;
        var ants=room.getAnts();
        var bobhealth=player.Intrinsic.health;
        var bobUsingKnife=player.activeWeapon;
        for(var i=0;i<ants.length;i++)
        {
            if(ants[i].Intrinsic.ClusterFlag==true)
            {
                if(enemy.Intrinsic.goals.length==0)
                {
                    this.tossCoin(enemy,50);                    
                }
                enemy.Intrinsic.addGoal(6);  //this should be according to the others
                enemy.Intrinsic.addGoal(5);
                attack=false;
                break;
            }
        }
        //if anthealth is greater than bob health and ant has a weapon
/*        if((bobhealth>80)&&(bobUsingKnife=="Knife")&&(checkEnemyFromBob(enemy.Intrinsic.centerPoint,player.Intrinsic.centerPoint,1)))
       {
           //alert("Im fleeing");
           this.antfleefromBob(enemy);
           attack=false;
        }*/
        if(attack==true){
           pathfinding.objectgo(enemy,player);
        }
    }
    /************************************
     Input : All the Ants and bob and the index of the ant
     Output: Id ant is 10 cells closet to bob it will move towards another ant
     ************************************/
    this.antCluster=function(ant)   {
        var condition = true;
        var ants = room.getAnts();
        var clusterpoint=room.map[renderingEngine.randomRow][renderingEngine.randomCol].point;
        var dummy= new Dummy(clusterpoint);
        if(!checkEnemyFromBob(ant.Intrinsic.centerPoint,dummy.Intrinsic.centerPoint,1))
        {
            pathfinding.objectgo(ant,dummy);            
        }

        for(var i=0;i<ants.length;i++)
        {
        if(!checkEnemyFromBob(ants[i].Intrinsic.centerPoint,dummy.Intrinsic.centerPoint,3))
        {
            ant.Intrinsic.ClusterFlag = true;
            condition = false;
        }

        }
        if(condition == true||checkEnemyFromBob(dummy.Intrinsic.centerPoint,player.Intrinsic.centerPoint,4))
        { ant.Intrinsic.ClusterFlag = false;
            ant.Intrinsic.removeGoal();}
    }
    this.antfleefromBob=function(ant){
        //if bob is 3 cell away from ant
        var  noofcells=2;
        var ants=room.getAnts();
        var exclude;
        var fleebobflag=false;
          if(checkEnemyFromBob(ant.Intrinsic.centerPoint,player.Intrinsic.centerPoint,noofcells))
             {
                  for(var i=0;i<ants.length;i++)
                 {
                     if(ants[i].Intrinsic.cellPos.x==ant.Intrinsic.cellPos.x&&ants[i].Intrinsic.cellPos.y==ant.Intrinsic.cellPos.y)
                    {
                             exclude=i;
                             fleebobflag=true;
                             break;
                    }
               }
             if(fleebobflag)
             {
           this.antMoveToNearestAnt(ant,ants,exclude);
             }
      }

    }
    this.determineMaxant=function(time,max){
        var ymax_time = 0.9;
        var secdiv = ymax_time/93;
        var tensiondivision=1/secdiv;
        var newTime = (time/tensiondivision);
        var maxAnt = Math.round(newTime +Math.sin((2*newTime)-1)+Math.sin(9*newTime)+(max-2.5));
//    console.log("Max Ants:"+maxAnt);
        return maxAnt;
    }

//Jensen Tan U084010H    
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
        var bombLocation = room.map[enemyRow][enemyColumn].weapon;
        if(bombLocation.activeBomb == true) {

            this.bombBlast(bombLocation);

            // Get Bomb's location in weapons array
            var weaponIndex = weapons.indexOf(bombLocation);
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

//Jensen Tan U084010H & Muhammad Azri A0073951B    
    this.antAttackrating = function(ant,identity)  {
        var baskets = room.getBaskets();
        var firstTension = 50,secondTension = 70, thirdtension = 90;
        var timenow = Math.round((Date.now() - start_time)/1000);
        var currentdistance = math.getDistanceBetweenTwoPoints(baskets[0].Intrinsic.centerPoint,player.Intrinsic.centerPoint);
        ant.Intrinsic.attackrating = 0.5;

        if(timenow < (firstTension+10) && timenow > firstTension && baskets.length == 3)
        {
            document.getElementById("scenario").innerHTML = 'A';
            //ant.Intrinsic.attackrating = baskets[getNearestBasketIndex(ant)].Intrinsic.health*0.10;
            ant.Intrinsic.attackrating = 3;

 //           ant.Intrinsic.addGoal(7);
 //           ant.Intrinsic.addGoal(5);
            ant.Intrinsic.addGoal(8);


        }

        else if((timenow < (secondTension+10) && timenow > secondTension) && baskets.length == 2)
        {
            document.getElementById("scenario").innerHTML = 'B';
            //ant.Intrinsic.attackrating = baskets[getNearestBasketIndex(ant)].Intrinsic.health*0.10;
            ant.Intrinsic.attackrating = 3;

            ant.Intrinsic.addGoal(8);
        }
        
        else if(timenow < (thirdtension+10) && timenow > thirdtension || baskets.length == 1 || player.Intrinsic.health<20)
        {
            
           // room.maxAnt=0;
            document.getElementById("scenario").innerHTML = 'C';
            if(currentdistance < previousdistance || hollywoodCounter < 90)
            {
                if(player.Intrinsic.health<20)
                    {ant.Intrinsic.attackrating = player.Intrinsic.health*0.05;}
                ant.Intrinsic.attackrating = baskets[getNearestBasketIndex(ant)].Intrinsic.health*0.05;
                
            }
            else
            {ant.Intrinsic.attackrating = 0.5;}
            //ant.Intrinsic.attackrating = 3;
            ant.Intrinsic.addGoal(8);

        }        
        
        else {
            if(ant.Intrinsic.retrieveLastGoal() == 8)
            {ant.Intrinsic.removeGoal();}
            ant.Intrinsic.attackrating = 0.5;
            document.getElementById("scenario").innerHTML = 'NA';
            ant.Intrinsic.attackrating = 0.5;
        }
        previousdistance = math.getDistanceBetweenTwoPoints(baskets[0].Intrinsic.centerPoint,player.Intrinsic.centerPoint);        

    }
//Muhammad Azri A0073951B
    this.antclose = function(ant) {

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
    this.beeclose = function(bee) {
        
        var count = 5;
        var beecell = bee.Intrinsic.cellPos;
        var playercell = player.Intrinsic.cellPos;        
        if(math.getDistanceBetweenTwoPoints(player.Intrinsic.centerPoint,bee.Intrinsic.centerPoint) < (room.cellsize*5.2))
        {

            if(bee.shootcounter == count)
            {
                //alert("bee shoot");
                //shoot down
                if((beecell.y == playercell.y) && playercell.x>beecell.x)
                {
                    if(bee.Intrinsic.velocity > 400)
                        {bee.Intrinsic.velocity=400;}
                    bee.Intrinsic.direction = Math.PI/2;
                    bee.stingpos.x = bee.Intrinsic.centerPoint.x;
                    bee.stingpos.y = bee.Intrinsic.centerPoint.y;
                    bee.stingdir ='down';
                }
                //shoot up
                else if((beecell.y == playercell.y) && playercell.x<beecell.x)
                {
                    if(bee.Intrinsic.velocity > 400)
                        {bee.Intrinsic.velocity=400;}
                    bee.Intrinsic.direction = Math.PI*3/2;
                    bee.stingpos.x = bee.Intrinsic.centerPoint.x;
                    bee.stingpos.y = bee.Intrinsic.centerPoint.y;
                    bee.stingdir = 'up';
                }
                //shoot right
                else if((beecell.x == playercell.x) && playercell.y>beecell.y)
                {
                    if(bee.Intrinsic.velocity > 400)
                        {bee.Intrinsic.velocity=400;}
                    bee.Intrinsic.direction = 0;
                    bee.stingpos.x = bee.Intrinsic.centerPoint.x;
                    bee.stingpos.y = bee.Intrinsic.centerPoint.y;
                    bee.stingdir = 'right';
                }
                //shoot left
                else if((beecell.x == playercell.x)  && playercell.y<beecell.y)
                {
                    if(bee.Intrinsic.velocity > 400)
                        {bee.Intrinsic.velocity=400;}
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


        var baskets = room.getBaskets();

        for(var i=0;i<baskets.length;i++)
        {
            if(math.getDistanceBetweenTwoPoints(baskets[i].Intrinsic.centerPoint,bee.Intrinsic.centerPoint) < (room.cellsize*1.5))
            {
                var basketscell = baskets[i].Intrinsic.cellPos;
                if(bee.Intrinsic.velocity > 400)
                        {bee.Intrinsic.velocity=400;}

                if( ((beecell.y == basketscell.y) && bee.Intrinsic.direction.toFixed(2) == (Math.PI/2).toFixed(2) && basketscell.x>beecell.x) || ((beecell.y == basketscell.y) && bee.Intrinsic.direction.toFixed(2) == (Math.PI*3/2).toFixed(2) && basketscell.x<beecell.x) || ((beecell.x == basketscell.x) && bee.Intrinsic.direction == 0 && basketscell.y>beecell.y) || ((beecell.x == basketscell.x) && bee.Intrinsic.direction.toFixed(2) == Math.PI.toFixed(2) && basketscell.y<beecell.y) )
                {
                    bee.Intrinsic.attackrating = 0.5;
                    baskets[i].Intrinsic.health -= bee.Intrinsic.attackrating;
                    if(bee.Intrinsic.isattacking)
                    {bee.Intrinsic.attackcolor = 'brown';}
                    else
                    {bee.Intrinsic.attackcolor = 'purple';}
                    bee.Intrinsic.isattacking = !bee.Intrinsic.isattacking;
                    //remove basket if destroyed
                    if(baskets[i].Intrinsic.health <= 0)
                    {
                        baskets.splice(baskets.indexOf(baskets[i]),1);
                    }
                }
            }

        }        

    }
//Chua Hong Shing U094743N
    // Flags for cornering to make sure no more than 1 ants go to the cornering position
    var flag1 = false;
    var flag2 = false;
    var flag3 = false;
    var flag4 = false;
    var flag5 = false;
    var flag6 = false;
    var flag7 = false;
    var flag8 = false;
    var flag9 = false;
    var flag10 = false;
    var flag11 = false;
    var flag12 = false;
    var flag13 = false;
    var flag14 = false;
    var flag15 = false;
    var flag16 = false;
    var flag17 = false;
    var flag18 = false;
    var flag19 = false;
    var flag20 = false;

    this.clear_cflags = function()
    {
        flag1 = false;
        flag2 = false;
        flag3 = false;
        flag4 = false;
        flag5 = false;
        flag6 = false;
        flag7 = false;
        flag8 = false;
        flag9 = false;
        flag10 = false;
        flag11 = false;
        flag12 = false;
        flag13 = false;
        flag14 = false;
        flag15 = false;
        flag16 = false;
        flag17 = false;
        flag18 = false;
        flag19 = false;
        flag20 = false;
    }
    this.cornering = function(ant)
    {

        var dummy = new Dummy(room.map[1][1].point);

        if(!ant.cflag)
        {

        if(player.Intrinsic.cellPos.x <= 4 && player.Intrinsic.cellPos.y <= 4)
        {
            //Bob is in segment 1

            //Check in terms of priority which of the 5 corner cell is empty and go there if it is empty
            if(!room.map[1][5].occupied && !flag1){
                
                ant.cpoint.x = 1;
                ant.cpoint.y = 5;
                
                flag1 = true;
            }
            else if(!room.map[5][1].occupied && !flag2){
                
                ant.cpoint.x = 5;
                ant.cpoint.y = 1;

                flag2 = true;
            }
            else if(!room.map[5][3].occupied && !flag3){
                
                ant.cpoint.x = 5;
                ant.cpoint.y = 3;

                flag3 = true;
            }
            else if(!room.map[3][5].occupied && !flag4){

                ant.cpoint.x = 3;
                ant.cpoint.y = 5;

                flag4 = true;
            }
            else if(!room.map[5][5].occupied && !flag5){

                ant.cpoint.x = 5;
                ant.cpoint.y = 5;

                flag5 = true;
            }

            ant.cflag = true;

        }

        if(player.Intrinsic.cellPos.x <= 4 && player.Intrinsic.cellPos.y >= 17)
        {
            //Bob is in segment 2
            
            //Check in terms of priority which of the 5 corner cell is empty and go there if it is empty
            if(!room.map[5][16].occupied && !flag6){
                
                ant.cpoint.x = 5;
                ant.cpoint.y = 16;

                flag6 = true;
            }
            else if(!room.map[5][18].occupied && !flag7){

                ant.cpoint.x = 5;
                ant.cpoint.y = 18;

                flag7 = true;
            }
            else if(!room.map[3][16].occupied && !flag8){
                
                ant.cpoint.x = 3;
                ant.cpoint.y = 16;

                flag8 = true;
            }
            else if(!room.map[1][16].occupied && !flag9){
                
                ant.cpoint.x = 1;
                ant.cpoint.y = 16;

                flag9 = true;
            }
            else if(!room.map[5][20].occupied && !flag10){
                
                ant.cpoint.x = 5;
                ant.cpoint.y = 20;

                flag10 = true;
            }
            ant.cflag = true;
        }

        if(player.Intrinsic.cellPos.x >= 9 && player.Intrinsic.cellPos.y <= 4)
        {
            //Bob is in segment 3

            //Check in terms of priority which of the 5 corner cell is empty and go there if it is empty
            if(!room.map[8][5].occupied && !flag11){
                
                ant.cpoint.x = 8;
                ant.cpoint.y = 5;

                flag11 = true;
            }
            else if(!room.map[10][5].occupied && !flag12){

                ant.cpoint.x = 10;
                ant.cpoint.y = 5;

                flag12 = true;
            }
            else if(!room.map[8][3].occupied && !flag13){
                
                ant.cpoint.x = 8;
                ant.cpoint.y = 3;

                flag13 = true;
            }
            else if(!room.map[12][5].occupied && !flag14){
                
                ant.cpoint.x = 12;
                ant.cpoint.y = 5;

                flag14 = true;
            }
            else if(!room.map[8][1].occupied && !flag15){

                ant.cpoint.x = 8;
                ant.cpoint.y = 1;

                flag15 = true;
            }

            ant.cflag = true;
        }

        if(player.Intrinsic.cellPos.x >= 9 && player.Intrinsic.cellPos.y >= 17)
        {
            //Bob is in segment 4

            //Check in terms of priority which of the 5 corner cell is empty and go there if it is empty
            if(!room.map[8][16].occupied && !flag16){
                 
                //Ant stores the point to corner the player
                ant.cpoint.x = 8;
                ant.cpoint.y = 16;

                //Let's cornering know that someone has already been assigned to this cell
                flag16 = true;
            }
            else if(!room.map[8][18].occupied && !flag17){
                
                ant.cpoint.x = 8;
                ant.cpoint.y = 18;

                flag17 = true;
            }
            else if(!room.map[10][16].occupied && !flag18){
                
                ant.cpoint.x = 10;
                ant.cpoint.y = 16;

                flag18 = true;
            }
            else if(!room.map[12][16].occupied && !flag19){
                
                ant.cpoint.x = 12;
                ant.cpoint.y = 16;

                flag19 = true;
            }
            else if(!room.map[8][20].occupied && !flag20){
                
                ant.cpoint.x = 8;
                ant.cpoint.y = 20;

                flag20 = true;
            }
            ant.cflag = true;
        }

        }
        else
        {
            if(ant.cpoint.x > 0)
            {
            dummy.Intrinsic.centerPoint = room.map[ant.cpoint.x][ant.cpoint.y].point;
            pathfinding.objectgo(ant,dummy);
            }
        }  
    }

//Everybody contributed    
    // Dynamic AI Decision Making
    /************************************/
    // based on flags, give commands to AI
    this.AiCommander = function(enemy)
    {
        if(enemy.Intrinsic.goals.length >0)
        {
            switch(enemy.Intrinsic.retrieveLastGoal()){
                case 1: //Attack Bob
                    this.antAttackBobnew(enemy);
                    break;
                case 2: //Attack Basket
                    this.attackNearestBasket(enemy);
                    break;
                case 3: //Flee Bob
                    this.antfleefromBob(enemy);
                    break;
                case 4: //Cornering
                    this.cornering(enemy);
                    break;
                case 5: //cluster
                     this.antCluster(enemy);
                     break;
                case 6: //limited time attacking bob
                     this.shortAttack(enemy);
                     break;
                case 7: //limited time attacking basket
                    this.shortBasket(enemy);
                    break;
                case 8: //limited time attacking basket
                    this.attackDyingBasket(enemy);
                    break;                    
            }//end of switch



         }
    }
//Muhammad Azri A0073951B & Rengaswamy A0073676U    
    this.shortBasket= function(enemy)
    {
        renderingEngine.sFlag=true;
        this.attackBasket(enemy);
        if(renderingEngine.shortAttacks%15==0)
        {
            renderingEngine.sFlag=false;
            renderingEngine.shortAttacks=1;
            var ants = room.getAnts();
            for(var i=0;i<ants.length;i++)
            {
                ants[i].Intrinsic.removeGoal();
            }

        }
    }
    this.shortAttack = function(enemy)
    {        
        renderingEngine.sFlag=true;
        pathfinding.objectgo(enemy,player);
        if(renderingEngine.shortAttacks%15==0)
        {
            renderingEngine.sFlag=false;
            renderingEngine.shortAttacks = 1;
            var ants = room.getAnts();
            for(var i=0;i<ants.length;i++)
            {
                ants[i].Intrinsic.removeGoal();
            }
        }
    }

//Jensen Tan U084010H    
    this.bobKillStrength = function()
    {
        var enemyKilledNow = player.kills;
        var timeNow = Date.now();

        // Check Bob Attack Power
        // For every 3 seconds
        if((timeNow-time_previous)/1000 > 3 ) {
            //console.log('entered Loop 1');
            //console.log('The number of enemies killed is ' +(enemyKilledNow - enemyKilledPrev));

            // Enemies killed by Bob is more than 2
            if(enemyKilledNow - enemyKilledPrev > 2){
                return true;
            }
            else
            {
                return false;
            }


            time_previous = timeNow;
            enemyKilledPrev = enemyKilledNow;
        }
    }
//Muhammad Azri A0073951B    
    this.tossCoin = function(enemy,probability)
    {
    var toss= Math.floor(Math.random() * 11)  + 1;

        if(toss<= probability/10)
        {// Attack Bob

    //        if(1 != enemy.Intrinsic.goals[enemy.Intrinsic.goals.length-1])
    //        {
            //alert("toss");
            enemy.Intrinsic.goals.push(1);
    //        }
                            
        }
        else // Attack basket
        {
            //alert("toss");
                          
 //           if(2 != enemy.Intrinsic.goals[enemy.Intrinsic.goals.length-1])
    //        {
            enemy.Intrinsic.goals.push(2);
    //        }                    
        }
    }
//Muhammad Azri A0073951B & Jensen Tan U084010H
    //Basic staging and spawning stuff  Azri & Jensen
    this.Action = function(enemy,length)
    {
        var segment=1;
        var timenow = (Date.now() - start_time)/1000;
        //     console.log(timenow);
        var stagelength = 30;
        var mysterybox = room.getmysterybox();
        //Setting the different time region
        if(timenow < stagelength)
        {segment = 1;}
        else if(timenow < stagelength*1.1)
        {segment = 1;}
        else if(timenow < stagelength*2)
        {segment = 2;}
        else if(timenow < stagelength*2.1)
        {segment = 2;}
        else if(timenow < stagelength*3)
        {segment = 3;}
        else if(timenow < stagelength*3.1)
        {segment = 3;}
        else
        {segment = 4;}
        switch(segment){
            case 1: //------------------------stage 1------------------------------------
                document.getElementById("stage-level").innerHTML = 1;

                if(enemy.identity == 'ant')
                {
                    room.maxAnts = this.determineMaxant(timenow,8);

                    //default action run once on start
                    if(true != enemy.Intrinsic.defaultActivated)
                    {
                        this.tossCoin(enemy,50);
                        enemy.Intrinsic.defaultActivated = true;
                    }
                    //action run once when activated
                    if(false != enemy.Intrinsic.defaultActivated && true != enemy.Intrinsic.lawActivated)
                    {
                        if(this.bobKillStrength())
                        {
                            var toss= Math.floor(Math.random() * 11)  + 1;
                            if(toss <= 5) //50/50 (the law or not)
                            {
                            //alert("60/40");
                            this.tossCoin(enemy,60);
                            }
                            //else
                            //{alert("50/50");}
                        enemy.Intrinsic.lawActivated = true;
                        }
                    }


                }
                mysterybox.stage = 1;  // Mysterybox spawns the item according to the stage (HS)
                break;
            case 2: //------------------------stage 2------------------------------------
                document.getElementById("stage-level").innerHTML = 2;

                if(enemy.identity == 'ant')
                {
                    room.maxAnts = this.determineMaxant(timenow,8);

                    //default action run once on start
                    if(true != enemy.Intrinsic.defaultActivated)
                    {
                        this.tossCoin(enemy,50);
                        enemy.Intrinsic.defaultActivated = true;
                    }
                    //action run once when activated
                    if(false != enemy.Intrinsic.defaultActivated && true != enemy.Intrinsic.lawActivated)
                    {
                        if(this.bobKillStrength())
                        {
                            var toss= Math.floor(Math.random() * 11)  + 1;
                            if(toss <= 5) //50/50 (the law or not)
                            {
                            //alert("70/30");
                            this.tossCoin(enemy,70);
                            }
                           
                            //{alert("50/50");}
                        enemy.Intrinsic.lawActivated = true;
                        }
                    }

                }
                mysterybox.stage = 2;
                break;
            case 3: //------------------------stage 3------------------------------------
                document.getElementById("stage-level").innerHTML = 3;

                if(bees.length == 0)
                {room.spawnEnemies(1,'bee');}

               if(enemy.identity == 'ant')
                {
                    room.maxAnts = this.determineMaxant(timenow,9);

                    //default action run once on start
                    if(false == enemy.Intrinsic.defaultActivated)
                    {
                        this.tossCoin(enemy,50);
                        enemy.Intrinsic.defaultActivated = true;
                    }
                    //action run once when activated
                    if(true == enemy.Intrinsic.defaultActivated && false == enemy.Intrinsic.lawActivated)
                    {
                        if(this.bobKillStrength())
                        {
                            var toss= Math.floor(Math.random() * 11)  + 1;
                            if(toss <= 5) //50/50 (the law or not)
                            {
                            //alert("70/30");
                            this.tossCoin(enemy,75);
                            }
                            
                            //{alert("50/50");}
                        enemy.Intrinsic.lawActivated = true;
                        }
                    }

                }
                else
                {//To-do Curve bee
                    room.maxBees=1;
                }
                mysterybox.stage = 3;
                break;

            case 4: //------------------------stage 4------------------------------------
                document.getElementById("stage-level").innerHTML = 4;
                //this.bobKillStrength(enemy, 75);
                if(room.finalStageSpawn == true)
                {
                    if(player.skill == 'good')
                    {
                        room.spawnEnemies(10,'ant');
                        room.spawnEnemies(4,'bee');
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

               if(enemy.identity == 'ant')
                {
                    //room.maxAnts = this.determineMaxant(timenow,13);

                    //default action run once on start
                    if(false == enemy.Intrinsic.defaultActivated)
                    {
                        this.tossCoin(enemy,50);
                        enemy.Intrinsic.defaultActivated = true;
                    }
                    //action run once when activated
                    if(true == enemy.Intrinsic.defaultActivated && false == enemy.Intrinsic.lawActivated)
                    {
                        if(this.bobKillStrength())
                        {
                            var toss= Math.floor(Math.random() * 11)  + 1;
                            if(toss <= 5) //50/50 (the law or not)
                            {
                            //alert("70/30");
                            this.tossCoin(enemy,75);
                            }
                            else
                            //{alert("50/50");}
                        enemy.Intrinsic.lawActivated = true;
                        }
                    }

                }                
                mysterybox.stage = 4;
                break;
            default://The place where player's ability is checked
/*


                if(segment == 12)//Transmission from stage 1 to stage 2
                {
                    document.getElementById("stage-level").innerHTML = 1.2;
                    //check if player is good or bad
                    if(player.kills > 5 || player.Intrinsic.health>70)
                    {
                        player.skill = 'good';
                        //document.getElementById("player-skill").innerHTML = 'Good';
                    }
                    else
                    {
                        player.skill = 'bad';
                        //document.getElementById("player-skill").innerHTML = 'Bad';
                    }
                }
                else if(segment == 23)//Transmission from stage 2 to stage 3
                {
                    document.getElementById("stage-level").innerHTML = 2.3;
                    //check if player is good or bad
                    if(player.kills > 10 || player.Intrinsic.health>70)
                    {
                        player.skill = 'good';
                        //document.getElementById("player-skill").innerHTML = 'Good';

                    }
                    else
                    {
                        player.skill = 'bad';
                        //document.getElementById("player-skill").innerHTML = 'Bad';
                    }

                }
                else // transition of stage 3 to 4
                {
                    document.getElementById("stage-level").innerHTML = 3.4;
                    room.finalStageSpawn = true;
                }//last else of segment checks
                mysterybox.stage = 0;
                break;
*/
        }//end of the switch
    }

}
