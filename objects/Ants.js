function Ants(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.Intrinsic.color = 'black';	

    //Added by Renga
    //Array of weapons for the Ants to use
    this.weapons=new Array();
    this.weapons.push(new Weapon("",""));

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
