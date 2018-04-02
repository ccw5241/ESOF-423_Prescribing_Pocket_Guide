<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php"); 
	
	$first_name = mysqli_real_escape_string($dbconnect, $_POST['fname']);
	$last_name = mysqli_real_escape_string($dbconnect, $_POST['lname']);
	$mid_name = mysqli_real_escape_string($dbconnect, $_POST['mname']);
	$x = mysqli_real_escape_string($dbconnect, $_POST['x']);
	$ID = mysqli_real_escape_string($dbconnect, $_POST['P_ID']);
	
	$sql = "INSERT INTO Patient(p_ID, Fname, Lname, Mname) VALUES ('$ID', '$first_name', '$last_name', '$mid_name');";
	$sql2 = "INSERT INTO User_has_Patient(User_U_ID, Patient_P_ID) VALUES ('$userID', '$ID');";
	if(mysqli_query($dbconnect, $sql) && mysqli_query($dbconnect, $sql2)){
		echo "Records added successfully.";
	} else{
		echo "ERROR: Could not execute";
	}
?>