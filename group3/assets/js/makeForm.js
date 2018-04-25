var q;

function onload(P_ID, F_ID, Q_ID){
	//add questions to UI
	if(Q_ID != ""){
		q = new Questionnaire().simpleConstructor(Q_ID);
		q.loadFromDB(addQuestions);
	}else{
		alert("Error: No Questionnaire Selected");
	}
}

//callback to add questionnaire q
function addQuestions(quest){
	q=quest;
	let form = document.getElementById("Questionnaire");
	console.log(q);
	//add Questionnaire name
	var title = document.getElementById("title");
	var titleStr = "";
	if(q.attr["name"] != null){
		titleStr = q.attr["name"];
	}
	title.innerHTML = titleStr + " Questionnaire";
	
	var allQSections = q.getAllQSections();
	//Format: allQuestions['Qu_ID'] = {'Qu_ID': ___, 'qu_text': ____, 'qu_num': ____, 'QSection_QS_ID': QS_xxxx}
	var allQuestions = q.getAllQuestions();
	//sort by question number
	var allQuByNum = {};
	for (var key in allQuestions){
		allQuByNum[allQuestions[key]['qu_num']] = {"qu_text": allQuestions[key]['qu_text'],
													'Qu_ID': allQuestions[key]['Qu_ID'],
													'QSection_QS_ID': allQuestions[key]['QSection_QS_ID']};
	}
	//count numQ
	var numQ = 0;
	var minQnum = 2;
	for (var i in allQuByNum) {
		if(minQnum > parseInt(i)){
			minQnum = parseInt(i); //generally becomes 0
		}
	   if (allQuByNum.hasOwnProperty(i)) numQ++;
	}
	console.log(minQnum);
	console.log(allQuByNum);
	//create each question item
	var curQS_ID = "";
	var curQSectionItem;
	var width = 0;
	for (var i = minQnum; i < numQ + minQnum; i++) {
		//new QSection?
		if(curQS_ID.localeCompare(allQuByNum[i.toString()]["QSection_QS_ID"]) != 0){
			//add new line on old QSection
			if(curQSectionItem != null){
				curQSectionItem.appendChild(document.createElement('br'));
			}
			//make new QSection for next questions to me contained in
			curQS_ID = allQuByNum[i.toString()]["QSection_QS_ID"];
			width = (800)/(allQSections[curQS_ID]["options"].length + 1);
			curQSectionItem = makeQSItem(allQSections[curQS_ID], width);
			form.appendChild(curQSectionItem);
		}
		//make Question
		var oneQ = makeQuItem(allQuByNum[i.toString()]["qu_text"], i.toString(), allQSections[curQS_ID]["options"].length, width);
		curQSectionItem.appendChild(oneQ);
		curQSectionItem.appendChild(document.createElement('br'));
	}
	curQSectionItem.appendChild(document.createElement('br'));
	
	F_ID = getCookieDataByKey('F_ID');
	P_ID = getCookieDataByKey('P_ID');
	Q_ID = getCookieDataByKey('Q_ID');
	// adds possible start values
	if(F_ID != "" && P_ID !="" && Q_ID !=""){
		var p = new Patient().simpleConstructor(P_ID);
		p.loadAnsFromDB(addStartValues);
	}
}

function makeQSItem(QSection, width){
	var newField = document.createElement("div");
	//add title
	var titleField = document.createTextNode(QSection["title"]);
	newField.appendChild(titleField);
	newField.appendChild(document.createElement('br'));
	//prompt:
	var promptField = document.createTextNode(QSection["prompt"]);
	newField.appendChild(promptField);
	newField.appendChild(document.createElement('br'));
	//make options row:
	var optionsRow = document.createElement("div");
	optionsRow.style.display = "inline-block";
	var blankField = document.createElement("div");
	blankField.style.display = "inline-block";
	blankField.style.width = width.toString() + "px";
	optionsRow.appendChild(blankField);
	for(var i = 0; i< QSection["options"].length; i++){
		var div = document.createElement("div");
		div.style.textAlign = "center";
		div.style.display = "inline-block";
		div.style.width = width.toString() + "px";
		var optionField = document.createTextNode(QSection["options"][i.toString()]);
		div.appendChild(optionField);
		optionsRow.appendChild(div);
	}
	newField.appendChild(optionsRow);
	newField.appendChild(document.createElement('br'));
	return newField;
}

function makeQuItem(qu_text, name, options, width){
	var newField = document.createElement("div");
	newField.className = "qu " + name;
	//add text question
	var textDiv = document.createElement("div");
	textDiv.style.display = "inline-block";
	textDiv.style.width = width.toString() + "px";
	var textField = document.createTextNode(qu_text);
	textDiv.appendChild(textField);
	newField.appendChild(textDiv);
	//add x number radio buttons
	for(var i = 0; i < options; i++){
		var radioItem = document.createElement("input");
		radioItem.type = "radio";
		radioItem.name = name;
		radioItem.value = i.toString();
		radioItem.style.width = width.toString() + "px";
		newField.appendChild(radioItem);
	}
	newField.appendChild(document.createElement('br'));
	return newField;
}

//callback after patient is loaded with all forms
function addStartValues(patient){
	var F_ID = getCookieDataByKey('F_ID');
	var formField = document.getElementById("Questionnaire");
	var questions = formField.getElementsByClassName("qu");
	for(var i = 0; i < questions.length; i++){
		var relatedRadios = questions[i].getElementsByTagName('input');
		for(var j = 0; j < relatedRadios.length; j++){
			if(parseInt(relatedRadios[j].value) == parseInt(patient.forms[F_ID].attr["answers"][i])){
				relatedRadios[j].checked = true;
			}
		}
	}
	//populate with previous form answers
	console.log(F_ID);
}

function initializeDiagnosis(form){
	console.log(q);
	var allQSections = q.getAllQSections();
	//Format: allQuestions['Qu_ID'] = {'Qu_ID': ___, 'qu_text': ____, 'qu_num': ____, 'QSection_QS_ID': QS_xxxx}
	var allQuestions = q.getAllQuestions();
	//sort by question number
	var quNumOffset = 2;
	var allQuByNum = {};
	for (var key in allQuestions){
		if(quNumOffset > parseInt(allQuestions[key]['qu_num'])){
			quNumOffset = parseInt(allQuestions[key]['qu_num'])
		}
		allQuByNum[allQuestions[key]['qu_num']] = {"qu_text": allQuestions[key]['qu_text'],
													'Qu_ID': allQuestions[key]['Qu_ID'],
													'QSection_QS_ID': allQuestions[key]['QSection_QS_ID']};
	}
	
	//make answers array and Dict
	var inputs = form.getElementsByClassName("qu");
	var formAnswers = new Array();
	//FORMAT: answers["Qu_xxxx"]["ans"] = radio button selected
	var answers = {};
	for (i = 0; i < inputs.length; i++) {
		var relatedRadios = inputs[i].getElementsByTagName('input');
		for(j = 0; j < relatedRadios.length; j++){
			if(relatedRadios[j].checked){
				// i = qu_num-1; (ie formAnswers[i] == formAnswers[qu_num-1])
				//    qu_num-1 = answer
				formAnswers[i] = j;
				//								Qu_xxxx  = answer
				answers[allQuByNum[i+quNumOffset]["Qu_ID"]] = {};
				answers[allQuByNum[i+quNumOffset]["Qu_ID"]]["ans"] = j;
			}
		}
	}
	console.log(formAnswers);
	console.log(answers);
	
	//make dummy patient to add form to DB
	F_ID = getCookieDataByKey('F_ID');
	P_ID = getCookieDataByKey('P_ID');
	if(P_ID != "" && F_ID == ""){
		var pat = new Patient().simpleConstructor(P_ID);
		pat.addAnsToDB(formAnswers, q.attr["Q_ID"], dbSubmitResponse);
		document.cookie="F_ID=submitted";
	}
	
	//printout Diagnosis:
	q.evaluateDiagnosis(answers, printoutDiag);
}

function submitTester(form){
	var inputs = form.getElementsByClassName("qu");
	var filled = true;
	for (i = 0; i < inputs.length; i++) {
		var relatedRadios = inputs[i].getElementsByTagName('input');
		var foundOne = false;
		for(j = 0; j < relatedRadios.length; j++){
			if(relatedRadios[j].checked){
				foundOne = true;
			}
		}
		filled = filled && foundOne;
	}
	if(!filled){
		alert("Fill out all parts of the form");
	}else{//continue with submit
		initializeDiagnosis(form);
	}
}

//callback after evaluation is created
function printoutDiag(evalReturn){
	var display = document.getElementById("display");
	//clear anything already here
	while (display.firstChild) {
		display.removeChild(display.firstChild);
	}
	//console.log(evalReturn);
	for(var D_ID in evalReturn){
		var thisDiag = q.Diagnosis[D_ID];
		//Display all Diagnosis info
		var div = document.createElement("div");
		div.appendChild(document.createTextNode(thisDiag["title"]));
		div.appendChild(document.createElement('br'));
		var message = "";
		if(typeof(evalReturn[D_ID]) !== "boolean"){
			message = evalReturn[D_ID];
		}
		else if(evalReturn[D_ID]){
			message = thisDiag["posMessage"];
			if(message == ""){
				message = "True";
			}
		}else{
			message = thisDiag["negMessage"];
			if(message == ""){
				message = "False";
			}
		}
		var innerDiv = document.createElement("div");
		innerDiv.style.marginLeft = "20px";
		//innerDiv.style.width = "400px";
		innerDiv.style["white-space"] = "normal";
		innerDiv.innerHTML += message ;
		innerDiv.appendChild(document.createElement('br'));
		innerDiv.innerHTML += thisDiag["footnote"];
		innerDiv.appendChild(document.createElement('br'));
		innerDiv.appendChild(document.createElement('br'));
		
		div.appendChild(innerDiv);
		display.appendChild(div);
	}
}

function dbSubmitResponse(response){
	console.log(response);
}