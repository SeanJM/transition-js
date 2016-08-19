const fs = require('fs');
const files = require('./plugin.files');

let task = {
  concat : {
    options : {
      sourceMap : false
    }
  },
  watch : {}
};

if (files.src.constants.length) {
  task.concat.constants = {
    src : files.src.constants,
    dest : files.dest.constants
  };

  task.watch.constants = {
    files : files.src.constants,
    task : [ 'concat:constants' ]
  };
}

if (files.src.vendor.length) {
  task.concat.vendor = {
    src : files.src.vendor,
    dest : files.dest.vendor
  };

  task.watch.vendor = {
    files : files.src.vendor,
    task : [ 'concat:vendor' ]
  };
}

if (files.src.custom.length) {
  task.concat.custom = {
    src : files.src.custom,
    dest : files.dest.custom
  };

  task.watch.custom = {
    files : files.src.custom,
    task : [ 'concat:custom' ]
  };
}

if (files.src.common.length) {
  task.concat.common = {
    src : files.src.common,
    dest : files.dest.common
  };

  task.watch.common = {
    files : files.src.common,
    task : [ 'concat:common' ]
  };
}

if (files.src.containers.length) {
  task.concat.containers = {
    src : files.src.containers,
    dest : files.dest.containers
  };

  task.watch.containers = {
    files : files.src.containers,
    task : [ 'concat:containers' ]
  };
}

if (files.src.components.length) {
  task.concat.components = {
    src : files.src.components,
    dest : files.dest.components
  };

  task.watch.components = {
    files : files.src.components,
    task : [ 'concat:components' ]
  };
}

if (files.src.collections.length) {
  task.concat.collections = {
    src : files.src.collections,
    dest : files.dest.collections
  };

  task.watch.collections = {
    files : files.src.collections,
    task : [ 'concat:collections' ]
  };
}

if (files.src.main.length) {
  task.concat.main = {
    src : files.src.main,
    dest : files.dest.main
  };

  task.watch.main = {
    files : files.src.main,
    task : [ 'concat:main' ]
  };
}

if (files.src.init.length) {
  task.concat.init = {
    src : files.src.init,
    dest : files.dest.init
  };

  task.watch.init = {
    files : files.src.init,
    task : [ 'concat:init' ]
  };
}

module.exports = {
  files : files.list,
  dest : 'bundle.js',
  task : task,
  clean : clean
};
