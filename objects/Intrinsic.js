
function Intrinsic(centerPoint, width, height){

	this.centerPoint = centerPoint;
	this.width = width;
	this.height = height;

	this.radius = 20;

	this.velocity = 0;
	this.direction = 0;
	this.color = 'white';
	this.acceleration = 0;
    //Added by renga
    this.health=100;
    //
	this.cellPos = new Point(0,0);
	this.attackrating = 0.5;
	this.isattacking = false;
	this.attackcolor = 'blue';

	this.lawActivated = false;
    this.defaultActivated = false;
	this.lawflag = false;
	this.defaultA = false;
	this.lawA = false;

	this.killflag = false; //Kill flag checks whether Bob has killed more than a certain amt of enemies in a time period before. Used in AI.bobKillStrength (HS)  
    this.goals=new Array();
    this.removegoal=function(){
        this.goals.pop();
    }
    this.retrieveLastGoal=function(){
        
        return goals[this.goals.length-1];
    }    
  

   	this.stop = function() {
		this.direction=0;
		this.velocity = 0;
		this.acceleration = 0;
	}

}