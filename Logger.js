function Logger(){
	this.logMessages = new Array();

	this.log = function(message){
		var divTag = document.createElement("div");
		divTag.innerHTML = message;
		logDiv.appendChild(divTag);
    }
}
