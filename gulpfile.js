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
        "node_modules/restangular/dist/restangular.min.js",
        "node_modules/angular-promise-buttons/dist/angular-promise-buttons.min.js",
        // "node_modules/angular-base64/angular-base64.min.js",
        // "node_modules/angular-translate/dist/angular-translate.min.js",
        // "node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
        // "node_modules/angular-permission/dist/angular-permission.min.js",
        // "node_modules/angular-permission/dist/angular-permission-ui.min.js",
        // "node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js",
        // "node_modules/ng-file-upload/dist/ng-file-upload.min.js",
        // "node_modules/angular-google-maps-native/dist/angular-google-maps-native.min.js",
        // "node_modules/angular-dynamic-number/release/dynamic-number.min.js",
        // "js/plugins/blueimp-gallery/ng-blueimp-gallery.js",
        // "node_modules/angular-spinner/dist/angular-spinner.min.js",
        // "node_modules/angular-rangeslider/angular.rangeSlider.js"
   ])
   .pipe(concat('dist.min.js'))
//    .pipe(uglify())
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