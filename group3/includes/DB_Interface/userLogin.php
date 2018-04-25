<?php
	require(dirname(__DIR__)."/DB_Interface/dbLogin.php");
	$user = mysqli_real_escape_string($dbconnect, $_POST['user']);
	$pass = mysqli_real_escape_string($dbconnect, $_POST['pass']);
	
	$sql = "SELECT * FROM User WHERE username='$user' and password='$pass'";
	$ans = mysqli_query($dbconnect, $sql);
	if ($row = mysqli_fetch_array($ans)) {
		//echo "".json_encode($row);
		if($row["password"] == $pass){
			session_start();
			$_SESSION['userID'] = $row["U_ID"];//$user;
			echo 0;
		}
	}else{
		echo 1;
	}
?>