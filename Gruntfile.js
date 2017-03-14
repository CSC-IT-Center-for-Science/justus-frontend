'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var distDir = 'dist';

  grunt.initConfig({
    clean: {
      files: distDir,
      options: {
        force: true
      }
    },
    useminPrepare: {
      html: ['src/index.html','src/justus.html','src/omat.html','src/tarkasta.html'],
      options: {
        dest: distDir,
        flow: {
          steps: {
            'css': ['concat'],
            'js': ['concat']
          },
          post: {}
        }
      }
    },
    usemin: {
      html: [distDir+'/index.html',distDir+'/justus.html',distDir+'/omat.html',distDir+'/tarkasta.html']
    },
    copy: {
      src: {
        expand: true,
        cwd: 'src',
        src: [
          './**/*.html',
          //usemin+concat: 'js/*',
          'css/*',
          'img/*'
        ],
        dest: distDir,
        options : {
          noProcess: '**/*.{png,gif,jpg,ico,svg}',
          process: function (content) {
            return content.replace(/<!--dev-->.*<!--enddev-->/g, '')
              .replace(/<!-- mustache/g, '')
              .replace(/end mustache -->/g, '');
          }
        }
      },
      fonts: {
        expand: true,
        flatten: true,
        cwd: 'src/bower_components',
        src: ['**/*.{ttf,woff,woff2,eot,svg,otf}'],
        dest: distDir + '/fonts'
      }
    }
  });

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'concat',
    'copy',
    'usemin'
  ]);
};
