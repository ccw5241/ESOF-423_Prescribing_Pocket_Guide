function onload(){
	
	
}
function submitTester(){
	
}
function createSection(button){
	var fieldLocation = button.parentElement;
	console.log(button);
	//var QFields = document.getElementById("QFields");
	
	//create new Section div
	var newField = document.createElement('div');
	newField.className = "QSection";
	//add field #
	var number = parseInt(fieldLocation.getElementsByClassName("QSection").length) +1;
	newField.appendChild(document.createElement('br'));
	newField.appendChild(document.createTextNode("Field #" + number + ":"));
	//add title input
	var titleInput = document.createElement("input");
	titleInput.type = "text";
	titleInput.name = "title";
	titleInput.placeholder = "Title";
	newField.appendChild(document.createElement('br'));
	newField.appendChild(titleInput);
	//add addQuestion button
	var buttonInput = document.createElement("input");
	buttonInput.type = "button";
	
	if(fieldLocation.id == "DFields"){
		buttonInput.value="Add Diagnosis Section";
		//buttonInput.setAttribute("onclick", createSection(buttonInput));
	} else {
		buttonInput.value = "Add Question";
	}
	buttonInput.className = "button";
	newField.appendChild(document.createElement('br'));
	newField.appendChild(buttonInput);
	newField.appendChild(document.createElement('br'));
	//add whole thing;
	fieldLocation.appendChild(newField);
}