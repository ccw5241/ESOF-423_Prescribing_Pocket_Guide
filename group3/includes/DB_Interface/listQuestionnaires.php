<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php");
	//load variables
	//$Q_ID = mysqli_real_escape_string($dbconnect, $_POST['Q_ID']);
	$result = [];
	//Initial loading of all Patients
	$query = mysqli_query($dbconnect, 
		"SELECT * FROM Questionnaire;")
		or die (mysqli_error($dbconnect));
	
	while ($questionnaire = mysqli_fetch_array($query)) {
		//clean up list duplicates
		$i=0;
		while(array_key_exists($i, $questionnaire)){
			unset($questionnaire[$i]);
			$i = $i+1;
		}
		$result[$questionnaire["Q_ID"]] = $questionnaire;
	}
	echo json_encode($result);
?>