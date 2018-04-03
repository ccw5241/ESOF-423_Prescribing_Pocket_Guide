<!DOCTYPE html>

<?php 
$navlink = "frontPage";
?>

<html div id="bg">
<head>
	<meta charset="UTF-8">
	<title><?php include('includes/titles.php') ?> | Prescribing Pocket Guide: Online</title>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
	<link rel="stylesheet" type="text/css" href="assets/css/styles.css?t=<?=time()?>">
	<!--<link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
	-->
	<link rel="shortcut icon" href="favicon.ico?t=<?=time()?>" type="image/ico" />
	
</head>

<body>
	<div id="cm-container">
		<header>
			<div class="logo">
				<a href="index.php"><img src="favicon.ico?t=<?=time()?>" height="50">
				<h1>Prescribing Pocket Guide: Online</h1> </a>
			</div>
		</header>
	</div>
	<div class="mainContent">
		<h2>The Prescribing Pocket Guide</h2>
		<p>
			The purpose of this project is to create a web application for the diagnosis of depression. 
			The application will be completely online to where users can access it from 
			anywhere with devices such as a PC or tablet. The diagnosis is based upon the 
			"Prescribing Pocket Guide 2012" for diagnosis and treatment of depression through 
			using questionnaires and scoring metrics. Modifying and creating these questionnaires
			and scoring metrics will also be a feature to allow for future expansion.
		</p><p>
			Being a 100% online service, no installation or downloads are necessary to run the product. 
			This is to allow the most freedom to the user in terms of accessibility. 
			Currently, user creation and basic user functionalities are supported through 
			the 'sign up' and 'sign in' pages respectively. However, these are very much not the final 
			iterations and are not intended for use as a secure account at this moment.
		</p><p>
			Upon creating an account and logging in, the main dashboard will be the first page you will be redirected to.
			This page is still under construction, but the patients tab is functional. 
			Here a patient can be added using the tab on the left, then edited using the edit 
			icon next to the patient in question; resulting in a secondary, pop-up screen. 
			Editing patient information is currently unsupported, 
			however, adding new and reviewing past PHQ9 Forms can be done on this pop-up window.
			Deletion of a patient is done in a similar fashion to editing; just instead by 
			selecting the trash can icon for the corresponding patient.
		</p><p>
			Below a link can be found that will allow for bug tracking and will automatically 
			notify and save your response for review. In doing so, please provide detailed 
			information describing what the bug is, what browser you are using, exact steps to 
			reproduce the bug, as well as the actual and expected results.
		</p>
		<input type="button" class="button" value="Try the Web App!" onClick="location.href = 'signin.php';">
		<h2><a href = "developers.php">--Boring Developer Stuff--</a></h2>
		
	</div>
</body>
<?php include("includes/footer.php"); ?>
</html>
