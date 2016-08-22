const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json'));

function notGrunt(file) {
  return !/Gruntfile.js$/.test(file);
}

function smartSort(a, b) {
  let ab = path.basename(a);
  let bb = path.basename(b);

  if (ab === 'init.js') {
    return 1;
  } else if (bb === 'init.js') {
    return -1;
  } else if (ab === 'constants.js') {
    return -1;
  } else if (bb === 'constants.js') {
    return 1;
  } else if (ab > bb) {
    return 1;
  } else {
    return -1;
  }

  return 0;
}

let src = {
  shared_constants : m('src/shared/scripts/vendor/', /\.js$/).filter(notGrunt).sort(smartSort),
  shared_vendor : m('src/shared/scripts/vendor/', /\.js$/).filter(notGrunt).sort(smartSort),
  shared_custom : m('src/shared/scripts/custom/', /\.js$/).filter(notGrunt).sort(smartSort),
  shared_components : m('src/shared/scripts/components/', /\.js$/).filter(notGrunt).sort(smartSort),
  shared_containers : m('src/shared/scripts/containers/', /\.js$/).filter(notGrunt).sort(smartSort),
  shared_collections : m('src/shared/scripts/collections/', /\.js$/).filter(notGrunt).sort(smartSort),
  shared_main : m('src/shared/scripts/main/', /\.js$/).filter(notGrunt).sort(smartSort),
  shared_init : 'src/shared/scripts/init.js',

  constants : m('src/application/scripts/constants/', /\.js$/).filter(notGrunt).sort(smartSort),
  vendor : m('src/application/scripts/vendor/', /\.js$/).filter(notGrunt).sort(smartSort),
  components : m('src/application/components/', /\.js$/).filter(notGrunt).sort(smartSort),
  containers : m('src/application/containers/', /\.js$/).filter(notGrunt).sort(smartSort),
  custom : m('src/application/scripts/custom/', /\.js$/).filter(notGrunt).sort(smartSort),
  collections : m('src/application/collections/', /\.js$/).filter(notGrunt).sort(smartSort),
  main : m('src/application/main/', /\.js$/).filter(notGrunt).sort(smartSort),
  init : 'src/application/scripts/init.js'
};

module.exports = {
  src : src,

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
    src.shared_constants,
    src.shared_vendor,
    src.shared_custom,
    src.shared_components,
    src.shared_containers,
    src.shared_collections,
    src.shared_main,
    src.shared_init,

    src.constants,
    src.vendor,
    src.components,
    src.containers,
    src.custom,
    src.collections,
    src.main,
    src.init
  )
};
