const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json'));

function notGrunt(file) {
  return !/Gruntfile.js$/.test(file);
}

let group = {
  shared_constants : m('src/shared/scripts/vendor/', /\.js$/).filter(notGrunt),
  shared_vendor : m('src/shared/scripts/vendor/', /\.js$/).filter(notGrunt),
  shared_custom : m('src/shared/scripts/custom/', /\.js$/).filter(notGrunt),
  shared_components : m('src/shared/scripts/components/', /\.js$/).filter(notGrunt),
  shared_containers : m('src/shared/scripts/containers/', /\.js$/).filter(notGrunt),
  shared_collections : m('src/shared/scripts/collections/', /\.js$/).filter(notGrunt),
  shared_main : m('src/shared/scripts/main/', /\.js$/).filter(notGrunt),
  shared_init : 'src/shared/scripts/init.js',

  constants : m('src/application/scripts/constants/', /\.js$/).filter(notGrunt),
  vendor : m('src/application/scripts/vendor/', /\.js$/).filter(notGrunt),
  components : m('src/application/components/', /\.js$/).filter(notGrunt),
  containers : m('src/application/containers/', /\.js$/).filter(notGrunt),
  custom : m('src/application/scripts/custom/', /\.js$/).filter(notGrunt),
  collections : m('src/application/collections/', /\.js$/).filter(notGrunt),
  main : m('src/application/main/', /\.js$/).filter(notGrunt),
  init : 'src/application/scripts/init.js'
};

module.exports = {
  group : group,

  dest : {
    development : {
      shared_constants : 'bin/shared_constants.js',
      shared_vendor : 'bin/shared_vendor.js',
      shared_custom : 'bin/shared_custom.js',
      shared_components : 'bin/shared_components.js',
      shared_containers : 'bin/shared_containers.js',
      shared_collections : 'bin/shared_collections.js',
      shared_main : 'bin/shared_main.js',
      shared_init : 'bin/init.js',

      constants : 'bin/constants.js',
      vendor : 'bin/vendor.js',
      components : 'bin/components.js',
      containers : 'bin/containers.js',
      custom : 'bin/custom.js',
      collections : 'bin/collections.js',
      main : 'bin/main.js',
      init : 'bin/init.js'
    },
    production : {
      bundle : config.scripts && config.scripts.bundle
        ? config.scripts.bundle
        : 'bundle.min.js'
    }
  },

  list : [].concat(
    group.shared_constants,
    group.shared_vendor,
    group.shared_custom,
    group.shared_components,
    group.shared_containers,
    group.shared_collections,
    group.shared_main,
    group.shared_init,

    group.constants,
    group.vendor,
    group.components,
    group.containers,
    group.custom,
    group.collections,
    group.main,
    group.init
  )
};
