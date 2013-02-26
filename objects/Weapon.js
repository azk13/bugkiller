/**
 * Created with JetBrains WebStorm.
 * User: renga
 * Date: 2/26/13
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */
function Weapon(type,name)
{
    //Type of the weapon can be Defend,Construct,Attack
    this.type=type;
    // Every goal has a speicfic name for the weapon
    this.name=name;
    //Change the goal of the Agent
    this.inuse=true;
}