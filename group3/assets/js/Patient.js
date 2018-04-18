class Patient {
	constructor() {
		this.forms = {};
		this.attr = {};
	}
	//adds this patient to DB
	addToDB(){
		$.ajax({
			type: "POST",
			url: "includes/DB_Interface/addPatient.php",
			data: this.attr,
			success: function(result){
				alert(result);
			}
		});
	}
	
	updateDB(){
		$.ajax({
			type: "POST",
			url: "includes/DB_Interface/updatePatient.php",
			data: this.attr,
			success: function(result){
				alert(result);
			}
		});
	}
	
	//delete this patient from the DB
	deleteFromDB(){
		//delete from DB
		$.ajax({
			type: "POST",
			url: "includes/DB_Interface/removePatient.php",
			data: {"P_ID": this.attr["P_ID"]},
			success: function(result){
				alert(result);
			}
		});
	}
	//load forms belonging to this patient from DB
	loadAnsFromDB(callback){
		var d = {"P_ID": this.attr["P_ID"]};
		var pat = this;
		$.ajax({
			type: "POST",
			url: "includes/DB_Interface/findPatientForms.php",
			data: d,
			success: function(result){
				var dict = JSON.parse(result);
				console.log(dict);
				for(var f in dict){ //for each form make a form obj
					
					pat.forms[f] = new Form().listConstructor(dict[f]);
					console.log(pat.forms[f]);
				}
				callback(pat);
			}
		});
	}
	// create new form in DB owned by this patient
	addAnsToDB(array, Q_ID, callback){
		//var newForm = Form.listConstructor();
		//console.log(newForm);
		var id = uniqueID("F_");
		var d = {"F_ID": id, "P_ID": this.attr["P_ID"], "Q_ID": Q_ID, "numQ": array.length};
		//for (var i = 0; i < array.length; i++) {
		//	d[i] = array[i];
		//}
		d["allAnswers"] = JSON.stringify(array);
		$.ajax({
			type: "POST",
			url: "includes/DB_Interface/addForm.php",
			data: d,
			success: function(result){
				callback(result);
			}
		});
	}
}

Patient.prototype.simpleConstructor = function (P_ID) {
	this.attr["P_ID"] = P_ID;
	return this;
};
Patient.prototype.listConstructor = function (list) {
	if(list["P_ID"] == undefined){
		console.log(list);
	}
	this.attr["P_ID"] = list["P_ID"];
	this.attr["fname"] = list["fname"];
	this.attr["mname"] = list["mname"];
	this.attr["lname"] = list["lname"];
	this.attr["updated"] = list["updated"];
	return this;
};