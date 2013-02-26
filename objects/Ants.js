function Ants(centerPoint, radius, mass){
	this.Intrinsic = new Intrinsic(centerPoint, radius, mass);

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
}
