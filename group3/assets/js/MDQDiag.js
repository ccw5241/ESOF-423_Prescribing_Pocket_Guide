// MDQ Diagnosis Questionnaire Scoring

var questionNum = ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes",  "yes",  "yes",  "yes",  "yes",  "yes", "yes", 3];
let len = 0;

function initializeQuestions() {
  let doc = document.getElementById("Questionaire");
  len = doc.length;
    for (let i = 0; i < len; i++) {
      questionNum[i] = doc.elements[i].value;
    }
  diagnose();
}

function diagnose() {
  let totalScore = 0;
  let Q1score = 0;
  // Total question 1 scores
  for (let i = 0; i < len-2; i++) {
    if(questionNum[i].charAt(0) == 'y'){
      Q1score++;
    }
  }
  if(Q1score >= 7){
    totalScore++;
  }
  // Check if question 2 is a 'yes'
  if (Q1score > 1 && questionNum[len-2].charAt(0) == 'y') {
    totalScore++;
  }
  // Check if question 3 is a "Moderate (3)" or "Serious (3)" Problem
  if (Number(questionNum[len-1]) > 2 ) {
    totalScore++;
  }
  document.write("<br>Diagnosis:<br>");
  printDiag(totalScore);
}

function printDiag(total) {
  document.write("Number of diagnosis questions answered as YES:  " + total + "<br>");

  // All answers are yes
  if (total > 2) {
    document.write("<br> The screen is positive for possible Bipolar I Disorder. Complete a clinical interview to make a diagnosis. This screen is not as sensitive for Bipolar II Disorder (Depression and hypomania). <br>");
  }
  else {
    document.write("<br> Not enough evidence for a positive screen of Bipolar I disorder. This screen is not as sensitive for Bipolar II Disorder (Depression and hypomania). <br>");
  }
}

//create unit test for the diagnose
var unitTests = {};

unitTests.diagnose = function(method){
  var Q1 = 8;
  var total1 =1;
  var result1 = total1++;
	}
	if(method(Q1) === result1){
		return true;
	}else{
		return false;
	}
};

console.log(unitTests.diagnose(diagnose));


//create the unit test for printDiag make sure it can be worked
unitTests.printDiag = function(method){
  var total2 =5;
  var result2= document.write("<br> The screen is positive for possible Bipolar I Disorder. Complete a clinical interview to make a diagnosis. This screen is not as sensitive for Bipolar II Disorder (Depression and hypomania). <br>");
	}
	if(method(total2) === result2){
		return true;
	}else{
		return false;
	}
};

console.log(unitTests.printDiag(printDiag));
