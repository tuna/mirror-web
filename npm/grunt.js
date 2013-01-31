/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    watch: {
      coffee: {
        files: 'js/**/*.coffee',
        tasks: 'coffee'
      },
      stylus: {
        files: 'css/**/*.styl',
        tasks: 'stylus'
      },
      jade: {
        files: '*.jade',
        tasks: 'jade'
      },
    },
    coffee: {
      compile: {
        files: {
          'js/*.js': 'js/*.coffee', // 1:1 compile
        }
      },
    },
    stylus: {
      compile: {
        files: {
          'css/*.css': 'css/*.styl'
        }
      },
    },
    jade: {
      compile: {
        files: {
          'index.html': 'index.jade'
        }
      },
    },
  });

  grunt.utils.hooker.hook(grunt.fail, 'warn', function(opt) {
    var cmd = "notify-send Grunt 'Task failed'";
    require('child_process').exec(cmd);
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.registerTask('default', 'lint test');
};
