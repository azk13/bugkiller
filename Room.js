function item(x,y){
    this.point=new Point(x+20,y+20);
    this.occupied=false;
}

function gridIndex(number) {
	return number*40+20;
}


function Room(){

	var ants = new Array();
	var bees = new Array();
	var baskets = new Array();
	var weapons = new Array();


	//var canvas = document.getElementById('gameCanvas');
	//var ctx = canvas.getContext('2d');

    /*
     Abstract this.map drawn on top of the room to help path finding class to locate the object
     Every cell in the this.map can either can be occupied by an item object
     the item object will have the top left most corner point  and whether it is occupied by
     an item.In this implementation there won't be any use for the last row and coloum
     anyway just added
     ______________________________________________________________________________________
     |0,0||0,1| |0,2| |0,3| |0,4| |0,5| |0,6| |0,7| |0,8| |0,9| |0,10| |0,11| |0,12| |0,13|
     |1,0||1,1| |1,2| |1,3| |1,4| |1,5| |1,6| |1,7| |1,8| |1,9| |1,10| |1,11| |1,12| |1,13|
     |2,0||2,1| |2,2| |2,3| |2,4| |2,5| |2,6| |2,7| |2,8| |2,9| |2,10| |2,11| |2,12| |2,13|
     |3,0||3,1| |3,2| |3,3| |3,4| |3,5| |3,6| |3,7| |3,8| |3,9| |3,10| |3,11| |3,12| |3,13|
     |4,0||4,1| |4,2| |4,3| |4,4| |4,5| |4,6| |4,7| |4,8| |4,9| |4,10| |4,11| |4,12| |4,13|
     |5,0||5,1| |5,2| |5,3| |5,4| |5,5| |5,6| |5,7| |5,8| |5,9| |5,10| |5,11| |5,12| |5,13|
     ______________________________________________________________________________________
     */

    this.map = [];

    
    this.width = 880;
    this.height = 560;
    this.cellsize = 40;
    this.columns=this.width/this.cellsize;
    this.rows=this.height/this.cellsize;



    var y=0,x=0;
    for( var i=0;i<this.rows;i++)
    {
        this.map[i]=[];

        for(var j=0;j<this.columns;j++) 
        {
        	this.map[i][j]= new item(x,y);
            //increment the x coordinate
                x=x+this.cellsize;
//            console.log("Grid Positions : X = "+ this.map[i][j].point.x + " Y = " + this.map[i][j].point.y);
        }
        //increment the y coordinate
        x=0;
        if(y > this.height-(this.cellsize/2))
            y=0;
        else
            y=y+this.cellsize;
    }


    console.log(this.map[0][18].point.x);
    console.log(this.map[0][1].point.x);


	//Objects Creation
	/************************************
	*/
	ants[0] = new Ants(new Point(this.map[10][10].point.x, this.map[10][10].point.y),40,40);


	ants[1] = new Ants(new Point(this.map[2][13].point.x,this.map[2][0].point.y),40,40);
	ants[0].id = 0;

	//console.log('ant is ' +ants[0].Intrinsic.color);

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
