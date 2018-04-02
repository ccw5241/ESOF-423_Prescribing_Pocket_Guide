<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php"); 
	
	//gather info
	$F_ID = mysqli_real_escape_string($dbconnect, $_POST['F_ID']);
	$P_ID = mysqli_real_escape_string($dbconnect, $_POST['P_ID']);
	$Q_ID = mysqli_real_escape_string($dbconnect, $_POST['Q_ID']);//questionnaire ID
	$numQ = mysqli_real_escape_string($dbconnect, $_POST['numQ']);
	
	//create questionnaire
	//$sql = "INSERT INTO Questionnaire(F_ID, Questionnaire_Q_ID, Patient_P_ID) VALUES('$F_ID', '$Q_ID', '$P_ID');";
	//$success = mysqli_query($dbconnect, $sql);
	createQSection($dbconnect);
	
	function createQSection($dbconnect){
		$a = "5";
		$t = mysqli_real_escape_string($dbconnect, $_POST['P_ID']);
		
		$questionnaire = mysqli_real_escape_string($dbconnect, $_POST['questionnaire']);
		$questionnaire = json_decode(stripslashes($questionnaire), true);
		//$buffer = $a['c2'];
		//$stringVar = "$buffer";
		//$new = stringVar;
		//echo json_encode($questionnaire['QSection']);
		//$allQuestions = {};
		/*
		$logic1 = $questionnaire['D_1']['DS_1']['logic'];
		$questions = $questionnaire['QSection']['QS_1']['questions'];
		$testlogic = '5 + false == 5';
		$r =  eval("return (".$testlogic.");");
		echo json_encode($r);
		*/
	}
?>