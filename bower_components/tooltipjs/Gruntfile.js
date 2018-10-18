module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      content: {
        files: ['templates/**/*.jade'],
        tasks: ['jade']
      },
      scripts: {
        files: ['coffee/**/*.coffee'],
        tasks: ['coffee']
      },
      style: {
        files: ['style/**/*.less'],
        tasks: ['less']
      },
      assets: {
        files: ['assets/**/*'],
        tasks: ['copy']
      },
      options: { livereload: true },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them

        files: ['dest/**/*']

      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "dest/index.html": ["templates/index.jade"]
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["assets/css"],
          compress: false,
          cleancss: true
        },
        files: {
          "dest/style/tooltip.css": "style/core.less",
          "dest/style/demo.css": "style/demo*.less"
        }
      },
      production: {
        options: {
          paths: ["assets/css"],
          compress: false,
          cleancss: true
        },
        files: {
          "dest/style/tooltip.css": "style/core.less",
          "dest/style/demo.css": "style/demo*.less"
        }
      }
    },
     bower: {
      install: {
        options: {
          targetDir: './dest/lib',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['assets/fonts/**'], dest: 'dest/style'},
          // includes files within path
          {expand: true, src: ['assets/css/**'], dest: 'dest/style'},
          {expand: true, src: ['lib/**'], dest: 'dest/'}
        ]
      }
    },
    coffee: {
      compile: {
        options: {
          join: true
        },
        files: {
          'dest/scripts/tooltip.js': ['coffee/*.coffee']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('default', ['coffee', 'jade', 'less', 'bower', 'copy']);

};
