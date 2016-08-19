const m = require('match-file-utility');

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

module.exports = {
  src : src,

  dest : {
    constants : 'bin/constants.js',
    vendor : 'bin/vendor.js',
    custom : 'bin/custom.js',
    common : 'bin/common.js',
    components : 'bin/components.js',
    containers : 'bin/containers.js',
    collections : 'bin/collections.js',
    main : 'bin/main.js',
    init : 'bin/init.js'
  },

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
