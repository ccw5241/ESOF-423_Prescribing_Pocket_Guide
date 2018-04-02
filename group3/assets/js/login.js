function submitTester(elem, e) {
	var charCode;
	if(e && e.which)
	{
		charCode = e.which;
	}
	else if (window.event)
	{
		e = window.event;
		charCode = e.keyCode;
	}

	if (charCode == 13) //enter key
	{
		if(elem.name == "pass"){
			login();
		}
		else if(elem.name == "passSignup"){
			signup();
		}
	}
}

function login(){
	var name = document.forms["name"]["username"].value;
	var pass = document.forms["pass"]["password"].value;
	$.ajax({
		type: "POST",
		url: "includes/DB_Interface/userLogin.php",
		data: {"user": name, "pass": pass},
		success: function(result){
			if(result == 0){
				//localStorage.setItem('user', name);
				document.location.href = "main.php";
				window.location.href = "main.php";
			}
			else if(result ==1){
				alert("Incorrect Username or Password");
			}
			else{
				alert(result);
			}
		}
	});
}

function signup(){
	var name = document.forms["name"]["username"].value;
	var pass = document.forms["passSignup"]["password"].value;
	var pass2 = document.forms["repassSignup"]["repassword"].value;
	
	if(pass != pass2){
		alert("Passwords did not match");
		return;
	}
	var id = uniqueID("U_");
	$.ajax({
		type: "POST",
		url: "includes/DB_Interface/addUser.php",
		data: {"U_ID": id, "pass": pass, "username": name},
		success: function(result){
			if(result == 0){
				//localStorage.setItem('user', name);
				alert("Account Created");
				//document.location.href = "main.php";
				//window.location.href = "main.php";
			}
			else if(result == 1){
				alert("This username already exists");
			}
			else{
				alert(result);
			}
		}
	});
}


