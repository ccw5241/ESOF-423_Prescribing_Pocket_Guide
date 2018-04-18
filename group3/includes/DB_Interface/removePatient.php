<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php");
	$ID = mysqli_real_escape_string($dbconnect, $_POST['P_ID']);
	
	$sql = "DELETE FROM Patient WHERE P_ID='$ID';";
	$sql2 = "DELETE FROM User_has_Patient WHERE Patient_P_ID='$ID' and User_U_ID = '$userID';";
	$delF = "DELETE FROM Form WHERE Patient_P_ID='$ID';";
	
	if(mysqli_query($dbconnect, $sql2) && mysqli_query($dbconnect, $sql)){
		echo "Successfully Deleted Patient.";
	} else{
		echo "ERROR: Could not execute";
	}
?>