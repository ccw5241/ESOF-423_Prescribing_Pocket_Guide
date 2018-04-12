class Form{
	constructor() {
		this.attr = {};
		this.attr["answers"] = {};
	}
	
}
Form.prototype.simpleConstructor = function (F_ID) {
	this.attr["F_ID"] = F_ID;
	return this;
};
Form.prototype.listConstructor = function (list) {
	if(list["F_ID"] == undefined){
		console.log("generating new form item and ID for: ");
		console.log(list);
		list["F_ID"] = uniqueID("F_");
	}
	this.attr["F_ID"] = list["F_ID"];
	this.attr["Patient_P_ID"] = list["Patient_P_ID"];
	this.attr["Questionnaire_Q_ID"] = list["Questionnaire_Q_ID"];
	this.attr["name"] = list["name"];
	this.attr["time"] = list["time"];
	this.attr["type"] = list["type"];
	//FORMAT: attr["answers"]
	this.attr["answers"] = list["answers"];
	//array of answers
	var answers = {};
	let i=0;
	while(list[i.toString()] != undefined){
		answers[i.toString()] = list[i.toString()];
		i++;
	}
	this.attr["allAnswers"] = answers;
	return this;
};