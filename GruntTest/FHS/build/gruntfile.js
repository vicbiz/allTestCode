module.exports = function(grunt){

    grunt.initConfig({

        // watch: {
        //     options: {
        //         cwd: {
        //           files: '../src/scss/',
        //         }
        //     },
        //     scripts: {
        //         files: '**/*.scss',
        //         tasks: ['sass:dev'],
        //         options: {
        //             livereload: true,
        //         }
        //     },
        // },

        clean: {
            options: {
                force: true
            },
            css: ['../css/static'],
            js: ['../js/static'],
            // css: ['../css/*.min.css'],
            // js: ['../js/*.min.js'],
        },

        uglify: {
            // /* Compiling all files separately on the each their path */ 
            all: {
                files: [{
                    cwd: '../js/',
                    // src: '**/*.js',
                    src: '*.js',
                    dest: '../js/static',
                    expand: true,
                    flatten: false,
                    ext: '.min.js'
                }]
            }
        },

        cssmin: {
            options: {
                processImport: false
             },
             target: {
                files: [{
                    expand: true,
                    cwd: '../css',
                    src: ['*.css', '!*.min.css'],
                    dest: '../css/static',
                    ext: '.min.css'
                }]
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.registerTask('default', ['clean','uglify','cssmin']);
}