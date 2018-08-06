module.exports = function(grunt) {

    var dir = "cartz/";

    var mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            compile: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: dir + 'scss/', //'source'
                    src: ['*.scss'],
                    dest: dir + 'css/', // 'destination'
                    ext: '.css'
                }]
            }
        },

        csslint: {
            strict: {
                options: {
                    "important": false,
                    "regex-selectors": false,
                    "unique-headings": false,
                    "universal-selector": false,
                    "unqualified-attributes": false,
                    "box-sizing": false,
                    "outline-none": false,
                    "compatible-vendor-prefixes": false,
                    "adjoining-classes": false,
                    "qualified-headings": false,
                    "vendor-prefix": false,
                    "box-model": false,
                    "ids": false,
                    "fallback-colors": false,
                    "display-property-grouping": false,
                    "font-sizes": false,
                    "known-properties": false,
                    "overqualified-elements": false,
                    "star-property-hack": false,
                    "duplicate-background-images": false,
                    "floats": false,
                    "text-indent": false,
                    "gradients": false,
                    "order-alphabetical": false,
                    "zero-units": false,
                    "bulletproof-font-face": false
                },
                src: [dir+'css/style.css']
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                /*files: {
                    'css/style.min.css': 'css/style.css'
                }*/
                files: [{
                    expand: true,
                    cwd: dir + 'css/',
                    src: ['*.css', '!*.min.css'],
                    dest: dir + 'css/',
                    ext: '.min.css'
                }]
            }            
        },

        imagemin: { // Task 
            /*static: { // Target 
                options: { // Target options 
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]
                },
                files: { // Dictionary of files 
                    'images/controls.png': 'src/controls.png', // 'destination': 'source' 
                    'images/art-1.jpg': 'src/art-1.jpg',
                    'images/bx_loader.gif': 'src/bx_loader.gif'
                }
            },*/
            dynamic: { // Another target 
                files: [{
                    expand: true, // Enable dynamic expansion 
                    cwd: dir + 'images/', // Src matches are relative to this path 
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match 
                    dest: dir + 'images/' // Destination path prefix 
                }]
            }
        },

        jade: {
            compile: {
                options:{
                    client:false,
                    pretty:true,
                    data: grunt.file.readJSON("data.json")
                },
                files: [{
                    expand: true,
                    cwd: dir +"jade/template/",
                    src: "**/*.jade",
                    dest: dir + "",
                    ext: ".html"
                }]
            }
        },

        jshint: {
            files: ['Gruntfile.js', dir + 'js/scripts.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'cartz/js/scripts.min.js': ['cartz/js/scripts.js']
                }
                /*files: [{
                    expand: true,
                    cwd: dir + 'js',                    
                    src: dir + 'js/scripts.js',
                    dest: dir + 'js',
                    ext: '.min.js'
                    
                }]*/
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        dir +'*.html',
                        dir +'*.php',
                        dir +'css/*.css',
                        dir + 'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'+dir
                    //proxy: "localhost.dev" // for php
                }
            },


        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            css: {
                files: dir + 'scss/**/*.scss',
                tasks: ['sass', 'csslint', 'cssmin']
            },
            csslint: {
                files: dir +'css/style.css',
                tasks: ['csslint']
            },
            jshint: {
                files: [dir +'js/scripts.js'],
                tasks: ['jshint']
            },
            uglify: {
                files: [dir +'js/scripts.js',],
                tasks: ['uglify']
            },
            jade: {
                files: [dir + 'jade/template/**/*.jade'],
                tasks: ['jade:compile']
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['browserSync', 'jade', 'csslint', 'cssmin',  'imagemin', 'watch']);

};