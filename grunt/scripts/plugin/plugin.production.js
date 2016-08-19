const files = require('./plugin.files');

module.exports = {
  files : files.list,
  task : {
    uglify : {
      options : {
        mangle : true
      },
      files : {
        src : files.list,
        dest : 'bin/bundle.min.js'
      }
    }
  }
};
