function item(x,y){
    this.point=new Point(x,y);
    this.occupied=false;
}


function Room(){

	var ants = new Array();

    /*
     Abstract map drawn on top of the room to help path finding class to locate the object
     Every cell in the map can either can be occupied by an item object
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

    var map = [];
    this.width = 880;
    this.height = 560;
    this.cellsize = 40;
    this.rows=this.width/this.cellsize
    this.coloums=this.height/this.cellsize;

    var y=0,x=0;
    for( var i= 0,l=this.rows;i<l;i++)
    {
        map[i]=[];
        for(var j= 0,l2=this.coloums;j<l2;j++)
        { map[i][j]= new item( x,y);

            //increment the y coordinate

            if(x==880)
                x=0;
            else
                x=x+this.cellsize;
            console.log("Grid Positions : X = "+ map[i][j].point.x + " Y = " + map[i][j].point.y);
        }
        //increment the y coordinate

        if(y==560)
            y=0;
        else
            y=y+this.cellsize;
    }

	//object setup
	ants[0] = new Ants(new Point(699,250),23,2);
	ants[0].color = 'red';
	ants[0].id = 0;

	this.getAnts = function(){
		return ants;
	}

	 this.setAnts = function(allAnts){
	 	this.ants = allAnts;
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
