<!DOCTYPE html>
<?php 
$navlink = "patients";
include("includes/header.php"); 
include("includes/DB_Interface/dbLogin.php"); 
?>

<html div id="bg">
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="assets/js/makeQuestionnaire.js?t=<?=time()?>"></script>
<script type="text/javascript" src="assets/js/Questionnaire.js?t=<?=time()?>"></script>
<script type="text/javascript" src="assets/js/uniqueID.js?t=<?=time()?>"></script>
<script>
	var q = new Questionnaire().simpleConstructor(uniqueID("Q_"));
</script>
<!-- temporary PHQ9 Creation -->
<script type="text/javascript" src="assets/js/genPHQ9.js?t=<?=time()?>"></script>
<body onload = "onloadQuestionnaire();">
	<div class="mainContent">
		<h1>Create Questionnaire</h1>
		<form id="Questionnaire" action = "" onsubmit="submitTester(this); return false;" method = "post">
			Questionnaire Name:<br>
			<input type="text" name="Qname">
			<fieldset id ="QFields">
			<legend > Question Fields: </legend>
				<input type="button" class="button" value="Add Question Section" onclick="createQSection(this);"><br>
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
				<input type="button" class="button" value="Add Diagnosis Section" onclick="createDSection(this);"><br>
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