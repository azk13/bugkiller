
/*Remove if not needed*****/
function gridIndex(number) {
	return number*40+20;
}

function cell(x,y){
    this.point=new Point(x,y);
    this.occupied=false;
    this.isWeapon=false;
}
function Room(){
    /*
     Abstract this.map drawn on top of the room to help path finding class to locate the object
     Every cell in the this.map can either can be occupied by an item object
     the item object will have centrepoint of the cell  and whether it is occupied by
     an item.In this implementation there won't be any use for the last row and column
     anyway just added.
     e.g. To get the center point of the last cell  in the  map
           this.map[21][13].point.x,this.map[21][13].point.y
          TO know whether the last cell is occupied by an item
           this.map[21]13].occupied will return true if occupied
           this.map[21][13].occupied will return false if not occupied.
          TO know whether the last cell is occupied by an weapon
            this.map[21]13].isWeapon will return true if occupied
            this.map[21][13].isWeapon will return false if not occupied.

     _______________________________________________________________________________
     |0,0| |1,0| |2,0| |3,0| |4,0|....................................................|21,0|
     |0,1| |1,1| |2,1| |3,1| |4,1|....................................................|21,1|
     |0,2| |1,2| |2,2| |3,2| |4,2|....................................................|21,2|
     |0,3| |1,3| |2,3| |3,3| |4,3|....................................................|21,3|
     .......................................................................................
     .......................................................................................
     .......................................................................................
     |0,13| |1,13| |2,13| |3,13| |4,13|...............................................|21,13|
     _____________________________________________________________________________________
     */

    this.map = [];
    this.width = 880;
    this.height = 560;
    this.cellsize = 40;
    this.columns=this.width/this.cellsize;
    this.rows=this.height/this.cellsize;
    var y=0,x=0;
    var count=0;
    for( var i=0;i<this.columns;i++)
    {
        this.map[i]=[];

        for(var j=0;j<this.rows;j++)
        {
        	this.map[i][j]= new cell(x+20,y+20);
             y=y+40;
            count++;
            console.log("Grid Positions : X = "+ this.map[i][j].point.x + " Y = " + this.map[i][j].point.y);
        }
          x=x+40;
          if(y=880)
             y=0;
    }
	//Objects Creation
	/************************************
	*/

    var ants = new Array();
    var bees = new Array();
    var baskets = new Array();
    var weapons = new Array();

	ants[0] = new Ants(new Point(this.map[21][13].point.x, this.map[21][13].point.y),40,40);


	ants[1] = new Ants(new Point(this.map[0][2].point.x,this.map[0][2].point.y),40,40);
	ants[0].id = 0;

    ants[2] = new Ants(new Point(this.map[6][0].point.x,this.map[6][0].point.y),40,40);


	bees[0] = new Bees(new Point(this.map[11][7].point.x,this.map[11][7].point.y),40,40);

	baskets[0] = new Basket(new Point(this.map[4][3].point.x, this.map[4][3].point.y), 40, 40);
	baskets[1] = new Basket(new Point(this.map[8][10].point.x, this.map[8][10].point.y), 40, 40);
	baskets[2] = new Basket(new Point(this.map[12][11].point.x, this.map[12][11].point.y), 40, 40);

	weapons[0] = new Weapon(new Point(this.map[13][10].point.x, this.map[13][10].point.y), 'Attack', 'Knife');
	weapons[1] = new Weapon(new Point(this.map[11][10].point.x, this.map[11][10].point.y), 'Attack', 'Bomb');
	weapons[2] = new Weapon(new Point(this.map[13][13].point.x, this.map[13][13].point.y), 'Attack', 'Shuriken');


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

	


}
