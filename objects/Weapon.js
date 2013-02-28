/**
 * Created with JetBrains WebStorm.
 * User: renga
 * Date: 2/26/13
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */
function Weapon(centerPoint,type,name)
{
	
	this.Intrinsic = new Intrinsic(centerPoint, 20, 20);

    //Type of the weapon can be Defend,Construct,Attack
    this.type=type;
    // Every goal has a speicfic name for the weapon
    this.name=name;

    switch(name)
	{
		case 'Knife':
		  	this.Intrinsic.color = 'grey';
		  	break;
		case 'Bomb':
		  	this.Intrinsic.color = 'aqua';
		  	break;
		case 'Shuriken':
			this.Intrinsic.color = 'red';
			break;
		default:
		  	break;
	}

    //Change the goal of the Agent
    this.inuse=true;
    //health of the weapon
    this.health=100;
}