
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

	this.ClusterFlag = false;
    this.CornerFlag = false;
    this.goals=new Array();
    this.removeGoal=function(){
        var lastgoal=this.retrieveLastGoal();
        for (var i=this.goals.length-1; i>=0; i--) {
            if (this.goals[i] === lastgoal) {
                this.goals.splice(i, 1);
            }
        }
    }
    this.retrieveLastGoal=function(){
        return this.goals[this.goals.length-1];
    }    

    this.addGoal=function(goalno){
        if(this.retrieveLastGoal()!=goalno)
          this.goals.push(goalno);

    }

   	this.stop = function() {
		this.direction=0;
		this.velocity = 0;
		this.acceleration = 0;
	}

}