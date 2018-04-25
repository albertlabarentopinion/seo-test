var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyjs = require('gulp-minify');
var minify = require('gulp-minify-css');

gulp.task('js', function(){
   gulp.src([
        'js/plugins/google-map/infobox.js',
        'js/plugins/dropzone/dropzone.js',
        'js/plugins/dropzone/ng-dropzone.min.js',
        'js/plugins/datepicker/bootstrap-datepicker.js',
        'js/plugins/datepicker/ng-datepicker.js',
        'js/plugins/metisMenu/jquery.metisMenu.js',
        'js/plugins/angular-sessionstorage/angular-sessionstorage.js',
        'js/plugins/jstz/moment-timezone.js',
        'node_modules/summernote/dist/summernote.min.js',
        'node_modules/restangular/dist/restangular.min.js',
        'node_modules/angular-promise-buttons/dist/angular-promise-buttons.min.js'
   ])
   .pipe(concat('dist.min.js'))
   .pipe(uglify())
   .pipe(gulp.dest('dist/'));
});

gulp.task('css', function(){
   gulp.src([
       'css/style.css',
       'css/plugins/angular-range-slider/angular.rangeSlider.css',
       'css/animate.css',
       'css/plugins/sweetalert/sweetalert.css',
       'css/plugins/iCheck/awesome-bootstrap-checbox.css',
       'css/plugins/iCheck/custom.css'
   ])
   .pipe(concat('dist.min.css'))
   .pipe(minify())
   .pipe(gulp.dest('dist/'));
});

gulp.task('bod4rentcss', function(){
   gulp.src('css/bod4rent.css') 
   .pipe(minify())
   .pipe(gulp.dest('dist/'));
});

gulp.task('default',['css','js', 'bod4rentcss'],function(){
});