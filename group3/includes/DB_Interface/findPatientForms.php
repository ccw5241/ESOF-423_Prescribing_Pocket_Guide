<?php
	session_start(); 
	$userID = $_SESSION['userID'];
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php");
	$P_ID = mysqli_real_escape_string($dbconnect, $_POST['P_ID']);
	
	//Initial loading of all Patients
	$query = mysqli_query($dbconnect, 
		"SELECT * FROM Form F
		where F.Patient_P_ID = '$P_ID';")
		or die (mysqli_error($dbconnect));
		
	//list of form lists
	$results = [];
	//for each form this patient has:
	while ($row = mysqli_fetch_array($query)) {
		// clean up list duplicates (delete all numerical keys)
		$i=0;
		while(array_key_exists($i, $row)){
			unset($row[$i]);
			$i = $i+1;
		}
		$F_ID = $row["F_ID"];
		$row["answers"] = [];
		$findAns = mysqli_query($dbconnect, 
			"SELECT A.*, Qu.qu_num FROM Answer A
			Join Question Qu on Qu.Qu_ID = A.Question_Qu_ID
			where A.Form_F_ID = '$F_ID';")
			or die (mysqli_error($dbconnect));
		//for each answer in this form
		while($ans = mysqli_fetch_array($findAns)) {
			// clean up list duplicates (delete all numerical keys)
			$j=0;
			while(array_key_exists($j, $ans)){
				unset($ans[$j]);
				$j = $j+1;
			}
			//add cleaned answers to form according to which question 'num' it is
			$row["answers"][(string)$ans["qu_num"]] = $ans["ans"];
		}
		//add form to list of all forms for this patient
		$results[$F_ID] = $row;
	}
	echo json_encode($results);
?>