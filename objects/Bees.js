function Bees(centerPoint, radius, mass){
	this.Intrinsic = new Intrinsic(centerPoint, radius, mass);
	this.Intrinsic.color = 'orange';	

	this.identity = 'bee';

	this.hassting = false;
	this.enemyinsight = false;
	this.ispursuinghealth = false;
	this.ispursuingsting = false;

}