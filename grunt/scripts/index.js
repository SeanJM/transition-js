const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json'));

const files = config.gruntBuild.isSite
  ? require('./site_files')
  : require('./plugin_files');

const dest = files.dest[
  config.gruntBuild.isProduction
    ? 'production'
    : 'development'
];

let task = {
  concat : {},
  watch : {}
};

task.uglify = {
  options : {
    mangle : true,
    wrap : config.gruntBuild.useClosure
      ? true
      : false
  },
  files : {
    src : files.list,
    dest : config.gruntBuild.bundle
     ? 'bin/' + config.gruntBuild.bundle + '.min.js'
     : 'bin/bundle.min.js'
  }
};

if (config.gruntBuild.alwaysBundle) {
  task.concat.scripts = {
    options : {
      sourceMap : true,
    },
    src : files.list,
    dest : config.gruntBuild.bundle
      ? 'bin/' + config.gruntBuild.bundle + '.js'
      : 'bin/bundle.js'
  };

  task.watch.scripts = {
    files : files.list,
    tasks : [ 'concat:scripts' ]
  };

  if (config.gruntBuild.useClosure) {
    task.concat.scripts.options.banner = '(function () {\n';
    task.concat.scripts.options.footer = '\n}());';
  }

} else {
  for (var k in files.src) {
    if (files.src[k].length) {
      task.concat[k] = {
        options : {
          sourceMap : true,
        },
        src : files.src[k],
        dest : dest[k]
      };

      task.watch[k] = {
        files : files.src[k],
        tasks : [ 'concat:' + k ]
      };

      if (config.gruntBuild.useClosure) {
        task.concat[k].options.banner = '(function () {\n';
        task.concat[k].options.footer = '\n}());';
      }
    }
  }
}

module.exports = {
  list : files.list,
  dest : dest,
  task : task
};
