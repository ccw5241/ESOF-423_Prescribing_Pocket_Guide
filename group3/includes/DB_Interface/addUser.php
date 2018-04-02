<?php
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php");
	
	$ID = mysqli_real_escape_string($dbconnect, $_POST['U_ID']);
	$username = mysqli_real_escape_string($dbconnect, $_POST['username']);
	$pass = mysqli_real_escape_string($dbconnect, $_POST['pass']);
	
	$freeName = TRUE;
	$search = "SELECT username FROM User WHERE username='$username'";
	$ans = mysqli_query($dbconnect, $search);
	while ($row = mysqli_fetch_array($ans)) {
		$freeName = FALSE;
	}
	
	if($freeName){
		$sql = "INSERT INTO User(U_ID, username, password) VALUES ('$ID', '$username', '$pass');";
		if(mysqli_query($dbconnect, $sql)){
			echo 0;
		} else{
			echo "ERROR: Could not execute INSERT";
		}
	}else{
		echo 1;
	}
?>