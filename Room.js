//Rengaswamy A0073676U

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
    this.prevtime = Date.now()/1000;
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

    //pioneer ant
    ants[0] = new Ants(new Point(this.map[0][21].point.x,this.map[0][21].point.y));

	baskets[0] = new Basket(new Point(this.map[4][3].point.x, this.map[4][3].point.y));
	baskets[1] = new Basket(new Point(this.map[8][10].point.x, this.map[8][10].point.y));
	baskets[2] = new Basket(new Point(this.map[12][11].point.x, this.map[12][11].point.y));
    
/*
	weapons[0] = new Weapon(new Point(this.map[13][10].point.x, this.map[13][10].point.y), 'Attack', 'Knife');
	weapons[1] = new Weapon(new Point(this.map[11][10].point.x, this.map[11][10].point.y), 'Attack', 'Bomb');
	weapons[2] = new Weapon(new Point(this.map[13][13].point.x, this.map[13][13].point.y), 'Attack', 'Shuriken');
    weapons[3] = new Weapon(new Point(this.map[12][10].point.x, this.map[12][10].point.y), 'Attack', 'Bomb');
    weapons[4] = new Weapon(new Point(this.map[11][13].point.x, this.map[11][13].point.y), 'Attack', 'Bomb'); */

    var mysterybox = new MysteryBox(new Point(this.map[1][12].point.x, this.map[1][12].point.y), 40, 40);
    mysterybox.item = 2; // Initializing first item in mysterybox to bomb
    var health = new Health(new Point(this.map[2][20].point.x, this.map[2][20].point.y), 30, 30);
    health.cellpos.x = -1; // Even though health is initiated, if cellPos is set to -1, it is not active on the map (Hong Shing)

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
    this.getmysterybox = function(){
        return mysterybox;
    }
    this.getHealth = function(){
        return health;
    }

//Enemy Spawning Function
    this.spawnEnemies = function(maxNum,identity)
    { 

    var spawnrate = (Math.random()*10)+1.5;
    var timenow = Date.now()/1000;


    //console.log((timenow-this.prevtime));
    if(timenow-this.prevtime > spawnrate && ai.endTimer < 5)
        {
    if(baskets.length==1)
    {
        ai.endTimer++;
    }            

        //randomizer to check for occupied space

        var spawnRow = Math.floor(Math.random() * (this.rows-1));
        var spawnCol = Math.floor(Math.random() * (this.columns-1));

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

        while(this.map[spawnRow][spawnCol].occupied)
        {
            spawnRow = Math.floor(Math.random() * (this.rows-1));
            spawnCol = Math.floor(Math.random() * (this.columns-1));   
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
        }


        this.map[spawnRow][spawnCol].occupied = true;

        if(identity == 'ant')
        {
         //   console.log("ant length:" + ants.length + " : "+maxNum);
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


        this.prevtime = Date.now()/1000;
        }
        
    }

}
