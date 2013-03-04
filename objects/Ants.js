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




}
