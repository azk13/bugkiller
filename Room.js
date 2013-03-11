// Set weapon as global variable, as bob is accessing it ~ jensen
var weapons = new Array();
var ants = new Array();
var bees = new Array();
var baskets = new Array();



function cell(x,y){
    this.point=new Point(x,y);
    this.occupied=false;
    this.isWeapon=false;
    this.isBasket=false;
    this.isEnemy=false;
    this.isBob=false;

    // put the weapon object here, see Gridvacancy.js around line 55++
    this.weapon='null';
}

function Room(){

    /*
     Abstract this.map drawn on top of the room to help path finding class to locate the object
     Every cell in the this.map can either can be occupied by an item object
     the item object will have centrepoint of the cell  and whether it is occupied by
     an item.In this implementation there won't be any use for the last row and column
     anyway just added.
     e.g. To get the center point of the last cell  in the  map
           this.map[13][21].point.x,this.map[13][21].point.y
          TO know whether the last cell is occupied by an item
           this.map[13]21].occupied will return true if occupied
           this.map[13][21].occupied will return false if not occupied.
          TO know whether the last cell is occupied by an weapon
            this.map[13]21].isWeapon will return true if occupied
            this.map[13][21].isWeapon will return false if not occupied.

     _______________________________________________________________________________
     |0,0| |0,1| |0,2| |0,3| |0,4|....................................................|0,21|
     |1,0| |1,1| |1,2| |1,3| |1,4|....................................................|1,21|
     |2,0| |2,1| |2,2| |2,3| |2,4|....................................................|2,21|
     |3,0| |3,1| |3,2| |3,3| |3,4|....................................................|3,21|
     .......................................................................................
     .......................................................................................
     .......................................................................................
     |9,0| |9,1| |9,2| |9,3| |9,4|....................................................|9,21|
     _____________________________________________________________________________________
     */
    this.finalStageSpawn = false;
    this.maxAnts=3;
    this.maxBees=0;
    this.map = [];
    this.width = 880;
    this.height = 560;
    this.cellsize = 40;
    this.columns=this.width/this.cellsize;
    this.rows=this.height/this.cellsize;
    var y=0,x=0;
    var count=0;
    for( var i=0;i<this.rows;i++)
    {
        this.map[i]=[];

        for(var j=0;j<this.columns;j++)
        {
        	this.map[i][j]= new cell(x+(this.cellsize/2),y+(this.cellsize/2));
             x=x+this.cellsize;
            count++;
//            console.log("Grid Positions : X = "+ this.map[i][j].point.x + " Y = " + this.map[i][j].point.y);

        }
          y=y+this.cellsize;
          if(x=this.width)
             x=0;
    }
	//Objects Creation
	/************************************
	*/

    //var ants = new Array();
    //var bees = new Array();
    //var baskets = new Array();
    // var weapons = new Array();
    // for now, put it as global variable as will access is when bob picked up a weapon

    //pioneer ant
    ants[0] = new Ants(new Point(this.map[0][21].point.x,this.map[0][21].point.y));

	baskets[0] = new Basket(new Point(this.map[4][3].point.x, this.map[4][3].point.y));
	baskets[1] = new Basket(new Point(this.map[8][10].point.x, this.map[8][10].point.y));
	baskets[2] = new Basket(new Point(this.map[12][11].point.x, this.map[12][11].point.y));
//    baskets[3] = new Basket(new Point(this.map[5][11].point.x, this.map[5][11].point.y));
//    baskets[4] = new Basket(new Point(this.map[2][11].point.x, this.map[2][11].point.y));
//    baskets[5] = new Basket(new Point(this.map[12][5].point.x, this.map[12][5].point.y));

	weapons[0] = new Weapon(new Point(this.map[13][10].point.x, this.map[13][10].point.y), 'Attack', 'Knife');
	weapons[1] = new Weapon(new Point(this.map[11][10].point.x, this.map[11][10].point.y), 'Attack', 'Bomb');
	weapons[2] = new Weapon(new Point(this.map[13][13].point.x, this.map[13][13].point.y), 'Attack', 'Shuriken');
    weapons[3] = new Weapon(new Point(this.map[12][10].point.x, this.map[12][10].point.y), 'Attack', 'Bomb');
    weapons[4] = new Weapon(new Point(this.map[11][13].point.x, this.map[11][13].point.y), 'Attack', 'Bomb');

    var mysterybox = new MysteryBox(new Point(this.map[1][12].point.x, this.map[1][12].point.y), 40, 40);
    var health = new Health(new Point(this.map[2][20].point.x, this.map[2][20].point.y), 30, 30);

    

	this.getBaskets = function() {
		return baskets;
	}
	this.getWeapons = function() {
		return weapons;
	}

	this.getAnts = function(){
		return ants;
	}

	this.getBees = function(){
		return bees;
	}

	this.setAnts = function(allAnts){
	 	this.ants = allAnts;
	}
    this.setBees = function(allBees){
        this.bees = allBees;
    }    

    this.getmysterybox = function(){
        return mysterybox;
    }

    this.getHealth = function(){
        return health;
    }



    this.regions = new Array();

    // Always label regions from largest to smallest
    this.regions[0] = new Region(0,0,1000,500, 0.8);
    this.regions[0].color = 'brown';
    this.regions[1] = new Region(50,50,900,400, 0.6);
    this.regions[1].color = '#31B404';
    this.regions[2] = new Region(150,130,700,240, 0.3);
    this.regions[2].color = '#00FF00';


    this.getRegionFromPoint = function(point){
	 	if ((point.x > this.regions[2].x) && (point.x < this.regions[2].x + this.regions[2].width)
	 		&& (point.y > this.regions[2].y) && (point.y < this.regions[2].y + this.regions[2].height)){
	 		return this.regions[2];
	 	}
	 	else if ((point.x > this.regions[1].x) && (point.x < this.regions[1].x + this.regions[1].width)
	 		&& (point.y > this.regions[1].y) && (point.y < this.regions[1].y + this.regions[1].height)){
	 		return this.regions[1];
	 	}
	 	else {
	 		return this.regions[0];
	 	}

	}


    this.spawnEnemies = function(maxNum,identity)
    {  
        //randomizer to check for occupied space

        var spawnRow = Math.floor(Math.random() * (this.rows-1));
        var spawnCol = Math.floor(Math.random() * (this.columns-1));

        if(Math.random() < 0.5)
            {spawnRow=0;}
        else
            {spawnCol=0;}

        while(this.map[spawnRow][spawnCol].occupied)
        {
            spawnRow = Math.floor(Math.random() * (this.rows-1));
            spawnCol = Math.floor(Math.random() * (this.columns-1));            
        }

        if(Math.random() < 0.5)
            {
            if(Math.random() < 0.5) 
                {
                    spawnRow=0;
                }
            else
                {
                    spawnRow=this.rows-1;
                }       

            }
        else
        {
            if(Math.random() < 0.5) 
                {
                    spawnCol=0;
                }
            else
                {
                    spawnCol=this.columns-1;
                }       
        }

        this.map[spawnRow][spawnCol].occupied = true;

        if(identity == 'ant')
        {
            if(ants.length < maxNum)
                {
                    ants.push(new Ants(new Point(this.map[spawnRow][spawnCol].point.x, this.map[spawnRow][spawnCol].point.y)));
                }            
        }
        else
        {
            if(bees.length < maxNum)
                {
                    bees.push(new Bees(new Point(this.map[spawnRow][spawnCol].point.x, this.map[spawnRow][spawnCol].point.y)));
                }    
        }



    }


}
