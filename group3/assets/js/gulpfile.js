  var gulp = require('gulp');
  var babel = require('gulp-babel');
  var runSeq = require('run-sequence');
  var plumber = require('gulp-plumber');
  var concat = require('gulp-concat');
  var rename = require('gulp-rename');
  var sass = require('gulp-sass');
  var livereload = require('gulp-livereload');
  var test = require('test');

  gulp.task('travis',['build','testServerJS'], function(){
    process.exit(0);
  });
