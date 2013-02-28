function Basket(centerPoint, width, height){
	this.Intrinsic = new Intrinsic(centerPoint, width, height);
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