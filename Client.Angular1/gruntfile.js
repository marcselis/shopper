/// <binding ProjectOpened='default' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: 'wwwroot/lib',
                    layout: 'byComponent',
                    cleanTargetDir: false
                }
            }
        },
        uglify: {
            options: {
                compress: false,
                beautify: true,
                sourceMap: true
            },
            js: {
                files: { 'wwwroot/app/app.js': ['app/app.js', 'app/**/*.js'] }
            }
        },

        html2js: {
            options: {
                base: 'app',
                module: 'app.templates',
                rename: function (moduleName) {
                    return '/app/' + moduleName;
                }
            },
            app: {
                src: ['app/**/*.html'],
                dest: 'wwwroot/app/templates.js'
            }
        },

        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "wwwroot/assets/site.css": "assets/css/site.less"
                }
            }
        },

        watch: {
            scripts: {
                files: ['app/**/*.js', 'app/**/*.html', 'assets/css/*.less'],
                tasks: ['uglify', 'html2js:app', 'less:development']
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'wwwroot',
                    keepalive: true
                }
            }
        }
    });

    
    grunt.registerTask('build', [
        'bower:install',
        'uglify',
        'less:development',
        'html2js:app']);
    
    grunt.registerTask('default', [
        'build',
        'watch']);

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-connect');
};
