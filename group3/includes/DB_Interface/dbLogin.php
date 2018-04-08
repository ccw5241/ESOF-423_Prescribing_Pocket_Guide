<?php
	//NOTE: A single mysqli_query($dbconnect, $sql); failure will prevent all other calls to fail
	$hostname = "localhost";
	$username = "group3";
	$password = "db4Group3pink";
	$db = "group3";
	$dbconnect = mysqli_connect($hostname,$username,$password,$db);

	if ($dbconnect->connect_error) {
		die("Database connection failed: " . $dbconnect->connect_error);
	}
?>