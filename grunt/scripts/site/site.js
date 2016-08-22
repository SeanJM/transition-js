const fs = require('fs');
const files = require('./files');
const config = JSON.parse(fs.readFileSync('package.json'));
const dest = files.dest[ config.isProduction ? 'production' : 'development' ];

let task = {
  concat : {},
  uglify : {},
  watch : {}
};

task.uglify = {
  options : {
    mangle : true
  },
  files : {
    src : files.list,
    dest : config.scripts && config.scripts.bundle
     ? config.scripts.bundle
     : 'bin/bundle.min.js'
  }
};

for (var k in files.src) {
  if (files.src[k].length) {
    task.concat[k] = {
      options : { sourceMap : true },
      src : files.src[k],
      dest : dest[k]
    };

    task.watch[k] = {
      files : files.src[k],
      tasks : [ 'concat:' + k ]
    };
  }
}

module.exports = {
  list : files.list,
  dest : dest,
  task : task
};
