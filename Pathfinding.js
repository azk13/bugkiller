function Pathfinding(grid)
{

  var prevx = 0,prevy = 0;
  
	this.objectgo = function(object,endpoint,reverse)
  {
      if(reverse!=true)
         reverse=false;
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
      if(!reverse)
    {
    if(objectrow < endpointrow)
    {
      if(!(room.map[(objectrow+1)][objectcol].occupied))         
      {godown = true;}
      else
      {downfailed = 1;}
    }
//row index increment to go up    
    if(objectrow > endpointrow)
    {
      if(!(room.map[(objectrow-1)][objectcol].occupied))  
      {goup = true;}
    else
      {upfailed=1;}
    }
//col index increment to go right    
    if(objectcol < endpointcol)
    {
      if(!(room.map[objectrow][(objectcol+1)].occupied))  
      {goright = true;}
    else
      {rightfailed=1;}
    }
//col index increment to go left   
    if(objectcol > endpointcol)
    {
    //left
      if(!(room.map[objectrow][(objectcol-1)].occupied))
      {goleft = true;}
    else
      {leftfailed=1;}
    }
    }
    //if reverse activated for fleeing--------------------------------------------------
    else
    {
    if(objectrow > endpointrow)
    {
      if(objectrow!=room.rows-1)
      if(!(room.map[(objectrow+1)][objectcol].occupied))         
      {godown = true;}
      else
      {downfailed = 1;}
    }
//row index increment to go up  
    if(objectrow!=0)  
    if(objectrow < endpointrow)
    {
      if(!(room.map[(objectrow-1)][objectcol].occupied))  
      {goup = true;}
    else
      {upfailed=1;}
    }
//col index increment to go right    
    if(objectcol > endpointcol)
    {
      if(objectcol!=room.columns-1)
      if(!(room.map[objectrow][(objectcol+1)].occupied))  
      {goright = true;}
    else
      {rightfailed=1;}
    }
//col index increment to go left   
    if(objectcol < endpointcol)
    {
    //left
    if(objectcol!=0)
      if(!(room.map[objectrow][(objectcol-1)].occupied))
      {goleft = true;}
    else
      {leftfailed=1;}
    }      
    }

    //if not going any direction
    if(!goleft && !goright && !goup && !godown)
    {
      //only if not more than 1 cell size apart
      if(math.getDistanceBetweenTwoPoints(object.Intrinsic.centerPoint,endpoint.Intrinsic.centerPoint) > (room.cellsize*1.5))
      {
      if(leftfailed)
      {
        
        if(objectrow != 0)  //not 1st row
        {
          
          //goupleft
          if(!(room.map[(objectrow-1)][objectcol-1].occupied))  
          {
            goup = true;
            goleft=true;
          } 
          else if(objectrow != (room.rows-1)) //not last row
          if(!(room.map[(objectrow+1)][objectcol-1].occupied))         
          {
            godown = true;
            goleft=true;
          }             
        }
      }
      if(rightfailed)
      {
        
        if(objectrow != 0)  //not 1st row
        {
          
          //goupright
          if(!(room.map[(objectrow-1)][objectcol+1].occupied))  
          {
            goup = true;
            goright=true;
          } 
          else if(objectrow != (room.rows-1)) //not last row
          if(!(room.map[(objectrow+1)][objectcol+1].occupied))         
          {
            godown = true;
            goright=true;
          }             
        }
      }
      if(upfailed)
      {
        
        if(objectcol != 0)  //not 1st col
        {
          
          //goupleft
          if(!(room.map[(objectrow-1)][objectcol-1].occupied))  
          {
            goleft=true;            
            goup = true;

          } 
          else if(objectcol != (room.columns-1)) //not last col
          if(!(room.map[(objectrow-1)][objectcol+1].occupied))         
          {
            goright = true;
            goup = true;
          }             
        }    
      }
      if(downfailed)
      {
        
        if(objectcol != 0)  //not 1st col
        {
          
          //godownleft
          if(!(room.map[(objectrow+1)][objectcol-1].occupied))  
          {
            goleft=true;            
            goup = true;

          } 
          else if(objectcol != (room.columns-1)) //not last col
          if(!(room.map[(objectrow+1)][objectcol+1].occupied))         
          {
            goright = true;
            goup = true;
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

//room.map[objectrow][objectcol].occupied=true;
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
