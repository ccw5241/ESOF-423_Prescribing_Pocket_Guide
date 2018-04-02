<!DOCTYPE html>
<?php 
$navlink = "patients";
include("includes/header.php"); 
include("includes/DB_Interface/dbLogin.php"); 
?>

<html div id="bg">
<script type="text/javascript" src="assets/js/makeQuestionnaire.js?t=<?=time()?>"></script>
<script type="text/javascript" src="assets/js/uniqueID.js?t=<?=time()?>"></script>
<body >
	<div class="mainContent">
		<h1>Create Questionnaire</h1>
		<form id="Questionnaire" action = "" onsubmit="submitTester(); return false;" method = "post">
			Questionnaire Name:<br>
			<input type="text" name="Qname">
			<fieldset id ="QFields">
			<legend > Questions Fields: </legend>
				<input type="button" class="button" value="Add Question Section" onclick="createSection(this);"><br>
				<!--
				<div class = "QSection">
					<br>Field #1:<br>
					<input type="text" name="title" placeholder = "Title"><br>
					<input type="button" class="button" value="Add Question"><br>
					
				</div>
				-->
			</fieldset>
			
			<fieldset id ="DFields">
			<legend > Diagnosis Fields: </legend>
				<input type="button" class="button" value="Add Diagnosis Section" onclick="createSection(this);"><br>
				<!--
				<div class = "QSection">
					<br>Field #1:<br>
					<input type="text" name="title" placeholder = "Title"><br>
					<input type="button" class="button" value="Add Question"><br>
				</div>
				-->
			</fieldset>
			
			
			<input type="submit" class="button" value="Submit">
			
		</form>
		
		<p id="display"></p>
	</div>
</body>
</html>