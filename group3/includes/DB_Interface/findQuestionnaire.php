<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php");
	//load variables
	$Q_ID = mysqli_real_escape_string($dbconnect, $_POST['Q_ID']);
	
	//Initial loading of all Patients
	$query = mysqli_query($dbconnect, 
		"SELECT * FROM Questionnaire Q
		where Q.Q_ID = '$Q_ID';")
		or die (mysqli_error($dbconnect));
	$questionnaire = mysqli_fetch_array($query);
	
	//clean up list duplicates
	$i=0;
	while(array_key_exists($i, $questionnaire)){
		unset($questionnaire[$i]);
		$i = $i+1;
	}
	//add Diagnosis
	$result = findDiagnosis($dbconnect, $Q_ID, "IS NULL");
	foreach ($result as $D_ID => $Diagnosis){ //even though there is only 1
		$questionnaire["Diagnosis"] = $Diagnosis;
	}
	//add QSections
	$questionnaire["QSection"] = findQSection($dbconnect, $Q_ID);
	
	echo json_encode($questionnaire);
	
	function findDiagnosis($dbconnect, $Q_ID, $parent_D_ID){
		//account for special IS NULL case
		if(strcmp("$parent_D_ID", "IS NULL") != 0){
			$parent_D_ID = " = '$parent_D_ID'";
		}
		$result = [];
		$query = mysqli_query($dbconnect, 
			"SELECT * FROM Diagnosis D
			where D.Questionnaire_Q_ID = '$Q_ID' and D.Parent_D_ID 
			$parent_D_ID;")
			or die (mysqli_error($dbconnect));
		while ($row = mysqli_fetch_array($query)) {
			// clean up list duplicates (delete all numerical keys)
			$i=0;
			while(array_key_exists($i, $row)){
				unset($row[$i]);
				$i = $i+1;
			}
			$result[$row["D_ID"]] = $row;
			$children = findDiagnosis($dbconnect, $Q_ID, $row["D_ID"]);
			foreach ($children as $D_ID => $Diagnosis){ //even though there is only 1
				$result[$row["D_ID"]][$D_ID] = $Diagnosis;
			}
		}
		return $result;
	}
	
	function findQsection($dbconnect, $Q_ID){
		$result = [];
		//find every QSection
		$query = mysqli_query($dbconnect, 
			"SELECT * FROM QSection QS
			where QS.Questionnaire_Q_ID = '$Q_ID';")
			or die (mysqli_error($dbconnect));
		while ($row = mysqli_fetch_array($query)) {
			// clean up list duplicates (delete all numerical keys)
			$i=0;
			while(array_key_exists($i, $row)){
				unset($row[$i]);
				$i = $i+1;
			}
			$QS_ID = $row["QS_ID"];
			$row["options"] = [];
			//find every optionTitle in this QSection
			$optionSearch = mysqli_query($dbconnect, 
				"SELECT * FROM optionTitle O
				where O.QSection_QS_ID = '$QS_ID';")
				or die (mysqli_error($dbconnect));
			while ($optionTitle = mysqli_fetch_array($optionSearch)) {
				// clean up list duplicates (delete all numerical keys)
				$i=0;
				while(array_key_exists($i, $optionTitle)){
					unset($optionTitle[$i]);
					$i = $i+1;
				}
				//add option found
				$row["options"][$optionTitle["colNum"]] = $optionTitle["title"];
			}
			//find every question of this QSection
			$row["questions"] = [];
			//find every optionTitle in this QSection
			$quSearch = mysqli_query($dbconnect, 
				"SELECT * FROM Question Qu
				where Qu.QSection_QS_ID = '$QS_ID';")
				or die (mysqli_error($dbconnect));
			while ($question = mysqli_fetch_array($quSearch)) {
				// clean up list duplicates (delete all numerical keys)
				$i=0;
				while(array_key_exists($i, $question)){
					unset($question[$i]);
					$i = $i+1;
				}
				//add question found
				$row["questions"][$question["Qu_ID"]] = $question;
			}
			
			
			//add whole QSection to result
			$result[$row["QS_ID"]] = $row;
		}
		return $result;
	}
?>