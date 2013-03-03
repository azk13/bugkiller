function MysteryBox(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
	this.centerPoint = centerPoint;	
	this.Intrinsic.color = '#FF00FF';
	this.istaken = false;
	this.isvisible = false;
	this.isbomb = false;
	this.isknife = false;
	this.isshuriken = false;
	this.isconverter = false;
	this.ispesticide = false;
	this.isbricks = false;
	this.iscamouflage = false;
	this.issheild = false;
	this.isant = false;
	this.isenemy = false;
	this.cellpos = new Point();
	this.counter = 0; // Counter to keep track of how long the mystery box has not been touched
	this.item = 0; // Item 1 = knife, 2 = bomb, 3 = shuriken, 4 = enemy

	
	this.updateCounter = function(){
		this.counter++;
		if(this.counter == 100)
		{
			this.counter = 0;
			return 1;
		}

		return 0;
	}

	// Spawns new point
	this.spawn = function(newPoint, item){
		this.Intrinsic.centerPoint = newPoint;

		switch(item)
		{
			case 1:
				this.item = 1;
				isknife = true;
				//Mystery box contains knife
				break;
			case 2:
				this.item = 2;
				isbomb = true;
				//Mystery box contains bomb
				break;
			case 3:
				this.item = 3;
				isshuriken = true;
				//Mystery box contains shuriken
				break;
			case 4:
				this.item = 4;
				isenemy = true;
				//Mystery box contains enemy
				break;
		}
	}

	
	this.mysteryBox_spawn = function(timer)
	{
	var percent = Math.random() * 100;
	var item = 0;
	if(timer < 1000) // Early game
	{
 		if(percent <= 20)
 			item = 1// 20% chance to spawn knife 
 		else
 			item = 2// 80% chance to spawn bomb
	}
	else if (timer < 5000) // Mid game
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
		if(percent <= 30)
			item = 1// 30% chance to spawn knife
		else if(percent <= 65)
			item = 2//35% chance to spawn bomb
		else if(percent <= 95)
			item = 3// 30% chance to spawn shurkien
		else
			item = 4// 5% chance to spawn enemy		
	}

	return item;
	}
}