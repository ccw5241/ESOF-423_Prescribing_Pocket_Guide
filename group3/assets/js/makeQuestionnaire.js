//globals
var Q_ID;
var q;
function onloadQuestionnaire(){
	//genPHQ9();
	Q_ID = getCookieDataByKey('Q_ID');
	if(Q_ID != ""){
		q = new Questionnaire().simpleConstructor(Q_ID);
		q.loadFromDB(loadToPage);
	}else{
		q = new Questionnaire().simpleConstructor(uniqueID("Q_"));
	}
}

function loadToPage(){
	q.attr["Q_ID"] = uniqueID("Q_");
	var form = document.getElementById("Questionnaire");
	var qName = form.getElementsByClassName("QuestionnaireName")[0];
	var name = q.attr["name"];
	//alter name to be different from original
	var x = name.lastIndexOf("ver ");
	if(x > 0){ //if found 'ver '
		var number = name.slice(x+4);
		if(!isNaN(number)){
			name = name.slice(0, x+4) + (Math.floor(+number + 1)).toString();
		}else{
			name += " ver 2";
		}
	}else{
		name += " ver 2";
	}
	qName.value = name;
	q.attr["name"] = name;

	//create QSections on this questionnaire
	var QSFields = document.getElementById("QFields");
	var i = 0;
	for(var QSItem in q.QSection){
		createQSection();
		var curQField = QFields.getElementsByClassName("QSection")[i];
		var inputs = curQField.getElementsByTagName("input");
		for(var j = 0; j < inputs.length - 1; j++){// length - 1 from add question button
			inputs[j].value = q.QSection[QSItem][inputs[j].className];
		}
		//make all questions
		var button = inputs[inputs.length - 1];
		var k = 0; //question counter
		for(var QuItem in q.QSection[QSItem]["questions"]){
			createQuestion(button);
			var curQuestion = curQField.getElementsByClassName("Question")[k];
			var QuTextField = curQuestion.getElementsByTagName("input")[0];
			QuTextField.value = q.QSection[QSItem]["questions"][QuItem][QuTextField.className];
			k++;
		}
		//make all optionTitles
		var optionsElem = curQField.getElementsByClassName("numOptions")[0];
		numAnswersChanged(optionsElem);
		k = 0;
		allOptTitle = curQField.getElementsByClassName("optionTitle");
		for(var optItem in q.QSection[QSItem]["options"]){
			allOptTitle[k].value = q.QSection[QSItem]["options"][optItem];
			k++;
		}
		i++;
	}

	//make qu_num => newQu_IDs array
	var allQuestionElems = form.getElementsByClassName("Question");
	//sort by question number
	var allQuByNum = [];
	for (var i = 0; i < allQuestionElems.length; i++){
		//compose qu_num => QuElems lookup table
		allQuByNum[i] = allQuestionElems[i];
		//convert qu_num => QuElems to qu_num => newQu_IDs
		for (var Qu_ID in q.attr["QuLinks"]){
			if(allQuByNum[i] == q.attr["QuLinks"][Qu_ID]){
				allQuByNum[i] = Qu_ID;
			}
		}
	}
	//get conversion dict of oldQu_ID => newQu_ID
	oldIdToNewId = {};
	//get old questions
	var allOldQuestions = q.getAllQuestions();
	for(var oldQu_ID in allOldQuestions){
		oldIdToNewId[oldQu_ID] = allQuByNum[allOldQuestions[oldQu_ID]["qu_num"]];
	}

	//createDiagnosis for this questionnaire
	var DFields = document.getElementById("DFields");
	i = 0;
	for(var DItem in q.Diagnosis){
		if(DItem.includes("D_") && DItem != "D_ID" && DItem != "Parent_D_ID"){
			createDSection();
			var curDField = DFields.getElementsByClassName("DSection")[i];
			var inputs = curDField.getElementsByTagName("input");
			for(var j =0; j < inputs.length; j++){
				// add inputs' past values
				inputs[j].value = q.Diagnosis[DItem][inputs[j].className];
			}
			//find logic section
			logic = curDField.getElementsByClassName("logic")[0];
			console.log(logic);
			//reload logic with new Qu_IDs
			for(var oldQu_ID in oldIdToNewId){
				q.Diagnosis[DItem]["logic"] = q.Diagnosis[DItem]["logic"].replace("\"" + oldQu_ID + "\"", "\"" + oldIdToNewId[oldQu_ID] + "\"");
			}
			logic.value = q.Diagnosis[DItem]["logic"];
			console.log(logic.value);
			i++;
		}
	}
	console.log(q);
}

function copyQu_ID(clickedElem){
	divItem = clickedElem.parentElement;
	alert("copied");
	for(var Qu_ID in q.attr["QuLinks"]){
		if(q.attr["QuLinks"][Qu_ID] == divItem){
			var textBox = divItem.getElementsByClassName("qu_text")[0]
			var saveStr = textBox.value;
			textBox.value = '$answers["' + Qu_ID + '"]["ans"]'; //$answers["Qu_xxxx"]["ans"]
			textBox.select();
			document.execCommand("Copy");// copy to clipboard
			//reload original text
			textBox.value = saveStr;
		}
	}
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

	if(!onlyNums){
		alert("'Number of Possible Answers' needs integer values");
	}else if(!filled){
		if(confirm("Not all parts of the form are filled out. Is this okay?")){
			developQuestionnaire(form);
		}
	}else{//continue with submit
		developQuestionnaire(form);
	}
}
//edit this to where each qu_num in unique to the entire questionnaire? or ---alter addForm.php to use specific Qu_IDs for each Answer---
function developQuestionnaire(form){
	var QSections = form.getElementsByClassName("QSection");
	q.QSection = {};
	q.Diagnosis = {};
	q.attr["name"] = form.getElementsByClassName("QuestionnaireName")[0].value;
	//add QSections ordered (although currently nothing records that in the DB) other than for the questions
	var quNum = 0;
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
								q.QSection[QS_ID]["questions"][Qu_ID]["qu_num"] = quNum + j;
						}
					}
				}
				quNum += questions.length;
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
	var fieldLocation = document.getElementById("QFields");//button.parentElement;
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
	var fieldLocation = document.getElementById("DFields");//button.parentElement;
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
	//t = createTextInput("logic", "Logic");
	t = document.createElement("textarea");
	t.name = "logic";
	t.placeholder = "Logic";
	t.className = "logic";
	t.cols = "80";
	t.rows = "10";
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
	var t = createTextInput("qu_text", "Question Text");
	newField = addTextInput(newField, t);
	//add copy button
	var copy = document.createElement("input");
	copy.type = "button";
	copy.value = "Copy ID";
	copy.className = "button";
	copy.style.marginLeft = "10px";
	copy.onclick = function(){copyQu_ID(copy);};
	newField.appendChild(copy);
	//add whole thing;
	fieldLocation.appendChild(newField);
	//append Diagnosis/Field div linkage to this Questionnaire
	q.attr["QuLinks"][Qu_ID] = newField;
}


//unit test for onloadQuestionnaire
var unitTests = {};

unitTests.onloadQuestionnaire = function(method){
	var str = ""
	var result = new Questionnaire().simpleConstructor(uniqueID("Q_"));
	if(method(str) == result){
		return true;
	}else{
		return false;
	}
};

console.log(unitTests.onloadQuestionnaire(onloadQuestionnaire));
