  var cookies = require('cookies');
  var createID = require('createID');
  var loadPatien = require('loadPatients');
  var log = require('longin');
  var mdqdiag = require('MDQDiag');
  var modal = require('modalPerson');
  var patient = require('Patient');
  var ph = require('PHQ9Diag');
  var test = require('test');

  cookies.task('travis',['build','testServerJS'], function(){
    process.exit(0);
  });
