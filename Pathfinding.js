//Muhammad Azri A0073951B
function Pathfinding(grid)
{

  var prevx = 0,prevy = 0;
  
	this.objectgo = function(object,endpoint)
  {
    var goup = false;
    var godown = false;
    var goright = false;
    var goleft = false;      

    var diagonalmovevel = 400/Math.sin((Math.PI/4));
    //console.log("Diag Vel = "+diagonalmovevel);
    var objectrow = this.getObjectIndexRow(object);
    var objectcol = this.getObjectIndexCol(object);  

    var endpointrow = this.getObjectIndexRow(endpoint);
    var endpointcol = this.getObjectIndexCol(endpoint);  


var upfailed =0,downfailed=0,leftfailed=0,rightfailed=0;
//row index increment to go down

    if(objectrow < endpointrow)
    {
      if(!(room.map[(objectrow+1)][objectcol].occupied))         
      {godown = true;}
      else
      {downfailed = true;}
    }
//row index increment to go up    
    if(objectrow > endpointrow)
    {
      if(!(room.map[(objectrow-1)][objectcol].occupied))  
      {goup = true;}
    else
      {upfailed=true;}
    }
//col index increment to go right    
    if(objectcol < endpointcol)
    {
      if(!(room.map[objectrow][(objectcol+1)].occupied))  
      {goright = true;}
    else
      {rightfailed=true;}
    }
//col index increment to go left   
    if(objectcol > endpointcol)
    {
    //left
      if(!(room.map[objectrow][(objectcol-1)].occupied))
      {goleft = true;}
    else
      {leftfailed=true;}
    }
  

    //if not going any direction
    if(!goleft && !goright && !goup && !godown)
    {
      //only if not more than 1 cell size apart
      if(math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint) > (room.cellsize*1.5))
      {
      if(leftfailed)
      {
        
        if(objectrow > 0)  //not 1st row
        {
          //goupleft
          if(!(room.map[(objectrow-1)][objectcol-1].occupied)&& math.getDistanceBetweenTwoPoints(room.map[(objectrow-1)][objectcol-1].point,endpoint.Intrinsic.centerPoint) < math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint))  
          {
            goup = true;
            goleft=true;
          } 
          else if(objectrow < (room.rows-1)) //not last row
          if(!(room.map[(objectrow+1)][objectcol-1].occupied)&& math.getDistanceBetweenTwoPoints(room.map[(objectrow+1)][objectcol-1].point,endpoint.Intrinsic.centerPoint) < math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint))         
          {
            godown = true;
            goleft=true;
          }             
        }
      }
      else if(rightfailed)
      {
        
        if(objectrow > 0)  //not 1st row
        {
          
          //goupright
          if(!(room.map[(objectrow-1)][objectcol+1].occupied)&& math.getDistanceBetweenTwoPoints(room.map[(objectrow-1)][objectcol+1].point,endpoint.Intrinsic.centerPoint) < math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint))  
          {
            goup = true;
            goright=true;
          } 
          else if(objectrow < (room.rows-1)) //not last row
          if(!(room.map[(objectrow+1)][objectcol+1].occupied)&& math.getDistanceBetweenTwoPoints(room.map[(objectrow+1)][objectcol+1].point,endpoint.Intrinsic.centerPoint) < math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint))         
          {
            godown = true;
            goright=true;
          }             
        }
      }
      else if(upfailed)
      {
        
        if(objectcol > 0)  //not 1st col
        {
          
          //goupleft
          if(!(room.map[(objectrow-1)][objectcol-1].occupied)&& math.getDistanceBetweenTwoPoints(room.map[(objectrow-1)][objectcol-1].point,endpoint.Intrinsic.centerPoint) < math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint))  
          {
            goleft=true;            
            goup = true;

          } 
          else if(objectcol < (room.columns-1)) //not last col
          if(!(room.map[(objectrow-1)][objectcol+1].occupied)&& math.getDistanceBetweenTwoPoints(room.map[(objectrow-1)][objectcol+1].point,endpoint.Intrinsic.centerPoint) < math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint))         
          {
            goright = true;
            goup = true;
          }             
        }    
      }
      else if(downfailed)
      {
        
        if(objectcol > 0)  //not 1st col
        {
          
          //godownleft
          if(!(room.map[(objectrow+1)][objectcol-1].occupied)&& math.getDistanceBetweenTwoPoints(room.map[(objectrow+1)][objectcol-1].point,endpoint.Intrinsic.centerPoint) < math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint))  
          {
            goleft=true;            
            godown = true;

          } 
          else if(objectcol < (room.columns-1)) //not last col
          if(!(room.map[(objectrow+1)][objectcol+1].occupied)&& math.getDistanceBetweenTwoPoints(room.map[(objectrow+1)][objectcol+1].point,endpoint.Intrinsic.centerPoint) < math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint))         
          {
            goright = true;
            godown = true;
          }             
        }         
      }
      }
    }

      if(leftfailed)
      {physicsEngine.applyForceAtAngle(object,0,Math.PI);}
      if(rightfailed)
      {physicsEngine.applyForceAtAngle(object,0,0);}
      if(upfailed)
      {physicsEngine.applyForceAtAngle(object,0,Math.PI*3/2);}
      if(downfailed)
      {physicsEngine.applyForceAtAngle(object,0,Math.PI/2);}


//DIAGONALS



    //downright
    if(objectrow < room.rows-1 && objectcol < room.columns-1)
    if(room.map[objectrow+1][objectcol+1].occupied && goright && godown)
    {
      if(room.map[objectrow][objectcol+1].occupied)
      goright = false;
      else
      godown = false;
    }

    //downleft
    if(objectcol >0 && objectrow < room.rows-1)
    if(room.map[(objectrow+1)][objectcol-1].occupied && goleft && godown)
    {
      if(room.map[objectrow+1][objectcol].occupied)
      godown = false;
      else
      goleft = false;
    }    

    //upright
    if(objectrow >0 && objectcol < room.columns-1)
    if(room.map[(objectrow-1)][objectcol+1].occupied && goright && goup)
    {
      if(room.map[objectrow][objectcol+1].occupied)
      goright = false;
      else
      goup = false;
    }

    //upleft
    if(objectrow >0 && objectcol >0)    
    if(room.map[(objectrow-1)][objectcol-1].occupied && goleft && goup)
    { 
      if(room.map[objectrow][objectcol-1].occupied)
      goleft = false;
      else
      goup = false;
    }       

//      console.log("Up:"+goup+" Down:"+godown+" Left:"+goleft+" Right:"+goright);  
//      console.log("prevx:"+prevx+" Current X:"+ object.Intrinsic.centerPoint.x);
//if((prevy == object.Intrinsic.centerPoint.y && prevx == object.Intrinsic.centerPoint.x))
//  {
  
  if(goright && goup)
  {
    physicsEngine.applyForceAtAngle(object,diagonalmovevel,Math.PI*3.5/2);
//    room.map[objectrow-1][objectcol+1].occupied = true;
  }
  else if(goright && godown)
  {
    physicsEngine.applyForceAtAngle(object,diagonalmovevel,Math.PI/4);
//    room.map[objectrow+1][objectcol+1].occupied = true;
  }
  else if(goleft && goup)
  {
    physicsEngine.applyForceAtAngle(object,diagonalmovevel,Math.PI*2.5/2);
//    room.map[objectrow-1][objectcol-1].occupied = true;
  }
  else if(goleft && godown)
  {
    physicsEngine.applyForceAtAngle(object,diagonalmovevel,Math.PI*1.5/2);
//    room.map[objectrow+1][objectcol-1].occupied = true;
  }
  else if(goup)
  {
    physicsEngine.applyForceAtAngle(object,400,Math.PI*3/2);
//    room.map[objectrow-1][objectcol].occupied = true;
  }
  else if(godown)
  {
    physicsEngine.applyForceAtAngle(object,400,Math.PI/2);
//    room.map[objectrow+1][objectcol].occupied = true;
  }
  else if(goleft)
  {
    physicsEngine.applyForceAtAngle(object,400,Math.PI);
//    room.map[objectrow][objectcol-1].occupied = true;
  }
  else if(goright)
  {
    physicsEngine.applyForceAtAngle(object,400,0);
//    room.map[objectrow][objectcol+1].occupied = true;
  }
//  }

  room.map[objectrow][objectcol].occupied=true;
  prevy = object.Intrinsic.centerPoint.y;
  prevx = object.Intrinsic.centerPoint.x;

  }//end of objectgo function


this.getObjectIndexCol = function(object)
{
  var col = Math.floor(object.Intrinsic.centerPoint.x/room.cellsize);
  //console.log("Col:"+col);
  return col;
}
this.getObjectIndexRow = function(object)
{
  var row = Math.floor(object.Intrinsic.centerPoint.y/room.cellsize);
  //console.log("Row:"+row);
  return row;
}

}
