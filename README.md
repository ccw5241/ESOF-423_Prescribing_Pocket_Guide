# ESOF-423_Prescribing_Pocket_Guide
For the MSU Software Engineering class

Useful links for the coding standards the client wants (I think)
http://fhir.cerner.com/millennium/dstu2/
https://docs.healtheintent.com/#introduction

v2.1.1 -
	User creation bug hotfix

v2.1 - 
	Questionnaire updating and duplication added
	Fixed new user adding patients bug
	Changed logic text input to a textarea (for more room)
	added various cosmetic changes as per user testing feedback

v2.0 - 
	Questionnaire deletion added
	Form choice selection list of any Questionnaire available
	PHQ9 diagnosis reordered to add treatment and monitoring
	Diagnosis section reordered to be more readable
	updateable Patients!!
	Fixed some major bugs:
		PHQ9 addition logic fixed
		all forms changed to start at question index 0
		all forms changed to number off questions as per the entire questionnaire, not as per the individual QSections

v1.6 - 
	full questionnaire creation available
	form creation fully modular
	questionnaire creation fully modular
	diagnosis logic evaluation and response added

v1.5 - 
	added custom questionnaire creation (minus logic creation)
	made add questionnaire support for server side 
		adds questionnaire, diagnosis, QSections, questions, and options titles.
	Form creation and review disabled as it is moved over to new system

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
