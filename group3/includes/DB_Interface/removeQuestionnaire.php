<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php");
	$Q_ID = mysqli_real_escape_string($dbconnect, $_POST['Q_ID']);
	
	$success = true;
	$delD1 = "DELETE FROM Diagnosis WHERE Questionnaire_Q_ID='$Q_ID' and Parent_D_ID is not null;";
	$delD2 = "DELETE FROM Diagnosis WHERE Questionnaire_Q_ID='$Q_ID' and Parent_D_ID is null;";
	$success = $success && mysqli_query($dbconnect, $delD1);
	$success = $success && mysqli_query($dbconnect, $delD2);
	//get all forms of this Q
	$findF = mysqli_query($dbconnect, 
		"SELECT F_ID FROM Form where Questionnaire_Q_ID = '$Q_ID';")
		or die (mysqli_error($dbconnect));
	while ($form = mysqli_fetch_array($findF)) {
		$F_ID = $form["F_ID"];
		$delA = "DELETE FROM Answer WHERE Form_F_ID='$F_ID';";
		$delF = "DELETE FROM Form WHERE F_ID='$F_ID';";
		$success = $success && mysqli_query($dbconnect, $delA);
		$success = $success && mysqli_query($dbconnect, $delF);
	}
	
	//get all QS of this Q
	$findQS = mysqli_query($dbconnect, 
		"SELECT QS_ID FROM QSection where Questionnaire_Q_ID = '$Q_ID';")
		or die (mysqli_error($dbconnect));
	while ($qs = mysqli_fetch_array($findQS)) {
		$QS_ID = $qs["QS_ID"];
		$deloptT = "DELETE FROM optionTitle WHERE QSection_QS_ID='$QS_ID';";
		$delQu = "DELETE FROM Question WHERE QSection_QS_ID='$QS_ID';";
		$delQS = "DELETE FROM QSection WHERE QS_ID='$QS_ID';";
		$success = $success && mysqli_query($dbconnect, $deloptT) && mysqli_query($dbconnect, $delQu);
		$success = $success && mysqli_query($dbconnect, $delQS);
	}
	//delete Questionnaire
	$delQ = "DELETE FROM Questionnaire WHERE Q_ID='$Q_ID';";
	$success = $success && mysqli_query($dbconnect, $delQ);
	echo json_encode($success);
?>