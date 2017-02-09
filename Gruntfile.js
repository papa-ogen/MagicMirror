module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
        server: {
        options: {
            port: 8000
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
  cssmin: {
    target: {
      files: [{
        expand: true,
        cwd: "dist/css",
        src: ["*.css", "!*.min.css"],
        dest: "dist/css",
        ext: ".min.css"
      }]
    }
  },   
  babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
          files: [{
              expand: true,
              cwd: 'src',
              src: ['js/*.es2015.js'],
              dest: 'dist/',
              ext: '.js'
          }]
        }
  },
  // concat: {
  //   dist: {
  //     files: {
  //       src: ['src/js/*.js'],
  //       dest: 'dist/js/magicmirror.js',        
  //     }
  //   }
  // },
  watch: {    
    css: {
        files: ["src/sass/*.scss"],
        tasks: ["sass"],
        options: {
            spawn: false,
        },
    },
    scripts: {
        files: ["src/js/*.es2015.js"],
        tasks: ["babel"]    
    },
    html: {
        files: ['*.html']    
    },
    minify: {
        files: "dist/css/*.css",
        tasks: ["cssmin"]
    }
    // concat: {
    //   files: ["src/js/*.js"],
    //   tasks: ["concat"]
    // }
  }
  });

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask("default", ["connect", "sass", "babel", "watch", "cssmin"]);

};