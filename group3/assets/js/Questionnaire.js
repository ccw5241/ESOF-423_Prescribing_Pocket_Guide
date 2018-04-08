class Questionnaire {
	constructor() {
		this.QSection = {};
		this.Diagnosis = {};
		this.attr = {};
	}
	//turns into one large list
	toList(){
		var list = {};
		list["Q_ID"] = this.attr["Q_ID"];
		list["name"] = this.attr["name"];
		list["QSection"] = this.QSection;
		list["Diagnosis"] = this.Diagnosis;
		return list;
	}
	
	getAllQSections(){
		return this.QSection;
	}
	//compiles a list of all questions
	getAllQuestions(){
		allQuestions = {};
		for(var QS_ID in this.QSection){
			currentQS = this.QSection[QS_ID];
			allQuestions.push(getAllQuestionsRecurse(currentQS));
		}
		return allQuestions;
	}
	//recursive helper to find questions in one section
	getAllQuestionsRecurse(currentQS){
		allQu = {};
		isLeaf = false;
		for(var key in currentQS){
			if(!key.includes("QS_ID") && key.includes("QS_")) {
				//found a subsection, call function again using it
				allQu.push(getAllQuestionsRecurse(currentQS[key]));
			}
		}
		// add all current questions
		allQu.push(currectQS["questions"]);
		return allQu;
	}
	
	//adds this questionnaire to DB
	addToDB(){
		var d = {}; 
		d["Q_ID"] = this.attr["Q_ID"];
		d["name"] = this.attr["name"];
		d["QSection"] = JSON.stringify(this.QSection);
		d["Diagnosis"] = JSON.stringify(this.Diagnosis);
		$.ajax({
			type: "POST",
			url: "includes/DB_Interface/addQuestionnaire.php",
			data: d,
			success: function(result){
				alert(result);
			}
		});
	}
	
	loadFromDB(){
		
	}
	
}
Questionnaire.prototype.simpleConstructor = function (Q_ID) {
	this.QSection = {};
	this.Diagnosis = {};
	this.attr["Q_ID"] = Q_ID;
	this.attr["QSLinks"] = {};
	this.attr["DLinks"] = {};
	this.attr["QuLinks"] = {};
	return this;
};
Questionnaire.prototype.listConstructor = function (list) {
	this.attr["QSLinks"] = {};
	this.attr["DLinks"] = {};
	this.attr["QuLinks"] = {};
	if(list["Q_ID"] == undefined){
		console.log("generating new Questionnaire item and ID for: ");
		console.log(list);
		list["Q_ID"] = uniqueID("Q_");
	}
	this.attr["Q_ID"] = list["Q_ID"];
	this.attr["name"] = list["name"];
	this.QSection = list["QSection"];
	this.Diagnosis = list["Diagnosis"];
	return this;
};