function genPHQ9(){
	console.log("loading PHQ9");
	var PHQ9 = {
		'Q_ID': 'Q_1',
		'name': 'PHQ9',
		'QSection' : {
			'QS_1' : {
				'QS_ID' : 'QS_1',
				'questions' : {
					'Qu_1' : {
						'Qu_ID' : 'Qu_1',
						'qu_text' : 'q1',
						'qu_num' : '1'
					},
					'Qu_2' : {
						'Qu_ID' : 'Qu_2',
						'qu_text' : 'q2',
						'qu_num' : '2'
					},
					'Qu_3' : {
						'Qu_ID' : 'Qu_3',
						'qu_text' : 'q3',
						'qu_num' : '3'
					},
					'Qu_4' : {
						'Qu_ID' : 'Qu_4',
						'qu_text' : 'q4',
						'qu_num' : '4'
					},
					'Qu_5' : {
						'Qu_ID' : 'Qu_5',
						'qu_text' : 'q5',
						'qu_num' : '5'
					},
					'Qu_6' : {
						'Qu_ID' : 'Qu_6',
						'qu_text' : 'q6',
						'qu_num' : '6'
					},
					'Qu_7' : {
						'Qu_ID' : 'Qu_7',
						'qu_text' : 'q7',
						'qu_num' : '7'
					},
					'Qu_8' : {
						'Qu_ID' : 'Qu_8',
						'qu_text' : 'q8',
						'qu_num' : '8'
					},
					'Qu_9' : {
						'Qu_ID' : 'Qu_9',
						'qu_text' : 'q9',
						'qu_num' : '9'
					}
				},
				'options': {
					'0': '0',
					'1': '1',
					'2': '2',
					'3': '3'
				}
			},
			'QS_2' : {
				'QS_ID' : 'QS_2',
				'questions' : {
					'Qu_10' : {
						'Qu_ID' : 'Qu_10',
						'qu_text' : 'q10',
						'qu_num' : '10'
					}
				},
				'options': {
					'0': 'Not Difficult',
					'1': 'Somewhat Difficult',
					'2': 'Very Difficult',
					'3': 'Extremely Difficult'
				}
			}
		},
		'Diagnosis': {
			'D_1' : {
				'D_ID' : 'D_1',
				'logic': 'AND_ALL',
				'title': 'Overall Diag',
				'D_2': {
					'D_ID': 'D_2',
					//$answers["Qu_ID"]["ans"]
					'logic': '$answers["Qu_1"]["ans"] > 1 || $answers["Qu_2"]["ans"] > 1'
				},
				'D_3': {
					'D_ID': 'D_3',
					//$answers["Qu_ID"]["ans"]
					//true == 1, false == 0
					
					'logic': '($answers["Qu_1"]["ans"] > 1 + $answers["Qu_2"]["ans"] > 1' + // Part 1: Sum times Qu #1-8 were 2 or more 
								' + $answers["Qu_3"]["ans"] > 1 + $answers["Qu_4"]["ans"] > 1' +
								' + $answers["Qu_5"]["ans"] > 1 + $answers["Qu_6"]["ans"] > 1' +
								' + $answers["Qu_7"]["ans"] > 1 + $answers["Qu_8"]["ans"] > 1)' +
								' + ($answers["Qu_9"]["ans"] > 0) > 4' //Part 2: add Part 1 with: if q9 >= 1   ---Part 3: Is this total sum >= 5?
				},
				'D_4': {
					'D_ID': 'D_4',
					//$answers["Qu_ID"]["ans"]
					'logic': '$answers["Qu_10"]["ans"] > 0'
				}
			}
		}
	};
	//create data in a way it can go to php
	var q = new Questionnaire().listConstructor(PHQ9);
	q.addToDB();
	
	/*
	d = {};
	d["Q_ID"] = PHQ9["Q_ID"];
	d["name"] = PHQ9["name"];
	d["QSection"] = JSON.stringify(PHQ9["QSection"]);
	d["Diagnosis"] = JSON.stringify(PHQ9["Diagnosis"]);
	
	
	$.ajax({
		type: "POST",
		url: "includes/DB_Interface/addQuestionnaire.php",
		data: d,
		success: function(result){
			//var r = JSON.parse(result);
			console.log(result);
		}
	});*/
}