function Basket(centerPoint){
	this.Intrinsic = new Intrinsic(centerPoint, 40, 40);
	this.Intrinsic.color = '#61380B';
	this.centerPoint = centerPoint;	
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
	this.cellpos = new Point();
}