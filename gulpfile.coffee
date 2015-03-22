gulp = require 'gulp'
less = require 'gulp-less'
rename = require 'gulp-rename'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
connect = require 'gulp-connect'
iconfont = require 'gulp-iconfont'
iconfontCss = require 'gulp-iconfont-css'
fontName = 'icons';

gulp.task 'bootstrap-less', ->
	gulp.src 'node_modules/bootstrap/less/bootstrap.less'
	.pipe less compress: true
	.pipe gulp.dest 'css/'

gulp.task 'bootstrap-js', ->
	gulp.src [
		'node_modules/bootstrap/js/collapse.js'
	]
	.pipe do uglify
	.pipe concat 'bootstrap.js'
	.pipe gulp.dest 'js/'

gulp.task 'connect', ->
	connect.server
		port: 8000
		livereload: on
		root: ''

gulp.task 'iconfont', ->
	gulp.src ['assets/icons/*.svg']
		.pipe iconfontCss {
			fontName: fontName
			path: 'fonts/templates/_icons.css'
			targetPath: '../../node_modules/bootstrap/less/icons.less'
			fontPath: '../fonts/icons/'
		}
		.pipe iconfont fontName: fontName
		.pipe gulp.dest 'fonts/icons'

gulp.task 'iconfont-watch', ->
	gulp.watch 'assets/icons/*.svg', ['iconfont', 'update']

gulp.task 'copy-knockout', ->
	gulp.src 'node_modules/knockout/build/output/knockout-latest.js'
	.pipe rename 'knockout.js'
	.pipe gulp.dest 'js'

gulp.task 'copy', ['copy-knockout']

gulp.task 'update', ->
	gulp.src '*.html'
	.pipe do connect.reload

gulp.task 'watch-html', ->
	gulp.watch '**/*.html', ['update']

gulp.task 'js-modules', ->
	gulp.src 'js/modules/**/*.js'
	.pipe do uglify
	.pipe rename (path) ->
		path.basename += '.min'
		return
	.pipe gulp.dest 'js/'

gulp.task 'watch-modules', ->
	gulp.watch 'js/modules/**/*.js', ['js-modules', 'update']

gulp.task 'bootstrap-watch', ->
	gulp.watch 'node_modules/bootstrap/less/**/*.less', ['bootstrap-less', 'update']
	gulp.watch 'node_modules/bootstrap/js/**/*.js', ['bootstrap-js', 'update']

gulp.task 'bootstrap', ['bootstrap-less', 'bootstrap-js']
gulp.task 'watch', ['bootstrap-watch', 'watch-html', 'watch-modules', 'iconfont-watch']
gulp.task 'default', ['copy', 'bootstrap', 'js-modules', 'iconfont', 'connect', 'watch']
