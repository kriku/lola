gulp = require 'gulp'
less = require 'gulp-less'
rename = require 'gulp-rename'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
connect = require 'gulp-connect'

gulp.task 'bootstrap-less', ->
	gulp.src 'node_modules/bootstrap/less/bootstrap.less'
	.pipe less compress: true
	.pipe gulp.dest 'css/'

gulp.task 'connect', ->
	connect.server
		port: 8000
		livereload: on
		root: ''

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

gulp.task 'bootstrap-watch', ->
	gulp.watch 'node_modules/bootstrap/less/**/*.less', ['bootstrap-less', 'update']

gulp.task 'default', ['copy', 'bootstrap-less', 'bootstrap-watch', 'watch-html', 'connect']
