//Everybody contributed
function Maths(){

    this.getAngleWithQuadrobject = function(angle){
        if (angle >= 0 && angle <= Math.PI/2){
            return angle;
        }
        else if (angle > Math.PI/2 && angle <= Math.PI){
            return Math.PI-angle;
        }
        else if (angle > Math.PI && angle <= (3*Math.PI)/2){
            return angle - Math.PI;
        }
        else {
            return (2*Math.PI) - angle;
        }
    }
    this.getQuadrobjectByAngle = function(angle){
        if (angle > 2*Math.PI){
            angle = this.correctAngleToFirstCircle(angle);
        }

        if (angle >= 0 && angle <= Math.PI/2){
            return 4;
        }
        else if (angle > Math.PI/2 && angle <= Math.PI){
            return 3;
        }
        else if (angle > Math.PI && angle <= (3*Math.PI)/2){
            return 2;
        }
        else {
            return 1;
        }
    }
    this.getDistanceBetweenTwoPoints = function(p1, p2){
        var x_p1 = p1.x;
        var y_p1 = p1.y;
        var x_p2 = p2.x;
        var y_p2 = p2.y;

        var distanceSquared = Math.pow((x_p1-x_p2),2) + Math.pow((y_p1-y_p2),2);

        var distance = Math.sqrt(distanceSquared);

        //	console.log("Distance between " + p1.toString()+" and "+p2.toString()+ " is " + distance);

        return distance;
    }
}
