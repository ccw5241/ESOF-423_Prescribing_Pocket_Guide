function onloadQuestionnaire(){
	
	
}

function numAnswersChanged(elem) {
	//console.log(elem.value);
	var div = elem.parentElement;
	
	if(!isNaN(elem.value) && !elem.value.includes(".")){//is it integer?
		var currentItems = div.getElementsByClassName("optionTitle");
		var size = currentItems.length;
		if(+elem.value >= size){//add more text inputs
			for(var i = size; i < +elem.value; i++){
				var t = createTextInput("optionTitle", "Option #" + (i+1).toString() + " Title");
				t.style.marginLeft = "10px";
				div = addTextInput(div, t);
			}
		}else{//remove text inputs
			for(var i = size - 1; i >= +elem.value; i--){
				div.removeChild(currentItems[i]);
			}
			var last = 1 + ((+elem.value) * 2);//should be last element + 1
			while(div.childNodes[last] != null){
				div.removeChild(div.childNodes[last]);
			}
		}
	} else{
		alert("Not a number");
	}
}


function submitTester(form){
	var inputs = document.getElementsByTagName('input');
	var filled = true;
	for (i = 0; i < inputs.length; i++) {
		filled = filled && (inputs[i].value != "");
	}
	var numInputs = form.getElementsByClassName("onlyNums");
	var onlyNums = true;
	for (i = 0; i < numInputs.length; i++) {
		onlyNums = onlyNums && (!isNaN(numInputs[i].value) && !numInputs[i].value.includes("."));
	}
	if(!filled){
		alert("Fill out all parts of the form");
	}else if(!onlyNums){
		alert("'Number of Possible Answers' needs integer values");
	}else{//continue with submit
		developQuestionnaire(form);
	}
}
//edit this to where each qu_num in unique to the entire questionnaire? or ---alter addForm.php to use specific Qu_IDs for each Answer---
function developQuestionnaire(form){
	var QSections = form.getElementsByClassName("QSection");
	q.QSection = {};
	q.Diagnosis = {};
	//add QSections ordered (although currently nothing records that in the DB) other than for the questions
	for(var i = 0; i < QSections.length; i++){
		for(var QS_ID in q.attr["QSLinks"]){
			if(q.attr["QSLinks"][QS_ID] == QSections[i]){
				//base variables
				q.QSection[QS_ID] = {};
				q.QSection[QS_ID]["QS_ID"] = QS_ID;
				q.QSection[QS_ID]["title"] = QSections[i].getElementsByClassName("title")[0].value;
				q.QSection[QS_ID]["prompt"] = QSections[i].getElementsByClassName("prompt")[0].value;
				q.QSection[QS_ID]["numOptions"] = QSections[i].getElementsByClassName("numOptions")[0].value;
				
				//optionsTitle creation
				var allOptions = QSections[i].getElementsByClassName("optionTitle");
				q.QSection[QS_ID]["options"] = {};
				for(var j = 0; j < allOptions.length; j++){
					q.QSection[QS_ID]["options"][j] = allOptions[j].value;
				}
				
				//Questions Creation
				q.QSection[QS_ID]["questions"] = {};
				var questions = QSections[i].getElementsByClassName("Question");
				for(var j = 0; j < questions.length; j++){
					for(var Qu_ID in q.attr["QuLinks"]){
						//matched the ordered QSection by class names questions with the Qu_ID
						if(q.attr["QuLinks"][Qu_ID] == questions[j]){
								q.QSection[QS_ID]["questions"][Qu_ID] = {};
								q.QSection[QS_ID]["questions"][Qu_ID]["Qu_ID"] = Qu_ID;
								q.QSection[QS_ID]["questions"][Qu_ID]["qu_text"] = questions[j].getElementsByClassName("qu_text")[0].value;
								q.QSection[QS_ID]["questions"][Qu_ID]["qu_num"] = j;
						}
					}
				}
			}
		}
	}
	var wrapperD_ID = uniqueID("D_");
	q.Diagnosis[wrapperD_ID] = {};
	q.Diagnosis[wrapperD_ID]["D_ID"] = wrapperD_ID;
	q.Diagnosis[wrapperD_ID]["title"] = "Overall Diagnosis";
	q.Diagnosis[wrapperD_ID]["logic"] = 'AND_ALL';
	
	var DSections = form.getElementsByClassName("DSection");
	for(var i = 0; i < DSections.length; i++){
		for(var D_ID in q.attr["DLinks"]){
			//matched D_ID with the div element
			if(q.attr["DLinks"][D_ID] == DSections[i]){
				q.Diagnosis[wrapperD_ID][D_ID] = {};
				q.Diagnosis[wrapperD_ID][D_ID]["D_ID"] = D_ID;
				q.Diagnosis[wrapperD_ID][D_ID]["title"] = DSections[i].getElementsByClassName("title")[0].value;
				q.Diagnosis[wrapperD_ID][D_ID]["posMessage"] = DSections[i].getElementsByClassName("posMessage")[0].value;
				q.Diagnosis[wrapperD_ID][D_ID]["negMessage"] = DSections[i].getElementsByClassName("negMessage")[0].value;
				q.Diagnosis[wrapperD_ID][D_ID]["footnote"] = DSections[i].getElementsByClassName("footnote")[0].value;
				q.Diagnosis[wrapperD_ID][D_ID]["logic"] = DSections[i].getElementsByClassName("logic")[0].value;
			}
		}
	}
	
	console.log(q);
	q.addToDB();
}


function createQSection(button){
	var fieldLocation = button.parentElement;
	var QS_ID = uniqueID("QS_");
	//create new Section div
	var newField = document.createElement('div');
	newField.className = "QSection";
	//add field #
	var number = parseInt(fieldLocation.getElementsByClassName("QSection").length) + 1;
	newField.appendChild(document.createElement('br'));
	newField.appendChild(document.createTextNode("Field #" + number + ":"));
	//add text inputs
	var t = createTextInput("title", "Title");
	newField = addTextInput(newField, t);
	t = createTextInput("prompt", "User Prompt");
	newField = addTextInput(newField, t);
	//create number of answers input
	var optionsDiv = document.createElement('div');
	optionsDiv.className = "optionsDiv";
	t = createTextInput("numOptions", "Number of Possible Answers");
	t.onchange = function(){numAnswersChanged(t);};
	optionsDiv.appendChild(t);
	newField = addTextInput(newField, optionsDiv);
	//add addQuestion button
	var buttonInput = document.createElement("input");
	buttonInput.type = "button";
	buttonInput.value = "Add Question";
	buttonInput.className = "button";
	buttonInput.onclick = function(){createQuestion(buttonInput);};
	newField.appendChild(document.createElement('br'));
	newField.appendChild(buttonInput);
	newField.appendChild(document.createElement('br'));
	//add whole thing;
	fieldLocation.appendChild(newField);
	//append QSection/Field div linkage to this Questionnaire
	q.attr["QSLinks"][QS_ID] = newField;
}

function createDSection(button){
	var fieldLocation = button.parentElement;
	var D_ID = uniqueID("D_");
	//create new Section div
	var newField = document.createElement('div');
	newField.className = "DSection";
	//add field #
	var number = parseInt(fieldLocation.getElementsByClassName("DSection").length) + 1;
	newField.appendChild(document.createElement('br'));
	newField.appendChild(document.createTextNode("Field #" + number + ":"));
	//add text inputs
	var t = createTextInput("title", "Title");
	newField = addTextInput(newField, t);
	t = createTextInput("posMessage", "Positive Message");
	newField = addTextInput(newField, t);
	t = createTextInput("negMessage", "Negative Message");
	newField = addTextInput(newField, t);
	t = createTextInput("footnote", "Footnote");
	newField = addTextInput(newField, t);
	t = createTextInput("logic", "Logic");
	newField = addTextInput(newField, t);
	//add whole thing;
	fieldLocation.appendChild(newField);
	//append Diagnosis/Field div linkage to this Questionnaire
	q.attr["DLinks"][D_ID] = newField;
}

function createTextInput(name, placeholder){
	var textInput = document.createElement("input");
	textInput.type = "text";
	textInput.name = name;
	textInput.placeholder = placeholder;
	textInput.className = name;
	return(textInput);
}
function addTextInput(newField, textInput){
	newField.appendChild(document.createElement('br'));
	newField.appendChild(textInput);
	return newField;
}

function createQuestion(button){
	var fieldLocation = button.parentElement;
	var Qu_ID = uniqueID("Qu_");
	var newField = document.createElement('div');
	newField.className = "Question";
	//add text inputs
	t = createTextInput("qu_text", "Question Text");
	newField = addTextInput(newField, t);
	//add whole thing;
	fieldLocation.appendChild(newField);
	//append Diagnosis/Field div linkage to this Questionnaire
	q.attr["QuLinks"][Qu_ID] = newField;
}

