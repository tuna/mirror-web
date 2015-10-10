var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    fileinclude = require('gulp-file-include');

var path = {
  HTML_TPL: './src/**/*.tpl.html',
  HTML: './src/**/*.html',
  MD_FILES: './src/**/*.md',
  JS_FILES: './src/js/*.js',
  SCSS_FILES: './src/scss/*.scss',
  IMG: './src/img/*',
  LIB: './lib/**/*',
  ROBOTS: './src/robots.txt',
  DEST: 'dist',
  DEST_LIB: 'dist/static',
  DEST_JS: 'dist/static/js',
  DEST_CSS: 'dist/static/css',
  DEST_IMG: 'dist/static/img'
};

gulp.task('copy-lib', function(){
	gulp.src(path.LIB)
    .pipe(gulp.dest(path.DEST_LIB));
});

gulp.task('copy-img', function(){
  gulp.src(path.IMG)
    .pipe(gulp.dest(path.DEST_IMG));
});

gulp.task('copy-html', function(){
  gulp.src(path.ROBOTS)
    .pipe(gulp.dest(path.DEST));
  gulp.src(path.MD_FILES)
    .pipe(gulp.dest(path.DEST));

  gulp.src(path.HTML_TPL)
    .pipe(fileinclude())
    .pipe(rename({
      'extname': ""
    }))
    .pipe(rename({
      'extname': ".html"
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy-html']);
  gulp.watch(path.MD_FILES, ['copy-html']);
  gulp.watch(path.IMG, ['copy-img']);
  gulp.watch(path.SCSS_FILES, ['scss-build']);
  gulp.watch(path.JS_FILES, ['js-build']);
});

gulp.task('js-build', function(){
  gulp.src(path.JS_FILES)
    .pipe(babel())
    .pipe(gulp.dest(path.DEST_JS));
});

gulp.task('scss-build', function(){
  gulp.src(path.SCSS_FILES)
    .pipe(
      sass({outputStyle: 'compact'})
        .on('error', sass.logError)
      )
    .pipe(gulp.dest(path.DEST_CSS));
})

gulp.task('copy', ['copy-html', 'copy-lib', 'copy-img'])

gulp.task('build', ['copy', 'js-build', 'scss-build']);
gulp.task('default', ['copy', 'js-build', 'scss-build', 'watch']);

// vim: ts=2 sts=2 sw=2 expandtab
