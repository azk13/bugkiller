/**
 * Created with JetBrains WebStorm.
 * User: renga
 * Date: 2/26/13
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */
function Weapon(centerPoint, type,name)
{
	
	this.Intrinsic = new Intrinsic(centerPoint, 20, 20);

	this.row = 0;
	this.column = 0;
	this.identity = null; // weapon identity, e.g. knife, bomb etc. (to pick up weapon purposes)

	// true when Bob is holding on to it - decrease life
	this.active = false;

    //Type of the weapon can be Defend,Construct,Attack
    this.type=type;
    // Every goal has a speicfic name for the weapon
    this.name=name;

    // Where is the weapon located in the weapon array
    // e.g. I picked up a knife, where is it located in this array - Jensen
    //this.index = index;

    // special property for BOMB
    this.activeBomb = false;

    switch(name)
	{
		case 'Knife':
		  	this.Intrinsic.color = 'grey';
		  	this.identity = 'Knife';
		  	break;
		case 'Bomb':
		  	this.Intrinsic.color = 'aqua';
		  	this.identity = 'Bomb';
		  	break;
		case 'Shuriken':
			this.Intrinsic.color = 'red';
			this.identity = 'Shuriken';
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