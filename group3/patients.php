<!DOCTYPE html>
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<?php 
$navlink = "patients";
include("includes/header.php"); 
include("includes/DB_Interface/dbLogin.php"); 
?>
<script>
	var allPatients = {};
</script>
		
<html div id="bg">
<script src="assets/js/Patient.js?t=<?=time()?>"></script>
<script src="assets/js/Form.js?t=<?=time()?>"></script>
<script src="assets/js/cookies.js?t=<?=time()?>"></script>
<script type="text/javascript" src="assets/js/loadPatients.js?t=<?=time()?>"></script>
<script type="text/javascript" src="assets/js/uniqueID.js?t=<?=time()?>"></script>
<script type="text/javascript" src="assets/js/Questionnaire.js?t=<?=time()?>"></script>
<?php include("includes/modalPerson.php"); ?>
<body onload="sideNavHeight(); modalPerson(); onloadPatient();" onscroll = "sideNavHeight();">
	<div class="mainContent">
		<?php include("includes/contactsNav.php"); ?>
		<div id="patientsContent">
			<h1>My Patients</h1>
			<!--<div id="highlightEach">-->
				<ul id = "categories">
					<li>Name</li><!--
					--><li>More Info</li><!--
					--><li>Last Updated</li><!--
					-->
				</ul>
			
				<ul id= "allPatients">
					<!--FORMAT: <li id="person"> Aaron Last | ID | Date </li>-->
				</ul>
			<!--</div>-->
		</div>
	</div>
<?php
	//Initial loading of all Patients
	$query = mysqli_query($dbconnect, 
		"SELECT * FROM Patient P
		join User_has_Patient UP on UP.Patient_P_ID = P.P_ID
		where UP.User_U_ID = '$userID';")
		or die (mysqli_error($dbconnect));
		
	while ($row = mysqli_fetch_array($query)) {
		echo "<script> 
			dbLoadPatient(".json_encode($row)."); 
		</script>";
	}/*
	echo "<script>
		console.log(allPatients);
	</script>";*/
?>
</body>
</html>