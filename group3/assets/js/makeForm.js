function onload(P_ID, F_ID, Q_ID){
	//add questions to UI
	if(Q_ID != ""){
		var q = new Questionnaire.simpleConstructor(Q_ID);
		q.loadFromDB(addQuestions)
	}else{
		alert("Error: No Questionnaire Selected");
	}
	
	//move to callback function (addQuestions)
	if(F_ID != "" && P_ID !="" && Q_ID !=""){
		var p = new Patient().simpleConstructor(P_ID);
		p.loadAnsFromDB(addStartValues);
	}
}

//callback to add questionnaire q
function addQuestions(q){
	let form = document.getElementById("Questionnaire");
	//TO DO: add Questionnaire name
	//add Qsections, unfinished
	var allQSections = q.getAllQSections();
	for(var key in allQSections){
		var oneSect = document.createElement("div");
		oneSect.appendChild(document.createTextNode(allQSections[i.toString()]));
		oneSect.appendChild(document.createElement('br'));
	}
	//add each question, modify to be QSection specific
	//Format: allQuestions['Qu_ID'] = {'Qu_ID': ___, 'qu_text': ____, 'qu_num': ____}
	var allQuestions = q.getAllQuestions();
	var allQu_text = {};
	for (var key in allQuestions){
		allQu_text[allQuestions[key]['qu_num']] = allQuestions[key]['qu_text'];
	}
	for (let i = 0; i < allQu_text.length; i++) {
		var oneQ = document.createElement("div");
		oneQ.appendChild(document.createTextNode(allQu_text[i.toString()]));
		oneQ.appendChild(document.createElement('br'));
		form.appendChild(oneQ);
	}
}

function addStartValues(patient){
	var F_ID = getCookieDataByKey('F_ID');
	let form = document.getElementById("Questionnaire");
	//populate with previous form answers
	console.log(F_ID);
	for (let i = 0; i < form.length; i++) {
		form.elements[i].value = patient.forms[F_ID].attr["allAnswers"][i.toString()]["ans"];
	}
}