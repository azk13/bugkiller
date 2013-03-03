/**
 * Created with JetBrains WebStorm.
 * User: renga
 * Date: 2/26/13
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */
function Weapon(centerPoint, index, type,name)
{
	
	this.Intrinsic = new Intrinsic(centerPoint, 20, 20);

	this.row = 0;
	this.column = 0;
	this.identity = null; // weapon identity, e.g. knife, bomb etc. (to pick up weapon purposes)

    //Type of the weapon can be Defend,Construct,Attack
    this.type=type;
    // Every goal has a speicfic name for the weapon
    this.name=name;

    // Where is the weapon located in the weapon array
    // e.g. I picked up a knife, where is it located in this array - Jensen
    this.index = index;

    switch(name)
	{
		case 'knife':
		  	this.Intrinsic.color = 'grey';
		  	this.identity = 'knife';
		  	break;
		case 'bomb':
		  	this.Intrinsic.color = 'aqua';
		  	this.identity = 'bomb';
		  	break;
		case 'shuriken':
			this.Intrinsic.color = 'red';
			this.identity = 'shuriken';
			break;
		default:
		  	break;
	}

    //Change the goal of the Agent
    this.inuse=true;
    //health of the weapon
    this.health=100;

    //room.map[(centerPoint.x - 20)/40][(centerPoint.y - 20)/40].isWeapon = true;
}