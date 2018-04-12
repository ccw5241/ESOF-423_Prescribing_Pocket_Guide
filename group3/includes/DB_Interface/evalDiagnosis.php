<?php
	
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php"); 
	
	//gather info
	$Q_ID = mysqli_real_escape_string($dbconnect, $_POST['Q_ID']);//questionnaire ID
	$name = mysqli_real_escape_string($dbconnect, $_POST['name']);//questionnaire name
	$QSection = mysqli_real_escape_string($dbconnect, $_POST['QSection']);//QSection list
	$QSection = json_decode(stripslashes($QSection), true);
	$Diagnosis = mysqli_real_escape_string($dbconnect, $_POST['Diagnosis']);//Diagnosis list
	$Diagnosis = json_decode(stripslashes($Diagnosis), true);
	$answers =  mysqli_real_escape_string($dbconnect, $_POST['answers']);//Diagnosis list
	$answers = json_decode(stripslashes($answers), true);
	
	$evaluate = [];
	foreach ($Diagnosis as $top_key => $diagData){
		//find a key that is a sub Diagnosis
		if(strpos($top_key, 'D_ID') === false && strpos($top_key, 'D_') !== false){
			$D_ID = $diagData["D_ID"];
			$evaluate[$D_ID] = solveDiag($diagData, $answers);
		}
	}
	echo json_encode($evaluate);
	
	function solveDiag($diagData, $answers){
		$logic = $diagData["logic"];
		$r =  eval("return (".$logic.");");
		return $r;
	}
?>