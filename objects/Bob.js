function Bob(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.identity='Bob'
	this.Intrinsic.color = 'yellow';
	this.hasKnifeEquipped = false;
	this.knifeHealth = 100;
	this.hasBombEquipped = false;
	this.bombHealth = 100;
	this.hasShurikenEquipped = false;
	this.shurikenHealth = 100;
	this.shurikenpos = new Point(9999,9999);
	this.shurikendir = 'none';
	this.activeWeapon = 'null';
	this.skill = 'null';
	this.kills = 0;

    this.hasWeapons=function(){
        if(this.hasKnifeEquipped==true||this.hasBombEquipped==true ||this.hasShurikenEquipped==true)
        {return true;}

        return false;
    }

    this.usingPunch = function(){
    	this.Intrinsic.attackrating = 5;
        if(player.Intrinsic.isattacking)
          {player.Intrinsic.attackcolor = 'black';}
        else
          {player.Intrinsic.attackcolor = 'brown';}
        player.Intrinsic.isattacking = !player.Intrinsic.isattacking;    
        punchAttack();	
    }

	this.usingKnife = function(){
		this.Intrinsic.attackrating=25;
        if(player.Intrinsic.isattacking)
          {player.Intrinsic.attackcolor = 'white';}
        else
          {player.Intrinsic.attackcolor = 'red';}
        player.Intrinsic.isattacking = !player.Intrinsic.isattacking;
        knifeAttack();
		this.knifeHealth -= 5;
		document.getElementById("knife-health").style.width= this.knifeHealth + '%';
		if(this.knifeHealth <= 0) {
		this.hasKnifeEquipped = false;
		document.getElementById("knife-picked").innerHTML = 0;
		document.getElementById("active-weapon").innerHTML = 'none';
		this.activeWeapon = 'null';
      }
	}

	this.usingBomb = function(playerrow, playercol){
		player.Intrinsic.attackcolor = 'blue';
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
		player.Intrinsic.attackcolor = 'silver';		
		this.shurikenHealth -=5;
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
	// Calls this when Bob picks up health (Hong Shing)
	this.heal = function(healing){
		this.Intrinsic.health += healing;
	}

}
function knifeAttack()
{
    var ants = room.getAnts();
    var bees = room.getBees();

        for(var i=0;i<ants.length;i++)
        {
        var ant = ants[i];
  		if(math.getDistanceBetweenTwoPoints(player.Intrinsic.centerPoint,ant.Intrinsic.centerPoint) < (room.cellsize*1.5))
    		{
			    var playercell = player.Intrinsic.cellPos;
			    var antcell = ant.Intrinsic.cellPos;

		        if( ((antcell.y == playercell.y) && player.Intrinsic.direction.toFixed(2) == (Math.PI/2).toFixed(2) && antcell.x>playercell.x) || ((antcell.y == playercell.y) && player.Intrinsic.direction.toFixed(2) == (Math.PI*3/2).toFixed(2) && antcell.x<playercell.x) || ((antcell.x == playercell.x) && player.Intrinsic.direction == 0 && antcell.y>playercell.y) || (( playercell.x==antcell.x ) && player.Intrinsic.direction.toFixed(2) == Math.PI.toFixed(2) && antcell.y<playercell.y) )
		        {
		 //       alert("health decreasing");
		        ant.Intrinsic.health -= player.Intrinsic.attackrating; 
		        if(ant.Intrinsic.health <= 0)
		        {
		        	ants.splice(ants.indexOf(ant),1); 
		        	player.kills++;
		        }
		        }
    		}
        }


        for(var i=0;i<bees.length;i++)
        {
        	var bee = bees[i];
  		if(math.getDistanceBetweenTwoPoints(player.Intrinsic.centerPoint,bee.Intrinsic.centerPoint) < (room.cellsize*1.5))
    		{
			    var playercell = player.Intrinsic.cellPos;
			    var beecell = bee.Intrinsic.cellPos;

		        if( ((beecell.y == playercell.y) && player.Intrinsic.direction.toFixed(2) == (Math.PI/2).toFixed(2) && beecell.x>playercell.x) || ((beecell.y == playercell.y) && player.Intrinsic.direction.toFixed(2) == (Math.PI*3/2).toFixed(2) && beecell.x<playercell.x) || ((beecell.x == playercell.x) && player.Intrinsic.direction == 0 && beecell.y>playercell.y) || (( playercell.x==beecell.x ) && player.Intrinsic.direction.toFixed(2) == Math.PI.toFixed(2) && beecell.y<playercell.y) )
		        {
		 //       alert("health decreasing");
		        bee.Intrinsic.health -= player.Intrinsic.attackrating; 
		        if(bee.Intrinsic.health <= 0)
		        {
		        	bees.splice(bees.indexOf(bee),1); 
		        	player.kills++;
		        }
		        }
    		}        	
        }
}
function punchAttack()
{
    var ants = room.getAnts();
    var bees = room.getBees();

        for(var i=0;i<ants.length;i++)
        {
        var ant = ants[i];
  		if(math.getDistanceBetweenTwoPoints(player.Intrinsic.centerPoint,ant.Intrinsic.centerPoint) < (room.cellsize*1.5))
    		{
			    var playercell = player.Intrinsic.cellPos;
			    var antcell = ant.Intrinsic.cellPos;

		        if( ((antcell.y == playercell.y) && player.Intrinsic.direction.toFixed(2) == (Math.PI/2).toFixed(2) && antcell.x>playercell.x) || ((antcell.y == playercell.y) && player.Intrinsic.direction.toFixed(2) == (Math.PI*3/2).toFixed(2) && antcell.x<playercell.x) || ((antcell.x == playercell.x) && player.Intrinsic.direction == 0 && antcell.y>playercell.y) || (( playercell.x==antcell.x ) && player.Intrinsic.direction.toFixed(2) == Math.PI.toFixed(2) && antcell.y<playercell.y) )
		        {
		 //       alert("health decreasing");
		        ant.Intrinsic.health -= player.Intrinsic.attackrating; 
		        if(ant.Intrinsic.health <= 0)
		        {
		        	ants.splice(ants.indexOf(ant),1); 
		        	player.kills++;
		        }
		        }
    		}
        }


        for(var i=0;i<bees.length;i++)
        {
        	var bee = bees[i];
  		if(math.getDistanceBetweenTwoPoints(player.Intrinsic.centerPoint,bee.Intrinsic.centerPoint) < (room.cellsize*1.5))
    		{
			    var playercell = player.Intrinsic.cellPos;
			    var beecell = bee.Intrinsic.cellPos;

		        if( ((beecell.y == playercell.y) && player.Intrinsic.direction.toFixed(2) == (Math.PI/2).toFixed(2) && beecell.x>playercell.x) || ((beecell.y == playercell.y) && player.Intrinsic.direction.toFixed(2) == (Math.PI*3/2).toFixed(2) && beecell.x<playercell.x) || ((beecell.x == playercell.x) && player.Intrinsic.direction == 0 && beecell.y>playercell.y) || (( playercell.x==beecell.x ) && player.Intrinsic.direction.toFixed(2) == Math.PI.toFixed(2) && beecell.y<playercell.y) )
		        {
		 //       alert("health decreasing");
		        bee.Intrinsic.health -= player.Intrinsic.attackrating; 
		        if(bee.Intrinsic.health <= 0)
		        {
		        	bees.splice(bees.indexOf(bee),1); 
		        	player.kills++;
		        }
		        }
    		}        	
        }
}