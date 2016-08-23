const m = require('match-file-utility');
const fs = require('fs');
const scripts = require('./scripts');
const config = JSON.parse(fs.readFileSync('package.json'));

let files = m('src/flatman/', /\.js$/);

module.exports = {
  glob : 'src/flatman/**/*.js',
  files : files,
  task : function () {
    const pages = m('src/flatman/pages', /\.js$/).map(a => '../' + a);

    pages.forEach(function (file) {
      var page = require(file);

      if (typeof page === 'undefined') {
        console.log('Cannot generate: \'' + file + '\', is it using \'module.exports\'?');
      }

      if (config.isProduction) {
        page
          .css('bin/bundle')
          .script('bin/bundle');
      } else {
        page.css('bin/bundle');
        for (var k in scripts.dest) {
          try {
            fs.statSync(scripts.dest[k]);
            page.script(scripts.dest[k]);
          } catch (e) {
          }
        }
      }
      page.write();
    });
  }
};
