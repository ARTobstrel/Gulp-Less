'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');


gulp.task('copy', function () {
    return gulp.src('./app/index.html').pipe(gulp.dest('./dist'))
});

gulp.task('less', function () {
    return gulp.src('./app/less/main.less')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Style',
                    message: err.message
                }
            })
        }))
        .pipe(less())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream())
});

gulp.task('server', function () {
    browserSync.init({
        server: {baseDir: './app/'}
    });

    gulp.watch('./app/**/*.html').on('change', browserSync.reload);
    // gulp.watch('./app/**/*.css').on('change', browserSync.reload);
    gulp.watch('./app/less/**/*.less', gulp.series('less'));

});


gulp.task('default', gulp.series('less', 'server'), function () {
    console.log('Gulp running...')
});
