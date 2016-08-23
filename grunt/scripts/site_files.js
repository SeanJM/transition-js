const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json'));

function notGrunt(file) {
  return !/Gruntfile.js$/.test(file);
}

let src = {
  shared_constants : m('src/shared/scripts/constants/', /\.js$/).filter(notGrunt),
  shared_vendor : m('src/shared/scripts/vendor/', /\.js$/).filter(notGrunt),
  shared_custom : m('src/shared/scripts/custom/', /\.js$/).filter(notGrunt),
  shared_components : m('src/shared/scripts/components/', /\.js$/).filter(notGrunt),
  shared_containers : m('src/shared/scripts/containers/', /\.js$/).filter(notGrunt),
  shared_collections : m('src/shared/scripts/collections/', /\.js$/).filter(notGrunt),
  shared_main : m('src/shared/scripts/main/', /\.js$/).filter(notGrunt),
  shared_init : 'src/shared/scripts/init.js',

  constants : m('src/application/scripts/constants/', /\.js$/).filter(notGrunt),
  vendor : m('src/application/scripts/vendor/', /\.js$/).filter(notGrunt),
  custom : m('src/application/scripts/custom/', /\.js$/).filter(notGrunt),
  components : m('src/application/components/', /\.js$/).filter(notGrunt),
  containers : m('src/application/containers/', /\.js$/).filter(notGrunt),
  collections : m('src/application/collections/', /\.js$/).filter(notGrunt),
  main : m('src/application/main/', /\.js$/).filter(notGrunt),
  init : 'src/application/scripts/init.js'
};

let dest = {
  development : {},
  production : {
    bundle : config.scripts && config.gruntBuild.bundle
      ? config.gruntBuild.bundle
      : 'bin/bundle.js'
  }
};

for (var k in src) {
  if (src[k].length) {
    dest.development[k] = 'bin/' + k + '.js';
  }
}

module.exports = {
  src : src,
  dest : dest,

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
    src.custom,
    src.components,
    src.containers,
    src.collections,
    src.main,
    src.init
  )
};
