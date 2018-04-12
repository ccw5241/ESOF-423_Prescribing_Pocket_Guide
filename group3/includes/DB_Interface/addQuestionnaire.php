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
	$success = true;
	//$errorString = "";
	//echo json_encode($dbconnect);
	//create questionnaire
	$sql = "INSERT INTO Questionnaire(Q_ID, name) VALUES('$Q_ID', '$name');";
	$success = mysqli_query($dbconnect, $sql);
	//MAKE QSECTION PART
	//run creation function for all base QSections (no children support yet)
	foreach ($QSection as $QS_ID => $QSData){
		$success = $success && createQSection($dbconnect, $Q_ID, $QSData, null);
	}
	//MAKE DIAGNOSIS PART
	//should be only one base diagnosis ran for outer for loop
	foreach ($Diagnosis as $top_D_ID => $mainDiagnosis){
		$success = $success && createDiagnosis($dbconnect, $Q_ID, $mainDiagnosis, null);
		//for every sub diagnosis: (no children of children support yet)
		foreach ($mainDiagnosis as $D_ID => $diagData){
			if(strpos($D_ID, 'D_ID') === false && strpos($D_ID, 'D_') !== false){
				$success = $success && createDiagnosis($dbconnect, $Q_ID, $diagData, $top_D_ID);
			}
		}
	}
	//return
	if($success){
		echo "Records Added Successfully";
	}else{
		echo "Records Failed to add. ";// + $errorString;
	}
	
	
	
	//creates one QSection (currently build for non-recursive use)
	function createQSection($dbconnect, $Q_ID, $curQSection, $Parent_ID){
		$options = $curQSection['options'];
		$questions = $curQSection['questions'];
		$QS_ID = $curQSection['QS_ID'];
		$t = $curQSection['title'];
		$p = $curQSection['prompt'];
		$nO = $curQSection['numOptions'];
		$nQ = $curQSection['numQ'];
																								//+Parent_QS_ID
		$sql = "INSERT INTO QSection(QS_ID, title, prompt, numOptions, numQ, Questionnaire_Q_ID) 
				VALUES('$QS_ID', '$t', '$p', '$nO', '$nQ', '$Q_ID');";
		$success = mysqli_query($dbconnect, $sql);
		//make options items
		foreach ($options as $colNum => $optionTitle){
			$sql = "INSERT INTO optionTitle(QSection_QS_ID, colNum, title) VALUES('$QS_ID', '$colNum', '$optionTitle');";
			$success = $success && mysqli_query($dbconnect, $sql);
		}
		//make every question in this section
		foreach ($questions as $Qu_ID => $QuData){
			$qu_text = $QuData['qu_text'];
			$qu_num = $QuData['qu_num'];
			$sql = "INSERT INTO Question(Qu_ID, qu_text, qu_num, QSection_QS_ID) VALUES('$Qu_ID', '$qu_text', '$qu_num', '$QS_ID');";
			$success = $success && mysqli_query($dbconnect, $sql);
		}
		return $success;
		
		
		//tests as notes:
		//$questionnaire = mysqli_real_escape_string($dbconnect, $_POST['questionnaire']);
		//$questionnaire = json_decode(stripslashes($questionnaire), true);
		//$buffer = $a['c2'];
		//$stringVar = "$buffer";
		//$new = stringVar;
		//echo json_encode($questionnaire['QSection']);
		//$allQuestions = {};
		
		//$logic1 = $questionnaire['D_1']['DS_1']['logic'];
		//$questions = $questionnaire['QSection']['QS_1']['questions'];
		//$testlogic = '5 + false == 5';
		//$r =  eval("return (".$testlogic.");");
		//echo json_encode($r);
		
	}
	function createDiagnosis($dbconnect, $Q_ID, $curDiag, $Parent_ID){
		$D_ID = $curDiag['D_ID'];
		$t = $curDiag['title'];
		$l = $curDiag['logic'];
		$pM = $curDiag['posMessage'];
		$nM = $curDiag['negMessage'];
		$f = $curDiag['footnote'];
		if($Parent_ID == null){
			$sql = "INSERT INTO Diagnosis(D_ID, title, logic, posMessage, negMessage, footnote, Questionnaire_Q_ID) 
					VALUES('$D_ID', '$t', '$l', '$pM', '$nM', '$f', '$Q_ID');";
		}else{
			$sql = "INSERT INTO Diagnosis(D_ID, title, logic, posMessage, negMessage, footnote, Questionnaire_Q_ID, Parent_D_ID) 
					VALUES('$D_ID', '$t', '$l', '$pM', '$nM', '$f', '$Q_ID', '$Parent_ID');";
		}
		$success = mysqli_query($dbconnect, $sql);
		return $success;
	}
?>