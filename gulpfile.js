import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import sourcemaps from 'gulp-sourcemaps';
import pimport from 'postcss-import';
import minmax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import sync from 'browser-sync';

const clean = () => del('dist');

// HTML

export const html = () =>
	gulp
		.src('src/*.html')
		.pipe(
			htmlmin({
				removeComments: true,
				collapseWhitespace: true,
			}),
		)
		.pipe(gulp.dest('dist'))
		.pipe(sync.stream());

// Styles

export const styles = () =>
	gulp
		.src('src/*.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([pimport, minmax, autoprefixer, csso]))
		.pipe(sourcemaps.write('./'))
		.pipe(replace(/\.\.\//g, ''))
		.pipe(gulp.dest('dist'))
		.pipe(sync.stream());

// Scripts

export const scripts = () =>
	gulp
		.src('src/*.js')
		.pipe(
			babel({
				presets: ['@babel/preset-env'],
			}),
		)
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'))
		.pipe(sync.stream());

// Copy

export const copy = () =>
	gulp
		.src(['src/fonts/**/*', 'src/images/**/*', 'src/libs/**/*'], {
			base: 'src',
		})
		.pipe(gulp.dest('dist'))
		.pipe(
			sync.stream({
				once: true,
			}),
		);

// Server

export const server = () => {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: 'dist',
		},
	});
};

// Watch

export const watch = () => {
	gulp.watch('src/*.html', gulp.series(html));
	gulp.watch('src/**/*.css', gulp.series(styles));
	gulp.watch('src/**/*.js', gulp.series(scripts));
	gulp.watch(['src/fonts/**/*', 'src/images/**/*'], gulp.series(copy));
};

// Default

export default gulp.series(clean, gulp.parallel(html, styles, scripts, copy), gulp.parallel(watch, server));

// cобрать проект
export const build = gulp.series(clean, gulp.parallel(html, styles, scripts, copy));
