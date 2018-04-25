function genPHQ9(){
	console.log("loading PHQ9");
	var PHQ9 = {
		'Q_ID': 'Q_1',
		'name': 'PHQ9',
		'QSection' : {
			'QS_1' : {
				'prompt': 'Over the past 2 weeks, how often have you been bothered by any of the following problems?',
				'QS_ID' : 'QS_1',
				'numOptions' : '4',
				'questions' : {
					'Qu_1' : {
						'Qu_ID' : 'Qu_1',
						'qu_text' : 'Little interest or pleasure in doing things',
						'qu_num' : '0'
					},
					'Qu_2' : {
						'Qu_ID' : 'Qu_2',
						'qu_text' : 'Feeling down, depressed or hopeless',
						'qu_num' : '1'
					},
					'Qu_3' : {
						'Qu_ID' : 'Qu_3',
						'qu_text' : 'Trouble falling asleep, staying asleep or sleeping too much',
						'qu_num' : '2'
					},
					'Qu_4' : {
						'Qu_ID' : 'Qu_4',
						'qu_text' : 'Feeling tired or having little energy',
						'qu_num' : '3'
					},
					'Qu_5' : {
						'Qu_ID' : 'Qu_5',
						'qu_text' : 'Poor appetite or overeating',
						'qu_num' : '4'
					},
					'Qu_6' : {
						'Qu_ID' : 'Qu_6',
						'qu_text' : 'Feeling bad about yourself – or that you are a failure – or have let yourself or your family down',
						'qu_num' : '5'
					},
					'Qu_7' : {
						'Qu_ID' : 'Qu_7',
						'qu_text' : 'Trouble concentrating on things such as reading the newspaper or watching television',
						'qu_num' : '6'
					},
					'Qu_8' : {
						'Qu_ID' : 'Qu_8',
						'qu_text' : 'Moving or speaking so slowly that other people could have noticed. Or, the opposite – being so fidgety or restless that you hav ebeen moving around a lot more than usual',
						'qu_num' : '7'
					},
					'Qu_9' : {
						'Qu_ID' : 'Qu_9',
						'qu_text' : 'Thought that you would be better off dead or of hurting yourself in some way',
						'qu_num' : '8'
					}
				},
				'options': {
					'0': 'Not at all',
					'1': 'Several days',
					'2': 'More than half the days',
					'3': 'Nearly every day'
				}
			},
			'QS_2' : {
				'QS_ID' : 'QS_2',
				'numOptions' : '4',
				'questions' : {
					'Qu_10' : {
						'Qu_ID' : 'Qu_10',
						'qu_text' : 'How difficult have those problems made it for you to do your work, take care of things at home or get along with other people?',
						'qu_num' : '9'
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
					'title': 'Diagnosis:',
					'posMessage': 	'Make a tentative diagnosis of depression, after ruling out physical causes, '+
									'normal bereavement and a history of a manic or hypomanic episode.',
					'negMessage':	'No tentative diagnosis of depression.',
					'footnote':	'Screen for bipolar disorder using the Mood Disorders Questionnaire',
					//$answers["Qu_ID"]["ans"]
					//true == 1, false == 0
					'logic': 	'(($answers["Qu_1"]["ans"] > 1) || ($answers["Qu_2"]["ans"] > 1)) && ' + // Part 1
								'((($answers["Qu_1"]["ans"] > 1) + ($answers["Qu_2"]["ans"] > 1)' + // Part 2.1: Sum times Qu #1-8 were 2 or more 
								' + ($answers["Qu_3"]["ans"] > 1) + ($answers["Qu_4"]["ans"] > 1)' +
								' + ($answers["Qu_5"]["ans"] > 1) + ($answers["Qu_6"]["ans"] > 1)' +
								' + ($answers["Qu_7"]["ans"] > 1) + ($answers["Qu_8"]["ans"] > 1)' +
								' + ($answers["Qu_9"]["ans"] > 0)) > 4)' + //Part 2.2: add Part 2.1 with: 'if q9 >= 1'   ---Part 2.3: Is this total sum >= 5?
								'&& ($answers["Qu_10"]["ans"] > 0)'//Part 3
				},
				'D_3': {
					'D_ID': 'D_3',
					'title': 'Treatment and Monitoring, Medication:',
					'posMessage': 	'Treatment or treatment change may be warranted',
					'negMessage':	'No Treatment or treatment change is warranted',
					'footnote':	'',
					//$answers["Qu_ID"]["ans"]
					'logic': '($answers["Qu_1"]["ans"] > 1) || ($answers["Qu_2"]["ans"] > 1) || ($answers["Qu_10"]["ans"] > 0)'
				},
				'D_4': {
					'D_ID': 'D_4',
					'title': 'Treatment and Monitoring, Suicide Risk:',
					'posMessage': 	'Assess for suicide risk.',
					'negMessage':	'No suicide risk',
					'footnote':	'',
					//$answers["Qu_ID"]["ans"]
					'logic': '($answers["Qu_9"]["ans"] > 0)'
				},
				'D_5': {
					'D_ID': 'D_5',
					'title': 'Treatment and Monitoring, Severity Score:',
					'posMessage': 	'',
					'negMessage':	'',
					'footnote':	'Refer to severity score table for diagnosis and treatment.<br />' +
								'Monitoring – a change in the Severity Score of 5 or more is considered<br />' + 
								'clinically significant in assessing improvement of symptoms.',
					//$answers["Qu_ID"]["ans"]
					'logic': 	'("Severity Score: ") + ($answers["Qu_2"]["ans"] + ' +
								'$answers["Qu_2"]["ans"] + $answers["Qu_3"]["ans"] + $answers["Qu_4"]["ans"] + ' +
								'$answers["Qu_5"]["ans"] + $answers["Qu_6"]["ans"] + $answers["Qu_7"]["ans"] + ' +
								'$answers["Qu_8"]["ans"] + $answers["Qu_9"]["ans"])'
				}
			}
		}
	};
	//create data in a way it can go to php
	var q = new Questionnaire().listConstructor(PHQ9);
	q.deleteFromDB();
	q.addToDB();
}