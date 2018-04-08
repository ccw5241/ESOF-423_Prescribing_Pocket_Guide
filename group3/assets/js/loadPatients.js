//gets info from form and determines if it has been filled out
function addNew(){
	var fName = document.getElementById("fName");
	var mName = document.getElementById("mName");
	var lName = document.getElementById("lName");
	var x = document.getElementById("x");
	if(fName.value && mName.value && lName.value && x.value){
		//add to DB using new patient info
		id = uniqueID("P_");
		var data = {"P_ID": id, "fname": fName.value, "lname": lName.value, "mname": mName.value, "x": x.value, "updated": "Just Now"};
		var newPat = new Patient().listConstructor(data);
		newPat.addToDB();
		//dbWritePatient(data);
		//write this new info to the page
		allPatients[data['P_ID']] = newPat;
		loadOne(newPat);
		//close modal
		var modal = document.getElementById('myModal');
		modal.style.display = "none";
	}else{
		alert("Please fill out all information fields");
	}
}
//loads a single patient in the list  
function loadOne(patientObj){
	var inName = patientObj.attr["fname"] + " " + patientObj.attr["lname"];
	//var inX = patientObj.attr["P_ID"];
	var inX = "Extra Info";
	var inDate = patientObj.attr["updated"];
	
	var wholeList = document.getElementById("allPatients");
	var patient = document.createElement("li");
	var name = document.createElement("li");
	var x = document.createElement("li");
	var date = document.createElement("li");
	var pList = document.createElement("ul");
	
	var imgDel = delImgCreate();
	var imgEdit = editImgCreate();
	var liDel = document.createElement("li");
	var liEdit = document.createElement("li");
	liDel.id = "highlightEach";
	liEdit.id = "highlightEach";
	liDel.appendChild(imgDel);
	liEdit.appendChild(imgEdit);
	
	name.appendChild(document.createTextNode(inName));
	x.appendChild(document.createTextNode(inX));
	date.appendChild(document.createTextNode(inDate));
	pList.appendChild(liDel);
	pList.appendChild(liEdit);
	pList.appendChild(name);
	pList.appendChild(x);
	pList.appendChild(date);
	
	patient.appendChild(pList);
	patient.id= "person";
	wholeList.appendChild(patient);
	patientObj.attr["listItem"] = patient;
}
//receives single patientList and generates Patient Object to load on page
function dbLoadPatient(patList){
	var newPat = new Patient().listConstructor(patList);
	allPatients[patList['P_ID']] = newPat;
	loadOne(newPat);
}
function delImgCreate() {
	var img = new Image(25,25);
    img.src = "assets/images/garbage_can.png";
	img.setAttribute("onclick", "deletePatient(this,event);");
    return img;
}
function editImgCreate() {
	var img = new Image(25,25);
    img.src = "assets/images/edit.png";
	img.setAttribute("onclick", "editPatient(this,event);");
	img.id= "editPatient";
    return img;
}
//deletes a patient when delete icon is clicked
function deletePatient(delItem, e){
	//delete li patient Item
	var delListItem = delItem.parentElement.parentElement.parentElement;
	delListItem.parentNode.removeChild(delListItem);
	
	//find patient selected
	var delID;
	for (var patID in allPatients){
		if(allPatients[patID].attr['listItem'] == delListItem){
			delID = patID;
		}
	}
	var newPat = new Patient().simpleConstructor(delID);
	newPat.deleteFromDB();
	delete allPatients[delID];
	
	sideNavHeight();
    return false;
}
function editPatient(editItem, e){
	//find selected patient
	var editListItem = editItem.parentElement.parentElement.parentElement;
	var editID;
	for (var patID in allPatients){
		if(allPatients[patID].attr['listItem'] == editListItem){
			editID = patID;
		}
	}
	
	//alter modal
	var modal = document.getElementById('myModal');
	document.cookie="P_ID="+editID;
	modal.getElementsByTagName("h1")[0].textContent = "Edit";
	modal.style.display = "block";
	//preload patient info
	var fName = document.getElementById("fName");
	var mName = document.getElementById("mName");
	var lName = document.getElementById("lName");
	var x = document.getElementById("x");
	fName.value = allPatients[editID].attr["fname"];
	mName.value = allPatients[editID].attr["mname"];
	lName.value = allPatients[editID].attr["lname"];
	x.value = "Unused";
	//alter Form review dropdown
	var allForms = document.getElementsByClassName("dropdown")[0];
	allForms.style.display = "block";
	//change text of submit button
	var submitBtn = document.getElementById("modalSubmit");
	submitBtn.value = "Save"
	//Show new PHQ9 button
	var PHQ9Btn = document.getElementById("modalPHQ9");
	PHQ9Btn.style.display = "block";
	
	//load answers from database, then callback addPastForms when it finishes
	allPatients[editID].loadAnsFromDB(addPastForms);
}
//callback from patient class to populate past forms dropdown
function addPastForms(patient){
	var allForms = document.getElementById("myDropdown");
	//delete anything in there
	while(allForms.hasChildNodes()){
		allForms.removeChild(allForms.firstChild);
	}
	
	for(var key in patient.forms){
		var listItem = document.createElement("a");
		patient.forms[key].attr["listItem"] = listItem;
		listItem.appendChild(document.createTextNode(patient.forms[key].attr["time"]));
		listItem.setAttribute("onclick", "reviewForm(this,event);");
		allForms.appendChild(listItem);
	}
		
}
function reviewForm(formListItem, e){
	//search all forms of all patients for selected one
	for (var patID in allPatients){
		for(var formID in allPatients[patID].forms){
			if(allPatients[patID].forms[formID].attr['listItem'] == formListItem){
				F_ID = formID;
			}
		}
	}
	document.cookie="F_ID="+F_ID;
	document.location.href = "makeForm.php";
	window.location.href = "makeForm.php";
}

function doNewPHQ9(){
	document.cookie="F_ID=";
	document.cookie="Q_ID=Q_1"
	document.location.href = "makeForm.php";
	window.location.href = "makeForm.php";
}

function sideNavHeight(){
	var pat = document.getElementById('patientsContent');
	var nav = document.getElementById('sideNav');
	var patH = pat.clientHeight;
	var patTop = pat.getBoundingClientRect().top;
	var navTop = nav.getBoundingClientRect().top;
	var windowH = window.innerHeight;
	if(patTop>0){
		nav.style.height = patH.toString()+"px";
	}else{
		var newH = patH+patTop;
		nav.style.height = newH.toString()+"px";
	}
}