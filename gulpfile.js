'use strict';

const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    atImport = require("postcss-import"),
    csso = require('postcss-csso'),
    precss = require('precss'),
    cssnext = require('postcss-cssnext'),
    short = require('postcss-short'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),
    browserify = require('gulp-browserify'),
    pug = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    mixins = require('postcss-mixins');
const watch = require('gulp-watch');


gulp.task('css', function () {

    let processors = [
        precss,
        atImport,
        cssnext,
        short,
        csso,
        mixins
    ];

    return gulp.src('src/assets/main.css')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(postcss(processors))
        .pipe(rename({
            extname: '.css',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/style/'))
        .pipe(browserSync.stream())
});

gulp.task('html', function buildHTML() {
    return gulp.src('src/layout/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: '\t'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream())
});



gulp.task('js', function () {
    return gulp.src('src/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(browserify({
            debug: true,
            transform: [babelify.configure({
                presets: ['env']
            })]
        }))
        .pipe(uglify())
        .pipe(rename({
            extname: '.js',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream())
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('reload', function () {

    browserSync({
        server: {
            baseDir: './dist'
        },
        notify: false
    });
});

gulp.task('watch', ['reload', 'js', 'css', 'html', 'fonts'], function () {
    watch('src/**/*.pug', () => gulp.start('html'));
    watch('src/**/*.css', () => gulp.start('css'));
    watch('src/**/*.js', () => gulp.start('js'));
    gulp.watch('dist/*.html', browserSync.reload());
});