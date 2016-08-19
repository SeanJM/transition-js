const files = require('./site.files');

module.exports = {
  group : files.group,
  src : files.list,
  dest : files.dest,

  task : {
    options : {
      sourceMap : false
    },

    bundle : {
      src : files.list,
      dest : 'bundle.min.js'
    }
  }
};
