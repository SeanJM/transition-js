var images = {};
var js     = {};

(function () {
  var lib = {
    main : [
      'src/transition.js',
      'src/transition.delta.js',
      'src/transition.ease.js',
    ]
  };
  function get(files) {
    var arr      = [];
    for (var i = 0, n = files.length; i < n; i++) {
      arr = arr.concat(lib[files[i]]);
    }
    return arr;
  }
  js.main = get([
    'main'
  ]);
})();

function shortFile(dir, fileList) {
  var obj = {};
  for (var k in fileList) {
    for (var i = 0, len = fileList[k].length; i < len; i++) {
      obj[dir + fileList[k][i]] = k + fileList[k][i];
    }
  }
  return obj;
}

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg    : grunt.file.readJSON('package.json'),
    uglify : {
      options : {
        banner    : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap : true,
        mangle    : false
      },
      transition : {
        files: {
          'transition.min.js' : js.main,
        }
      }
    },
    watch: {
      main : {
        files   : js.main,
        tasks   : ['uglify'],
        options : {}
      },
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        },
        tasks: ['default']
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['uglify', 'watch']);
};
