var gulp = require('gulp');

var	concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

var paths = {
    // this is the files that gulp is performing the task on
    src : {
        css: ['./assets/style.css'],
        js: ['./site/js/index.js']
    },
    // this is the destination for shit once it's finished
    dst : {
        js: './assets',
        css: './assets',
    }
};

gulp.task('js:build', () => {
    return browserify({
        entries: paths.src.js,
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest(paths.dst.js));
});

gulp.task('js:compile', () => {
    return gulp.src(`${paths.dst.js}/script.js`)
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dst.js));
});

gulp.task('css:build', () => {
    return gulp.src(paths.src.css)
        .pipe(concat('style.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(paths.dst.css));
});

gulp.task('css:compile', () => {
    return gulp.src(`${paths.dst.css}/style.css`)
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.dst.css));
});