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
    var objectrow = getObjectIndexRow(object);
    var objectcol = getObjectIndexCol(object);  

    var endpointrow = getObjectIndexRow(endpoint);
    var endpointcol = getObjectIndexCol(endpoint);  

//row index increment to go down
    if(objectrow < endpointrow)
    {
      if(!(room.map[(objectrow+1)][objectcol].occupied))         
      {godown = true;}
    }
//row index increment to go up    
    if(objectrow > endpointrow)
    {
      if(!(room.map[(objectrow-1)][objectcol].occupied))  
      {goup = true;}
    }
//col index increment to go right    
    if(objectcol < endpointcol)
    {
      if(!(room.map[objectrow][(objectcol+1)].occupied))  
      {goright = true;}
    }
//col index increment to go left   
    if(objectcol > endpointcol)
    {
    //left
      if(!(room.map[objectrow][(objectcol-1)].occupied))
      {goleft = true;}
//    physicsEngine.applyForceAtAngle(object,400,Math.PI);
    }           

      console.log("Up:"+goup+" Down:"+godown+" Left:"+goleft+" Right:"+goright);  
      console.log("prevx:"+prevx+" Current X:"+ object.Intrinsic.centerPoint.x);
//if((prevy == object.Intrinsic.centerPoint.y && prevx == object.Intrinsic.centerPoint.x))
//  {
  if(goright && goup)
  {physicsEngine.applyForceAtAngle(object,diagonalmovevel,Math.PI*3.5/2);}
  else if(goright && godown)
  {physicsEngine.applyForceAtAngle(object,diagonalmovevel,Math.PI/4);}
  else if(goleft && goup)
  {physicsEngine.applyForceAtAngle(object,diagonalmovevel,Math.PI*2.5/2);}
  else if(goleft && godown)
  {physicsEngine.applyForceAtAngle(object,diagonalmovevel,Math.PI*1.5/2);}
  else if(goup)
  {physicsEngine.applyForceAtAngle(object,400,Math.PI*3/2);}
  else if(godown)
  {physicsEngine.applyForceAtAngle(object,400,Math.PI/2);}
  else if(goleft)
  {physicsEngine.applyForceAtAngle(object,400,Math.PI);}
  else if(goright)
  {physicsEngine.applyForceAtAngle(object,400,0);}
//  }
  prevy = object.Intrinsic.centerPoint.y;
  prevx = object.Intrinsic.centerPoint.x;

  }//end of objectgo function


}

function getObjectIndexCol(object)
{
  var col = Math.floor(object.Intrinsic.centerPoint.x/room.cellsize);
  console.log("Col:"+col);
  return col;
}
function getObjectIndexRow(object)
{
  var row = Math.floor(object.Intrinsic.centerPoint.y/room.cellsize);
  console.log("Row:"+row);

  return row;

}


/*
//Point class, used to refer to a specific square on the grid
function point(pos_x,pos_y)
{
  this.x = pos_x;
	this.y = pos_y;
}

function grid(x, y)
{
  this.x = x;
  this.y = y;
}

//Node class, used by searches as nodes in a tree.
function Node(parent,point,g_score,h_score)
{
  this.parent = parent;
  this.point = point;
  //this.children = children;
  this.g_score = g_score;
  this.h_score = h_score;
  this.f_score = g_score + h_score;
}

//Finds the straight line distance between two points
function euclid_distance(start, end)
{
  return Math.sqrt(Math.pow(end.x - start.x,2) + Math.pow(end.y - start.y,2));
}

function check_open_list(open_list, node)
{
  for(var i = 0; i < open_list.length; i++)
  {
    if(open_list[i].point.x == node.point.x && open_list[i].point.y == node.point.y)
      return i;
  }

  return null;
}


function print_list(list)
{
  document.writeln("Contents of the list in ascending order");
  for(var i=0; i<list.length; i++)
  {
    document.write(list[i].point.x + "," + list[i].point.y + " ");
  }

}

function print_node(node)
{
  document.writeln("");
  if(node.parent == null)
    document.writeln("Parent = null");  
  else
    document.writeln("Parent = " + node.parent.point.x + "," + node.parent.point.y);
  
  document.writeln("Position = " + node.point.x + "," + node.point.y);
  document.writeln("g_score = " + node.g_score);
  document.writeln("h_score = " + node.h_score);
  document.writeln("f_score = " + node.f_score);
  document.writeln("");
}

//A* star search function
// Start -> Starting position of type "point"
// End -> Destination of type "point"
//  World -> 2D array of the world to check if there are obstacles
//  Grid -> Type "grid" to give dimenstions of the grid to declare the closed list
function Astar(start, end, world, grid) // Start represents the current position, end represents the destination, world is an array of the whole grid, 
{
  // Path is an array containing the points of the most optimum route 
  var path = new Array();

  // Create an open list
  var open_list = new Array();
    
  // Create a closed list - Closed list is a 2D array of the grid to check which points have been visited
  // 0 -> Grid not visited
  // 1 -> Grid has been visited
  var closed_list = new Array();
  for(var i = 0; i < grid.x; i++)
  {
    closed_list[i] = new Array(grid_y);
  }
  for(var i = 0; i < grid.x; i++)
  {
    for(var j = 0; j < grid.y; j++)
    {
      closed_list[i][j] = 0; 
    }
  }

  // Push starting point into open list
  var starting_node = new Node(null, start, 0, euclid_distance(start, end));
  open_list.push(starting_node);

  while (open_list.length != 0)
  {
    //Sort the list according to the lowest F score in ascending order
      open_list.sort(function(a,b){return a.f_score - b.f_score});

      var current = open_list.shift();
  
      // If the current node is the destination, break from the loop
      if(current.point.x == end.x && current.point.y == end.y)
      {
        path.push(current);
        break;
      }

      // Add it to the closed list
      closed_list[current.point.x][current.point.y] = 1;

      // For the adjacent squares 
      
      
      // For right
      if(current.point.x + 1 < grid.x)
      {
      if(world[current.point.x+1][current.point.y] == 0 && closed_list[current.point.x+1][current.point.y] == 0) // Right is unoccupied and not on the closed list and not out of boundary
      {
          
          var pointer = new point(current.point.x+1, current.point.y);
          var child = new Node(current, pointer, current.g_score + 1, euclid_distance(pointer,end));
          //Check if it is already in the open list
          var index = check_open_list(open_list, child);
          if (index != null)
          {
            if(child.g_score < open_list[index].g_score)
            {
              open_list[index].g_score = child.g_score;
              open_list[index].parent = current;

            }
          }
          else
            open_list.push(child);
          
      }
      }

      // For left
      if(current.point.x + 1 < grid.x)
      {
      if(world[current.point.x+1][current.point.y] == 0 && closed_list[current.point.x+1][current.point.y] == 0) // Right is unoccupied and not on the closed list and not out of boundary
      {
          
          var pointer = new point(current.point.x+1, current.point.y);
          var child = new Node(current, pointer, current.g_score + 1, euclid_distance(pointer,end));
          //Check if it is already in the open list
          var index = check_open_list(open_list, child);
          if (index != null)
          {
            if(child.g_score < open_list[index].g_score)
            {
              open_list[index].g_score = child.g_score;
              open_list[index].parent = current;

            }
          }
          else
            open_list.push(child);
          
      }
      }
      
      // For up
      if(current.point.y - 1 >= 0)
      {
      if(world[current.point.x][current.point.y-1] == 0 && closed_list[current.point.x][current.point.y-1] == 0) // Right is unoccupied and not on the closed list and not out of boundary
      {
          
          var pointer = new point(current.point.x, current.point.y-1);
          var child = new Node(current, pointer, current.g_score + 1, euclid_distance(pointer,end));
          //Check if it is already in the open list
          var index = check_open_list(open_list, child);
          if (index != null)
          {
            if(child.g_score < open_list[index].g_score)
            {
              open_list[index].g_score = child.g_score;
              open_list[index].parent = current;

            }
          }
          else
            open_list.push(child);
          
      }
      }

      // For down
      if(current.point.y + 1 < grid.y)
      {
      if(world[current.point.x][current.point.y+1] == 0 && closed_list[current.point.x][current.point.y+1] == 0) // Right is unoccupied and not on the closed list and not out of boundary
      {
          
          var pointer = new point(current.point.x, current.point.y+1);
          var child = new Node(current, pointer, current.g_score + 1, euclid_distance(pointer,end));
          //Check if it is already in the open list
          var index = check_open_list(open_list, child);
          if (index != null)
          {
            if(child.g_score < open_list[index].g_score)
            {
              open_list[index].g_score = child.g_score;
              open_list[index].parent = current;

            }
          }
          else
            open_list.push(child);
          
      }
      }
  }

  //Creates the path by going through the parents
  while(current.parent != null)
  {
    path.unshift(current.parent);
    current = current.parent;
  }

  return path;

}
*/