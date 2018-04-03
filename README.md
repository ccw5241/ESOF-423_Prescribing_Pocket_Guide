# ESOF-423_Prescribing_Pocket_Guide
For the MSU Software Engineering class

Useful links for the coding standards the client wants (I think)
http://fhir.cerner.com/millennium/dstu2/
https://docs.healtheintent.com/#introduction

v1.4 - 
	implemented new database on remote machine to fix any initial problems
	halfway done with brand new:
		create questionnaire page
		create form page (modular vs set-size now)
		load questionnaire from databse
	new DB PHQ9 creation file
	custom logic parsing for multi-depth diagnosis created

v1.3 - 
	non-text based form selection
	added new, near complete Database EER diagram
	added question-answer ownership and corresponding database queries

v1.2 - 
	added back end refactoring; ajax now uses callback functions exclusively
	altered variable IDs to be unique to variable types
		Patients = P_xxxx, Users = U_xxxx
	non-ID based patient selection

v1.1 - 
	added Support for basic MDQ Questionnaire; saving form not a feature yet
	added javascript form and patient classes

v1.0 - Beta Release
Instructions, directions and features:
	Login uses users stored on database
		default is 'admin', 'admin'
		new users can be added with 'Signup' link
	PHQ9 questionnaire working independently
	add patient functionality working
	delete patient functionality working via delete icon
	edit patient window working, actual editing is not available
	patient specific PHQ9 Forms can be filled out and reviewed
	patients added permanently via database
		patients contain fname, lname, mname, updated, 
		email, and phone variables
