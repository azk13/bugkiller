function Ants(centerPoint){
	this.Intrinsic = new Intrinsic(centerPoint, 40, 40);
	this.Intrinsic.color = 'black';
	this.identity = 'ant';
	this.cflag = false;
	this.cpoint = new Point(0, 0);
}
