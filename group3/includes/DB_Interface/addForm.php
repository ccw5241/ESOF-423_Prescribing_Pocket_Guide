<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php"); 
	
	$F_ID = mysqli_real_escape_string($dbconnect, $_POST["F_ID"]);
	$P_ID = mysqli_real_escape_string($dbconnect, $_POST["P_ID"]);
	$Q_ID = mysqli_real_escape_string($dbconnect, $_POST["Q_ID"]);//questionnaire ID
	$numQ = mysqli_real_escape_string($dbconnect, $_POST["numQ"]);
	$allAns = mysqli_real_escape_string($dbconnect, $_POST['allAnswers']);
	$allAns = json_decode(stripslashes($allAns), true);
	
	//create form
	$sql = "INSERT INTO Form(F_ID, Questionnaire_Q_ID, Patient_P_ID) VALUES('$F_ID', '$Q_ID', '$P_ID');";
	$success = mysqli_query($dbconnect, $sql);
	
	//find all Qu_ID for this questionnaire
	$findQu = mysqli_query($dbconnect, 
		"SELECT Qu.* FROM Question Qu
		Join QSection QS on QS.QS_ID = Qu.QSection_QS_ID
		where QS.Questionnaire_Q_ID = '$Q_ID';")
		or die (mysqli_error($dbconnect));
	//list of all Questions
	$questions = array();
	//for each form this patient has:
	//$indexQu = 0;
	while ($row = mysqli_fetch_array($findQu)) {
		// clean up list duplicates (delete all numerical keys)
		$i=0;
		while(array_key_exists($i, $row)){
			unset($row[$i]);
			$i = $i+1;
		}
		$questions[$row["Qu_ID"]] = $row;
		//$indexQu = $indexQu + 1;
	}
	
	//create answers of this form
	foreach($questions as $Qu_ID => $item){
		//$Qu_ID = $questions[(string)$i]["Qu_ID"];
		$answer = $allAns[$item["qu_num"]];
		$ansInsert = "INSERT INTO Answer(ans, Question_Qu_ID, Form_F_ID) VALUES('$answer', '$Qu_ID', '$F_ID');";
		$success = $success && mysqli_query($dbconnect, $ansInsert);
	}
	if($success){
		echo "Records added successfully.";
	} else{
		echo "ERROR: Could not execute";
	}
?>