// Everyone contributed equally
function Bees(centerPoint){
	this.Intrinsic = new Intrinsic(centerPoint, 40, 40);
	this.Intrinsic.color = 'orange';	
    this.identity = 'bee';
	this.shootcounter = 5;
	this.stingpos = new Point(9999,9999);
	this.stingdir = 'none';
}