// Load gulp packages
var gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass');

var input = {
		'styles': 'src/styles/**/*.scss',
		'scripts': 'src/scripts/**/*.js'
	},
	output = {
		'styles': 'dist/styles',
		'scripts': 'dist/scripts'
	};

// Default task
gulp.task('default', function () {
	gulp.start('styles', 'scripts', 'foundation-offcanvas');
});

// Deploy the styles
gulp.task('styles', function () {
	return gulp.src(input.styles, {style: 'expanded'})
		.pipe(sass())
		.pipe(concat('main.css'))
		.pipe(gulp.dest(output.styles))
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest(output.styles))
		.pipe(notify({message: 'Styles task complete'}));
});

// Deploy the scripts
gulp.task('scripts', function () {
	return gulp.src(input.scripts)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(output.scripts))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(output.scripts))
		.pipe(notify({message: 'Scripts task complete'}));
});

// Foundation components - offcanvas
gulp.task('foundation-offcanvas', function () {
return gulp.src(['./node_modules/foundation-apps/js/angular/components/offcanvas/*'])
    .pipe(gulp.dest('./components/offcanvas/'))
    .pipe(notify({message: 'Foundation Offcanvas task complete'}));
});

// Watch
gulp.task('watch', function () {
	// Watch .scss files
	gulp.watch('src/styles/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('src/scripts/**/*.js', ['scripts']);
});