<!DOCTYPE html>
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<?php 
$navlink = "Form";
include("includes/header.php"); 
//include("includes/dbLogin.php");
?>

<html div id="bg">
<script src="assets/js/Patient.js?t=<?=time()?>"></script>
<script src="assets/js/Form.js?t=<?=time()?>"></script>
<script src="assets/js/Questionnaire.js?t=<?=time()?>"></script>
<script src="assets/js/cookies.js?t=<?=time()?>"></script>
<script src="assets/js/makeForm.js?t=<?=time()?>"></script>
<script src="assets/js/uniqueID.js?t=<?=time()?>"></script>

<body onload="onload(getCookieDataByKey('P_ID'), getCookieDataByKey('F_ID'), getCookieDataByKey('Q_ID'));">
<div class="mainContent">
    <h1 id = "title">Depression Questionnaire</h1>
    <form id = "QuestionnaireForm" action = "" onsubmit="submitTester(this); return false;" method = "post">
		<div id = "Questionnaire">
		<!--
      1.) Little interest or pleasure in doing things:<br> <input type="number" min=0 max=3 name="q1"><br>
      2.) Feeling down, depressed or hopeless:<br> <input type="number" min=0 max=3 name="q2"><br>
      3.) Trouble falling asleep, staying asleep, or sleeping to much:<br> <input type=type="number" min=0 max=3 name="q3"><br>
      4.) Feeling tired or having little energy:<br> <input type=type="number" min=0 max=3 name="q4"><br>
      5.) Poor appetite or overeating:<br> <input type="number" min=0 max=3 name="q5"><br>
      6.) Feeling bad about yourself - or that you are a failure - or have let yourself or your family down:<br> <input type="number" min=0 max=3 name="q6"><br>
      7.) Trouble concentrating on things such as reading the newspaper or watching TV:<br> <input type="number" min=0 max=3 name="q7"><br>
      8.) Moving or speaking so slowly that other people have noticed, or the opposite:<br> <input type="number" min=0 max=3 name="q8"><br>
      9.) Thought that you'd be better off dead or hurting yourself in some way:<br> <input type="number" min=0 max=3 name="q9"><br>
      10.) On a scale of 0-3, How difficult have these problems made it for you do do your work, take care of daily life, or get along with others?<br> <input type="number" min=0 max=3 name="q10"><br>
		-->
		
		</div>
		<input type="submit" class="button" value="Diagnose">
	</form>
    <br>
	<br>
    <div id="display"></div>
</div> 
</body>
  
  

</html>