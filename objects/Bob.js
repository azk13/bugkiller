function Bob(centerPoint, width, height){

	var x, y, row, column;

	this.Intrinsic = new Intrinsic(centerPoint, width, height);

	//Jensen
	this.row = 0;
	this.column = 0;
	//this.identity = 'bob'; 

	this.Intrinsic.color = 'yellow';	
	this.health = 100;

	this.image = new Image();
	this.image.src = "imgs/char_bob.png";

	this.hasKnifeEquipped = false;
	this.hasBombEquipped = false;
	this.hasShurikenEquipped = false;
	//this.hasConverterEquipped = false;
	//this.hasSheildEquipped = false;
	this.activeWeapon = 'null';

    this.weapons=new Array();
    this.addWeapons=function(){this.weapons.push(new Weapon("",""));}
    this.hasWeapons=function(){if(this.weapons.length>1) return true;}


	

	this.checkWeapon = function(){
		//if(room.map[])
	}







}