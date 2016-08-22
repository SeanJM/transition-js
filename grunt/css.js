const fs = require('fs');
const path = require('path');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json'));

const importFile = config.isSite
  ? 'src/application/import.scss'
  : 'src/import.scss';

const order = [
  'constants.scss',
  'functions.scss',
  'mixins.scss',
  'resets.scss',
  'base.scss',
  'typeography.scss'
];

let task = {};
let files = [];

function byType(a, b) {
  let abase = path.basename(a);
  let bbase = path.basename(b);

  if (order.includes(abase) && order.includes(bbase)) {
    return order.indexOf(abase) - order.indexOf(bbase);
  }

  if (order.includes(abase)) {
    return -1;
  }

  if (order.includes(bbase)) {
    return 1;
  }

  return 0;
}

files = files.concat(m('src/application/fonts/', /\.scss$/).sort(byType));
files = files.concat(m('src/application/styles/vendor', /\.scss$/).sort(byType));
files = files.concat(m('src/application/styles/constants', /\.scss$/).sort(byType));
files = files.concat(m('src/application/styles/functions', /\.scss$/).sort(byType));
files = files.concat(m('src/application/styles/mixins', /\.scss$/).sort(byType));
files = files.concat(m('src/application/styles/custom', /\.scss$/).sort(byType));
files = files.concat(m('src/application/components/', /\.scss$/).sort(byType));
files = files.concat(m('src/application/containers/', /\.scss$/).sort(byType));
files = files.concat(m('src/application/collections/', /\.scss$/).sort(byType));

if (files.length) {
  fs.writeFile(importFile, files.map(function (f) {
    let s = f.split(path.sep).slice(2);
    return `@import "${s.join(path.sep)}";\n`;
  }).join(''));
}

if (config.isProduction) {
  task.sass = {
    dist : {
      files : {
        'bin/bundle.css' : importFile
      }
    },
    options : {
      sourcemap : false,
    }
  };

  task.autoprefixer = {
    options : {
      browsers : ['last 3 version'],
      map : false
    },

    single_file : {
      src : 'bin/bundle.css',
      dest : 'bin/bundle.css'
    }
  };
} else {
  task.sass = {
    dist : {
      files : {
        'bin/bundle.css' : importFile
      }
    },
    options : {
      trace : true,
      sourcemap : 'inline',
      style : 'expanded'
    }
  };

  task.autoprefixer = {
    options : {
      browsers : ['last 3 version'],
      map : true
    },

    single_file : {
      src : 'bin/bundle.css',
      dest : 'bin/bundle.css'
    }
  };
}

module.exports = {
  files : files,
  import : importFile,
  task : task,
  glob : [
    'src/application/styles/**/*.scss',
    'src/application/components/**/*.scss',
    'src/application/containers/**/*.scss',
    'src/application/collections/**/*.scss'
  ]
};
