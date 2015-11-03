module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        php: {
            dist: {
                options: {
                    base: 'build',
                    port: 8888,
                    open: true
                }
            }
        },
        sass: {
            build: {
                options : {
                    style : 'compressed'
                },
                files: {
                    'build/assets/css/app.min.css': 'src/assets/sass/app.scss'
                }
            }
        },
        jshint: {
            files: ['src/assets/js/**/*.js'],
            options: {
                globals: {
                  jQuery: true
                }
            }
        },
        uglify : {
            my_target: {
                files: {
                    'build/assets/js/app.min.js' : 'src/assets/js/app.js'
                }
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.{php,html}'],
                        dest: 'build/'
                    }
                ]
            }
        },
        watch: {
            js: {
                files: ['src/assets/js/**/*.js'],
                tasks: ['jshint', 'uglify']
            },
            sass: {
                files: ['src/assets/sass/**/*.{scss,sass}'],
                tasks: ['sass']
            },
            html: {
                files: ['src/**/*.{html,php}'],
                tasks: ['htmlmin']
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-php');

    // register tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('serve', ['sass', 'uglify', 'htmlmin', 'php', 'watch']);
    grunt.registerTask('build', ['sass', 'uglify', 'htmlmin']);

};
