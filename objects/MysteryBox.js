//Chua Hong Shing U094743N
function MysteryBox(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.centerPoint = centerPoint;	
	this.Intrinsic.color = '#FF00FF';
	this.cellpos = new Point((centerPoint.x - 20)/40, (centerPoint.y - 20)/40);
	this.counter = 0; // Counter to keep track of how long the mystery box has not been touched
	this.item = 0; // Item 1 = knife, 2 = bomb, 3 = shuriken, 4 = enemy, 5 = health
	this.spawn_time; // This keeps the time of when the box was last spawned
	this.stage = 1; // This describes the current stage and what will be spawne
	this.updateCounter = function(){
		this.counter++;
		if(this.counter == 500)
		{
			this.counter = 0;
			return 1;
		}

		return 0;
	}

	// Spawns new point
	this.spawn = function(newPoint, item){
		this.Intrinsic.centerPoint = newPoint;
		this.cellpos = new Point((newPoint.x - 20) / 40 , (newPoint.y-20)/40); 

		switch(item)
		{
			case 1:
				this.item = 1;
				this.isknife = true;
				this.isbomb = false;
				this.isshuriken = false;
				this.isenemy = false;
				this.ishealth = false;
				//Mystery box contains knife
				break;
			case 2:
				this.item = 2;
				this.isknife = false;
				this.isbomb = true;
				this.isshuriken = false;
				this.isenemy = false;
				this.ishealth = false;
				//Mystery box contains bomb
				break;
			case 3:
				this.item = 3;
				this.isknife = false;
				this.isbomb = false;
				this.isshuriken = true;
				this.isenemy = false;
				this.ishealth = false;
				//Mystery box contains shuriken
				break;
			case 4:
				this.item = 4;
				this.isknife = false;
				this.isbomb = false;
				this.isshuriken = false;
				this.isenemy = true;
				this.ishealth = false;
				//Mystery box contains enemy
				break;
			case 5:
				this.item = 5;
				this.isknife = false;
				this.isbomb = false;
				this.isshuriken = false;
				this.isenemy = false;
				this.ishealth = true;
				break;
		}

		
	}
	this.mysteryBox_spawn = function(time_start){
	var time_now = Date.now();
	this.spawn_time = time_now;
	time_elapsed = (time_now - time_start) / 1000;
	//console.log(time_elapsed);
	var percent = Math.random() * 100;
	var item = 0;
	var dying = false;
	
	/*
	if(time_elapsed < 10) // Early game
	{
 		if(percent <= 20)
 			item = 1// 20% chance to spawn knife 
 		else
 			item = 2// 80% chance to spawn bomb
	}
	else if (time_elapsed < 60) // Mid game
	{
		if(percent <= 30)
			item = 1// 30% chance to spawn knife
		else if(percent <= 90)
			item = 2// 60% chance to spawn bomb
		else
			item = 3//10% chance to spawn shuriken 
	}
	else // Late game
	{
		if(time_elapsed <= 120)
			item = 1// 30% chance to spawn knife
		else if(percent <= 65)
			item = 2//35% chance to spawn bomb
		else if(percent <= 95)
			item = 3// 30% chance to spawn shurkien
		else
			item = 4// 5% chance to spawn enemy		
	}

	//console.log(item);
	*/

	console.log("Percent = " + percent);

	switch(this.stage)
		{
			case 1: // Stage 1 - Can only spawn bomb and knife
			if(percent <= 30)
			item = 2; // Can only spawn bomb
			else if(percent <= 90)
			item = 1; // Spawn knife
			else
			item = 3; // Spawn shuriken
			break;

			case 2: // Stage 2 
			if(percent <= 20)
			item = 2; // Can only spawn bomb
			else if(percent <= 80)
			item = 1; // Spawn knife
			else
			item = 3; // Spawn shuriken
			break;

			case 3: // Can spawn all weapons
			if(percent <= 50)
			item = 1// 50% chance to spawn knife
			else if(percent <= 75)
			item = 2// 25% chance to spawn bomb
			else
			item = 3//25% chance to spawn shuriken
			break;

			case 4: // Can spawn all weapons
			if(percent <= 60)
			item = 1// 60% chance to spawn knife
			else if(percent <= 80)
			item = 2// 20% chance to spawn bomb
			else
			item = 3//20% chance to spawn shuriken
			break;

			case 0:  // Assessment period for player
			item = 5; // Spawn health for the player to heal
			break;
		}

	// If player health is below a certain amount, increase probability of spawning health
	if(player.Intrinsic.health < 50)
		{
			if(percent < 10)
				item = 5;
		}
	else
	{
		if(percent < 5)
			item = 5;
	}
	if(player.Intrinsic.health < 25)
	{
		if(percent < 20)
			item = 5;
	}
	if(player.Intrinsic.health < 5)
	{
		if(percent < 50)
			item = 5;

	}
	
	console.log("Item is " + item);
	return item;
	}
	this.unlock_mysteryBox = function(room, time_start){

		//var weapons = room.getWeapons;
		var number = weapons.length;

		var health = room.getHealth();

		//console.log(this.item);

		switch(this.item)
		{
			case 1:// Spawn knife
				weapons.push(new Weapon(this.Intrinsic.centerPoint, 'Attack', 'Knife'));
				//console.log(weapons[number].identity);
				break;
			case 2:// Spawn bomb
				weapons.push(new Weapon(this.Intrinsic.centerPoint, 'Attack', 'Bomb'));
				//console.log(weapons[number].identity);
				break;
			case 3:// Spawn shuriken
				weapons[number] = (new Weapon(this.Intrinsic.centerPoint, 'Attack', 'Shuriken'))
				//console.log(weapons[number].identity);
				break;
			case 4:// Spawn enemy
				break;
			case 5://spawn health
				health.cellpos = this.cellpos;
				health.Intrinsic.centerPoint = this.Intrinsic.centerPoint;

				break;
		}


		//this.spawn(new Point(60, 60), 1);
		
		var available = new Array();
		// Find places that contain no items to spawn 
		for(var i = 0; i < room.rows; i++)
		{
			for(var j = 0; j < room.columns; j++)
			{
				if(!room.map[i][j].occupied && !room.map[i][j].isWeapon && i != this.cellpos.x && j != this.cellpos.y)
					available.push(room.map[i][j]);
			}
		}
		//mysterybox.spawn(new Point((Math.floor((Math.random() * 880) / 40) + 1) * 40 + 20, (Math.floor((Math.random() * 560) / 40) + 1) * 40 + 20), mysterybox.mysteryBox_spawn(timer));
		var index = Math.floor(Math.random() * (available.length - 1));

		this.spawn(available[index].point, this.mysteryBox_spawn(time_start));
		//console.log(this.mysteryBox_spawn(timer));

	}
}
