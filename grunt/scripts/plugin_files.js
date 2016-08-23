const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json'));

function notGrunt(file) {
  return !/Gruntfile.js$/.test(file);
}

let src = {
  constants : m('src/constants/', /\.js$/).filter(notGrunt),
  vendor : m('src/vendor/', /\.js$/).filter(notGrunt),
  common : m('src/common/', /\.js$/).filter(notGrunt),
  containers : m('src/containers/', /\.js$/).filter(notGrunt),
  components : m('src/components/', /\.js$/).filter(notGrunt),
  custom : m('src/custom/', /\.js$/).filter(notGrunt),
  collections : m('src/collections/', /\.js$/).filter(notGrunt),
  main : m('src/main/', /\.js$/).filter(notGrunt),
  init : m('src/init/', /\.js$/).filter(notGrunt),
};

let dest = {
  development : {},
  production : {
    bundle : config.scripts && config.gruntBuild.bundle
      ? config.gruntBuild.bundle
      : 'bin/bundle.min.js'
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
    src.constants,
    src.vendor,
    src.custom,
    src.common,
    src.containers,
    src.components,
    src.collections,
    src.main,
    src.init
  )
};
