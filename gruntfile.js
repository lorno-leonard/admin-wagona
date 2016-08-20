'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      dist: ['assets/dist/*', 'application/views/home.php'],
      html: ['application/views/home.php'],
      css: ['assets/dist/css/*']
    },
    shell: {
      dist: {
        command: 'cd assets/dist && mkdir css js fonts images && cd js && mkdir ie'
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          src: ['**'],
          cwd: 'assets/src/fonts/',
          dest: 'assets/dist/fonts/'
        }, {
          expand: true,
          src: ['**'],
          cwd: 'assets/src/images/',
          dest: 'assets/dist/images/'
        }, {
          expand: true,
          src: ['**'],
          cwd: 'assets/src/js/theme-plugins/ie/',
          dest: 'assets/dist/js/ie/'
        }]
      }
    },
    less: {
      dist: {
        files: {
          'assets/dist/css/app.css': 'assets/src/less/app.less'
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'assets/dist/css/app.min.css': ['assets/dist/css/app.css']
        }
      }
    },
    concat: {
      html: {
        src: ['assets/src/templates/header.html', 'assets/src/templates/html/*.html', 'assets/src/templates/footer.html'],
        dest: 'application/views/home.php'
      },
      vendor: {
        options: {
          stripBanners: true
        },
        src: [
          // Theme Plugins
          'assets/src/js/theme-plugins/jquery.min.js',
          'assets/src/js/theme-plugins/bootstrap.js',
          'assets/src/js/theme-plugins/app.js',
          'assets/src/js/theme-plugins/slimscroll/jquery.slimscroll.min.js',

          // Bower Components
          'bower_components/angular/angular.min.js',
          'bower_components/angular-ui-router/release/angular-ui-router.min.js',
          'bower_components/lodash/dist/lodash.min.js'
        ],
        dest: 'assets/dist/js/vendor.js'
      }
    },
    uglify: {
      vendor: {
        files: {
          'assets/dist/js/vendor.min.js': ['assets/dist/js/vendor.js']
        }
      }
    },
    watch: {
      html: {
        files: ['assets/src/templates/**/*'],
        tasks: ['clean:html', 'concat:html']
      },
      less: {
        files: ['assets/src/less/**/*'],
        tasks: ['clean:css', 'less:dist', 'cssmin:dist']
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'shell:dist',
    'copy:dist',
    'concat:html',
    'less:dist',
    'cssmin:dist',
    'concat:vendor',
    'uglify:vendor'
  ]);
};