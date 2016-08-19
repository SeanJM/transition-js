const flatman = require('./grunt/flatman');
const tasks = require('./grunt/tasks');
const config = require('./grunt/config');

module.exports = function(grunt) {
  // Project configuration.
  config.pkg = grunt.file.readJSON('package.json');
  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('flatman', flatman.task);
  grunt.registerTask('default', tasks);
};
