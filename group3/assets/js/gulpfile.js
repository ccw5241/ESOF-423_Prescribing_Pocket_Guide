  var gulp = require('group3/assets/js/.js');
  var cookie = require('group3/assets/js/cookies.js');
  var creatid = require('group3/assets/js/creatID.js');
  var mdqd = require('group3/assets/js/MDQDiag.js');
  var modalPerson = require('group3/assets/js/modalPerson.js');
  var pack = require('group3/assets/js/package.js');
  var pat = require('group3/assets/js/Patient.js');
  var phq = require('group3/assets/js/PHQ9Diag.js');

  gulp.task('travis',['build','testServerJS'], function(){
    process.exit(0);
  });

  phq.task('travis',['build','testServerJS'], function(){
    let total = 5;
    var result = calcSeverity(total);
    document.write("Result" + result);
  });

  mdqd.task('travis',['testServerJS'],function(){
    let total = 3;
    var test = printDiag(total);
    document.write("result" + test);
  });

  pat.task('travis',['testServerJS'], function(){
    let P_ID =1;
    let fname = "Chen"
    let lname = "Wei"
    let mname ="s"
  });
