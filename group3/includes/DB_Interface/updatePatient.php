<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php"); 
	
	$first_name = mysqli_real_escape_string($dbconnect, $_POST['fname']);
	$last_name = mysqli_real_escape_string($dbconnect, $_POST['lname']);
	$mid_name = mysqli_real_escape_string($dbconnect, $_POST['mname']);
	$x = mysqli_real_escape_string($dbconnect, $_POST['x']);
	$P_ID = mysqli_real_escape_string($dbconnect, $_POST['P_ID']);
	
	$sql = "Update Patient
		Set fname = '$first_name', lname = '$last_name', mname = '$mid_name'
		Where P_ID = '$P_ID';";
	if(mysqli_query($dbconnect, $sql)){
		echo "Records added successfully.";
	} else{
		echo "ERROR: Could not execute";
	}
?>