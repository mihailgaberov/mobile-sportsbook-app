// Load gulp packages
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass');

const { src, dest, parallel } = require('gulp');


var input = {
		'styles': 'src/styles/**/*.scss',
		'scripts': 'src/scripts/**/*.js'
	},
	output = {
		'styles': 'dist/styles',
		'scripts': 'dist/scripts'
	};

// Default task
gulp.task('default', gulp.series(), function() {
	gulp.watch('styles', 'scripts', 'foundation-offcanvas');
});


function css() {
	return src(input.styles, {style: 'expanded'})
		.pipe(sass())
		.pipe(concat('main.css'))
		.pipe(dest(output.styles))
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(dest(output.styles))
		.pipe(notify({message: 'Styles task complete'}));
}

// Deploy the scripts
function js() {
	return src(input.scripts)
		.pipe(concat('main.js'))
		.pipe(dest(output.scripts))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(dest(output.scripts))
		.pipe(notify({message: 'Scripts task complete'}));
}

function foundationCanvas() {
	return src(['./node_modules/foundation-apps/js/angular/components/offcanvas/*'])
		.pipe(dest('./components/offcanvas/'))
		.pipe(notify({message: 'Foundation Offcanvas task complete'}));
}

exports.js = js;
exports.css = css;
exports.foundationCanvas = foundationCanvas();
exports.default = parallel(css, js, foundationCanvas);
