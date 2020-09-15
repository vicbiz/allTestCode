module.exports = function(grunt){

    var jsFiles = [
        "../src/js/plugins/jquery/jquery-2.1.4.min.js",
        "../src/js/plugins/bootstrap/js/bootstrap.min.js",
        "../src/js/plugins/bootstrap-validator/validator.js",
        "../src/js/plugins/js.cookie.js",
        "../src/js/plugins/canvas-video-player.js",
    
        "../src/js/plugins/colorbox/jquery.colorbox-min.js",
        "../src/js/plugins/jssocials-1.4.0/jssocials.min.js",
        "../src/js/plugins/lazysizes/lazysizes.min.js",
        "../src/js/plugins/lazysizes/ls.unveilhooks.min.js",
        "../src/js/plugins/lazysizes/ls.bgset.min.js",
        "../src/js/plugins/lazysizes/ls.respimg.min.js",
        "../src/js/plugins/sticky-kit.min.js",
        "../src/js/plugins/masonry.pkgd.min.js",
        "../src/js/plugins/markerclusterer/markerclusterer.ftg.js",
        "../src/js/plugins/DataTables-1.10.13/media/js/jquery.dataTables.min.js",
        "../src/js/plugins/DataTables-1.10.13/media/js/dataTables.responsive.min.js",
        "../src/js/plugins/DataTables-1.10.13/media/js/dataTables.fixedHeader.min.js",
    
        "../src/js/ftg_common_src.js",
        "../src/js/ftg_site_src.js",
    ];

    var jsFiles_CMS = [
        "../src/js/plugins/jquery/jquery-2.1.4.min.js",
        "../src/js/plugins/jquery-ui-1.12.1.custom/jquery-ui.min.js",
    
        "../src/js/plugins/bootstrap/js/bootstrap.min.js",
        "../src/js/plugins/bootstrap-select/js/bootstrap-select.min.js",
        "../src/js/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js",
        "../src/js/plugins/bootstrap-validator/validator.js",
    
        "../src/js/plugins/DataTables-1.10.13/media/js/jquery.dataTables.min.js",
        "../src/js/plugins/DataTables-1.10.13/media/js/dataTables.responsive.min.js",
        "../src/js/plugins/DataTables-1.10.13/media/js/accent-neutralise.js",
    
        "../src/js/plugins/colorbox/jquery.colorbox-min.js",
        "../src/js/plugins/chosen_v1.6.2/chosen.jquery.min.js",
        "../src/js/plugins/choses_accent_fix.js",
        "../src/js/plugins/nicEdit/ftg_nicEdit.js",
        "../src/js/plugins/nicEdit/ftg_nicEdit.ms.word.js",
    
        "../src/js/ftg_common_src.js",
        "../src/js/ftg_cms_src.js",
    ];

    var jsFiles_landing = [
        "../src/js/plugins/jquery/jquery-2.1.4.min.js",
        "../src/js/ftg_common_src.js",
    ];

    grunt.initConfig({

        watch: {
            options: {
                cwd: {
                  files: '../src/scss/',
                }
            },
            scripts: {
                files: '**/*.scss',
                tasks: ['sass:dev'],
                options: {
                    livereload: true,
                }
            },
        },

        clean: {
            options: {
                force: true
            },
            folder: ['../static'],
            // folder_v2: ['path/to/dir/**'],
            // contents: ['path/to/dir/*'],
            // subfolders: ['path/to/dir/*/'],
            css: ['../src/css/*'],
        },

        uglify: {
            // /* Compiling all files separately on the each their path */ 
            // all: {
            // files: [{
            //     cwd: '../src/js/',
            //     // src: '**/*.js',
            //     src: '*.js',
            //     dest: '../static/js',
            //     expand: true,
            //     flatten: false,
            //     ext: '.min.js'
            // }]
            // }

            main: {files: { '../static/js/main.min.js': jsFiles }},
            cms:  {files: { '../static/js/cms_main.min.js': jsFiles_CMS }},
            landing: {files: {'../static/js/landing_page_main.min.js': jsFiles_landing}}
        },

        sass: {
            dev: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: '../src/scss/',
                    src: ['*.scss'],
                    dest: '../src/css',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '../src/scss/',
                    src: ['*.scss'],
                    dest: '../src/css',
                    ext: '.css'
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
                    cwd: '../src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '../static/css',
                    // ext: '.min.css'
                    ext: '.css'
                }]
            }
        },

        copy: {
            jsPlugins: {
                files: [{
                    cwd: '../src/js/plugins/',
                    expand: true, 
                    src: '**', 
                    dest: '../static/js/plugins/'
                }]
            },
            fonts: {
                files: [
                    {
                        cwd: '../src/scss/fonts/',
                        expand: true, 
                        src: '**', 
                        dest: '../src/css/fonts/'
                    },
                    {
                        cwd: '../src/scss/fonts/',
                        expand: true, 
                        src: '**', 
                        dest: '../static/css/fonts/'
                    },
                    {
                        cwd: '../src/scss/fonts/',
                        expand: true, 
                        src: '**', 
                        dest: '../static/fonts/'
                    },
                ]
            },
            cssmap: {
                files: [{
                    cwd: '../src/css/',
                    expand: true, 
                    src: '**/*.map', 
                    dest: '../static/css/'
                }]
            },
            extra: {
                files: [{
                    cwd: '../src/extra/',
                    expand: true, 
                    src: '**', 
                    dest: '../static/extra/'
                }]
            },
            images: {
                files: [{
                    cwd: '../src/images/',
                    expand: true, 
                    src: '**', 
                    dest: '../static/images/'
                }]
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.registerTask('default', ['clean','uglify','sass:dist','cssmin','copy']);
}