module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
        server: {
        options: {
            port: 8000,
            livereload: true
        },
        }
    },  
    sass: {                              
    dist: {                            
      options: {                       
        style: "expanded"
      },
      files: {                         
        "dist/css/magicmirror.css": "src/sass/magicmirror.scss"
      }
    }
  },
  typescript: {
    base: {
      src: ["src/ts/*.ts"],
      dest: "dist/js/magicmirror.js"
    }
  },
  watch: {
    css: {
        files: ["src/sass/*.scss"],
        tasks: ["sass"],
        options: {
            spawn: false,
        },
    },
    scripts: {
        files: ["src/ts/*.ts"],
        tasks: ["typescript"],
        options: {
            spawn: false,
        },
    },
    html: {
        files: ['*.html']    
    }
  }
  });

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-typescript");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask("default", ["connect", "sass", "typescript", "watch"]);

};