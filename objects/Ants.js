

function Ants(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.Intrinsic.color = 'black';	
	this.identity = 'ant';

    //Added by Renga
    //Array of weapons for the Ants to use
    this.weapons=new Array();
    this.addWeapons=function(centerPoint,index,type,name){this.weapons.push(new Weapon(centerPoint,index,type,name));}
    this.removeWeapons=function(){this.weapons.pop();}
    this.hasWeapons=function(){if(this.weapons.length>1) return true;}

	this.hasKnifeEquipped = false;
	this.hasSheildEquipped = false;
	this.isfleeing = false;
	this.isnearmysterybox = false;
	this.ispursuingweapon = false;
	this.ispursuingmysterybox = false;
	this.isdestroyingmysterybox = false;

	this.image = new Image();
	this.image.src = "imgs/char_ant.png";
    /*****************************************
     * Added by renga for  Idea testing
     * Goal-1: Attack bob-------Relevant Goal:2,4,3,7
     * Goal-2: Defend bob-------Relevant Goal:1,3,5,7
     * Goal-3: Pick up weapon----Relevant Goal: 4,3
     * Goal-4: Pick up health----Relevant Goal: 4,3
     * Goal-5: Flee away from bob------Relevant Goal: 4
     * Goal-6: Attack Basket--------Relevant Goal: none
     * Goal-7: Ant Move to nearest Ant---Relevant Goal: 2,1
     * Goal-8: Stay Idle
     *******************************************/
    this.defaultGoal=6;
    this.goals=new Array();
    this.setGoal= function(goalnumber,releventgoal,priority)
    {
    this.goals.push(new Goal(goalnumber,releventgoal,priority));
    }
    this.getGoal=function()
    {
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var lowestindex = 0;
        var highestindex = 0;
        var tmp;
        if(this.goals.length>0)
        {
           for (var i=this.goals.length-1; i>=0; i--) {
                tmp = this.goals[i].priority;
                if (tmp < lowest) {lowest = tmp;lowestindex=i}
                if (tmp > highest) {highest= tmp;highestindex=i}
           }
            return this.goals[highestindex];
        }
        else
        return this.defaultGoal;
    }
    this.getRandomGoal=function()
    {
       var ret= this.goals.pop();
        return ret.goalNumber;

    }
    this.removeGoal=function()
    {
        var ret= this.goals.pop();
    }

}
/*****************************************
 * Added by renga for Idea  testing purpose
 * ****************************************/

function Goal(goalnumber,releventgoal,priority){
    this.goalNumber=goalnumber;
    this.relaventGoal=releventgoal;
    this.priority=priority;
}