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
	
	//compiles a list of all questions NOT FINISHED!
	//Format: allQuestions['Qu_ID'] = {'Qu_ID': ___, 'qu_text': ____, 'qu_num': ____}
	getAllQuestions(){
		var allQuestions = {};
		for(var QS_ID in this.QSection){
			var currentQS = this.QSection[QS_ID];
			var tempQuestions = this.getAllQuestionsRecurse(currentQS);
			//copy over all found questions
			for(var key in tempQuestions){
				allQuestions[key] = tempQuestions[key];
			}
		}
		return allQuestions;
	}
	//recursive helper to find questions in one section
	getAllQuestionsRecurse(currentQS){
		var allQu = {};
		var isLeaf = false;
		//add current subsection's questions
		for(var Qu_ID in currentQS["questions"]){
			allQu[Qu_ID] = currentQS["questions"][Qu_ID];
			allQu[Qu_ID]["QSection_QS_ID"] = currentQS["QS_ID"];
		}
		//find any subsections
		for(var key in currentQS){
			//found a subsection, call function again using it (currently none exist)
			if(!key.includes("QS_ID") && key.includes("QS_")) {
				var tempQuList = this.getAllQuestionsRecurse(currentQS[key]);
				//add all questions found in those sub sections
				for(var Qu_ID in tempQuList){
					allQu[Qu_ID] = tempQuList[Qu_ID];
				}
			}
		}
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
	//loads this Questionnaire's Q_ID from the server
	loadFromDB(callback){
		var q = this;
		$.ajax({
			type: "POST",
			url: "includes/DB_Interface/findQuestionnaire.php",
			data: {'Q_ID': this.attr["Q_ID"]},
			success: function(result){
				var dict = JSON.parse(result);
				console.log(dict);
				q.listConstructor(dict);
				callback(q);
			}
		});
	}
	
	evaluateDiagnosis(answerDict, callback){
		var d = {}; 
		d["Q_ID"] = this.attr["Q_ID"];
		d["name"] = this.attr["name"];
		d["QSection"] = JSON.stringify(this.QSection);
		d["Diagnosis"] = JSON.stringify(this.Diagnosis);
		d["answers"] =  JSON.stringify(answerDict);
		$.ajax({
			type: "POST",
			url: "includes/DB_Interface/evalDiagnosis.php",
			data: d,
			success: function(result){
				console.log(result);
				var dict = JSON.parse(result);
				callback(dict);
			}
		});
	}
	
	deleteFromDB(){
		var d = {}; 
		d["Q_ID"] = this.attr["Q_ID"];
		$.ajax({
			type: "POST",
			url: "includes/DB_Interface/removeQuestionnaire.php",
			data: d,
			success: function(result){
				console.log("delete: " + result);
			}
		});
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