gulp = require 'gulp'
less = require 'gulp-less'
react = require 'gulp-react'
rename = require 'gulp-rename'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
connect = require 'gulp-connect'
iconfont = require 'gulp-iconfont'
iconfontCss = require 'gulp-iconfont-css'
fontName = 'icons';

gulp.task 'react', ->
	gulp.src 'src/react_modules/**/*.jsx'
	.pipe do react
	.pipe gulp.dest 'js/react_modules'

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

# copy necessary libraries
gulp.task 'copy-knockout', ->
	gulp.src 'node_modules/knockout/build/output/knockout-latest.js'
	.pipe rename 'knockout.js'
	.pipe gulp.dest 'js'
gulp.task 'copy-react', ->
	gulp.src ['node_modules/react/dist/react.min.js', 'node_modules/react/dist/react.js']
	.pipe gulp.dest 'js'
gulp.task 'copy-es5-shim', ->
	gulp.src ['node_modules/es5-shim/es5-shim.min.js', 'node_modules/es5-shim/es5-sham.min.js']
	.pipe gulp.dest 'js'
gulp.task 'copy', ['copy-knockout', 'copy-react', 'copy-es5-shim']

gulp.task 'update', ->
	gulp.src '*.html'
	.pipe do connect.reload

gulp.task 'watch-html', ->
	gulp.watch '**/*.html', ['update']

gulp.task 'js-modules', ->
	gulp.src 'src/modules/**/*.js'
	.pipe do uglify
	# .pipe rename (path) ->
		# path.basename += '.min'
		# return
	.pipe gulp.dest 'js/modules'

gulp.task 'watch-modules', ->
	gulp.watch 'src/modules/**/*.js', ['js-modules', 'update']
	gulp.watch 'src/react_modules/**/*.jsx', ['react', 'update']

gulp.task 'bootstrap-watch', ->
	gulp.watch 'node_modules/bootstrap/less/**/*.less', ['bootstrap-less', 'update']
	gulp.watch 'node_modules/bootstrap/js/**/*.js', ['bootstrap-js', 'update']

gulp.task 'bootstrap', ['bootstrap-less', 'bootstrap-js']
gulp.task 'watch', ['bootstrap-watch', 'watch-html', 'watch-modules', 'iconfont-watch']
gulp.task 'default', ['copy', 'iconfont', 'react', 'bootstrap', 'js-modules', 'connect', 'watch']
