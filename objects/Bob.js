function Bob(centerPoint, width, height){


	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.Intrinsic.color = 'yellow';	
	this.health = 100;

	this.image = new Image();
	this.image.src = "imgs/char_bob.png";

	this.hasKnifeEquipped = false;
	this.hasBombEqupped = false;
	this.hasShurikenEqupped = false;
	//this.hasConverterEquipped = false;
	//this.hasSheildEquipped = false;







}