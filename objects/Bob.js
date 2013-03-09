function Bob(centerPoint, width, height){

	var x, y, row, column;

	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.identity='Bob'
	//Jensen
	this.row = 0;
	this.column = 0;
	//this.identity = 'bob'; 

	this.Intrinsic.color = 'yellow';	
	this.health = 10;

	this.image = new Image();
	this.image.src = "imgs/char_bob.png";

	this.hasKnifeEquipped = false;
	this.knifeHealth = 100;
	this.hasBombEquipped = false;
	this.bombHealth = 100;
	this.hasShurikenEquipped = false;
	this.shurikenHealth = 100;
	this.shurikenpos = new Point(9999,9999);
	this.shurikendir = 'none';
	//this.hasConverterEquipped = false;
	//this.hasSheildEquipped = false;
	this.activeWeapon = 'null';

    this.weapons=new Array();
    this.addWeapons=function(){this.weapons.push(new Weapon("",""));}
    this.hasWeapons=function(){if(this.weapons.length>1) return true;}




	this.usingKnife = function(){

		this.knifeHealth -= 20;
		document.getElementById("knife-health").style.width= this.knifeHealth + '%';
		if(this.knifeHealth <= 0) {
		this.hasKnifeEquipped = false;
		document.getElementById("knife-picked").innerHTML = 0;
		document.getElementById("active-weapon").innerHTML = 'none';
		this.activeWeapon = 'null';
      }
	}

	this.usingBomb = function(playerrow, playercol){

		this.bombHealth -= 100;

		weapons[weapons.length] = new Weapon(new Point(room.map[playerrow][playercol].point.x, room.map[playerrow][playercol].point.y), weapons.length, 'Attack', 'Bomb');

		// set the bomb to be active
		weapons[weapons.length-1].activeBomb = true;

		// update map
		room.map[playerrow][playercol].isWeapon = true;
		// specify it as active Bomb

		// load weapon object in the cell
		room.map[playerrow][playercol].weapon = weapons[weapons.length];

		document.getElementById("bomb-health").style.width= this.bombHealth + '%';

		if(this.bombHealth <= 0) {
			this.hasBombEquipped = false;
			document.getElementById("bomb-picked").innerHTML = 0;
			document.getElementById("active-weapon").innerHTML = 'none';
			this.activeWeapon = 'null';
		}
	}

	this.usingShuriken = function(){
		this.shurikenHealth -=20;
		document.getElementById("shuriken-health").style.width= this.shurikenHealth + '%';
		this.Intrinsic.attackrating=50;
		this.shurikendir = this.Intrinsic.direction;
		this.shurikenpos.x = this.Intrinsic.centerPoint.x;
		this.shurikenpos.y = this.Intrinsic.centerPoint.y;
		if(this.shurikenHealth <= 0) {
			this.hasShurikenEquipped = false;
			document.getElementById("shuriken-picked").innerHTML = 0;
			document.getElementById("active-weapon").innerHTML = 'none';
			this.activeWeapon = 'null';
		}
	}







}