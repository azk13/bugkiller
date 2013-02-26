/**
 * Created with JetBrains WebStorm.
 * User: renga
 * Date: 2/26/13
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */
//Abstract class or Interface of the  stateMachine which will be used by objects in the ma
/**
 * Created with JetBrains WebStorm.
 * User: renga
 * Date: 2/26/13
 * Time: 3:03 PM
 * To change this template use File | Settings | File Templates.
 */
function Ai(goal)
{
    //create a agent with sepecific Goal which could be changed
    this.goal=goal;
    // Every goal has a speicfic state machine to follow through
    this.stateMachine=new stateMachine();
    //Change the goal of the Agent
    this.setGoal= function(goal){this.goal=goal;}
}
function States(name){
    //name of the state
    this.name=name;
    //priority of the state;
    this.priority=0;
    //called when entering this state
    this.onEnter =function(){};
    //called when updating this state
    this.update=function(){};
    //called when exiting this state
    this.onExit=function(){};
}
function stateMachine()
{
    //statemachine contains an array of states
    this.states=new Array();
    this.states.push(new State("DUMB"));
    //returns the  active state
    this.activeState="NO_STATE";
    //holds the indx of the current active state so easy to change state
    this.activeStateIndx=0;
    //adding a state to the state machine
    this.addSate=function(state)
    {
        this.states.push(state);

    }
    //removing a state from the state machine.Not sure needed
    this.removeState=function(name)
    {
        for(var i=0;i<states.length;i++)

        if(this.states[i].name=name){
         this.states.splice(i,1);
        }
    }
    //returns the state at a specific position in the array
    this.getState=function(indx)
    {
      return this.states[indx];
    }
    this.performTransition=function(indx,Agent)
    {
        this.states[ this.activeStateIndx].onExit();
        this.states[indx].onEnter();
    }
    this.ExitActiveState=function(Agent)
    {
        this.states[ this.activeStateIndx].onExit();

    };
}


