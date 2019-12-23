var gulp = require('gulp'),
    concat = require('gulp-concat'),
    pug = require('gulp-pug'),
    autoprefix =require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    sourcemap = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify');


    
    
    gulp.task('html', function () {
        return gulp.src('stage/html/*.pug')
                .pipe(pug({
                    pretty : true
                }))
                .pipe(gulp.dest('dist'))
                .pipe(livereload())
    });
    gulp.task('css' , function () {
        return gulp.src(['stage/css/**/*.css','stage/css/**/*.scss'])
               .pipe(sourcemap.init())
                .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
                .pipe(autoprefix())
                .pipe(concat('main.css'))
                .pipe(sourcemap.write('.'))
                .pipe(gulp.dest('dist/css'))               
                .pipe(livereload())
    });

    gulp.task('js' , function () {
        return gulp.src('stage/js/*.js')
        .pipe(gulp.concat('main.js'))
        .pipe(gulp.minify())
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.livereload())
    });

    gulp.task('watch' , function () {
        require('./server.js');
        livereload.listen();
        gulp.watch("stage/html/**/*.pug" , ['html']);
        gulp.watch(["stage/css/**/*.css" , "stage/css/**/*.scss"] , ['css']);
        gulp.watch("stage/js/*.js" , ['js']);
    });

