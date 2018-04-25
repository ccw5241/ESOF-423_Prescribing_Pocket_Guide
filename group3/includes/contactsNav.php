<!doctype html>


<body>
	<div id="sideNav">
		<div class="settings">
			<a href="#"><img src="assets/images/settings.svg?t=<?=time()?>" height="25" id = "vertMid"> Settings </a>
		</div>
			<ul id="highlightEach">
				<li id="addPatient">Add Patient</li>
				<li onclick = "newQuestionnaire();"> <a href = "#">New Questionnaire</a></li>
				<div><li onclick = "toggleDropdown(this);">
					Edit Questionnaire</li>
					<div id="questionnaireEditDropdown" class="dropdown-content">
						<!--<a href="#" onclick = "t()">Link 1</a>-->
					</div>
				</div>
				<div><li onclick = "toggleDropdown(this);">
					Delete Questionnaire</li>
					<div id="questionnaireDelDropdown" class="dropdown-content">
						<!--<a href="#" onclick = "t()">Link 1</a>-->
					</div>
				</div><!--
				<li >Delete Patient</a></li>
				<li <?php echo ($navlink == "contact") ? "class='active'" : ""; ?>><a href="contact.php">Contact</a></li>-->
				
			</ul>
	</div>
</body>
</html>