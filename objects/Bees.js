function Bees(centerPoint){
	this.Intrinsic = new Intrinsic(centerPoint, 40, 40);
	this.Intrinsic.color = 'orange';	
	

	this.identity = 'bee';
	this.bombed = false; // ~ jensen

	// check location of ant in array for bombing ~ jensen
	this.index = null;

	this.hassting = false;
	this.enemyinsight = false;
	this.ispursuinghealth = false;
	this.ispursuingsting = false;

}