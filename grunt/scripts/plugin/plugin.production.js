const fs = require('fs');
const path = require('path');
const files = require('./plugin.files');
const config = JSON.parse(fs.readFileSync('package.json', 'utf8'));

module.exports = {
  files : files.list,
  task : {
    uglify : {
      options : {
        mangle : true
      },
      files : {
        src : files.list,
        dest : config.scripts && config.scripts.bundle
         ? config.scripts.bundle
         : 'bin/bundle.min.js'
      }
    }
  }
};
