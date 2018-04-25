<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php");
	$ID = mysqli_real_escape_string($dbconnect, $_POST['P_ID']);
	
	$success = true;
	$sql = "DELETE FROM Patient WHERE P_ID='$ID';";
	$sql2 = "DELETE FROM User_has_Patient WHERE Patient_P_ID='$ID' and User_U_ID = '$userID';";
	
	$findF = "Select * From Form Where Patient_P_ID='$ID';";
	$loopF = mysqli_query($dbconnect, $findF)
		or die (mysqli_error($dbconnect));
	while($form = mysqli_fetch_array($loopF)){
		$F_ID = $form["F_ID"];
		$delAns = "Delete from Answer Where Form_F_ID='$F_ID';";
		$success = $success && mysqli_query($dbconnect, $delAns);
		$delF = "DELETE FROM Form WHERE F_ID='$F_ID';";
		$success = $success && mysqli_query($dbconnect, $delF);
	}
	
	if($success && mysqli_query($dbconnect, $sql2) && mysqli_query($dbconnect, $sql)){
		echo "Successfully Deleted Patient.";
	} else{
		echo "ERROR: Could not execute";
	}
?>