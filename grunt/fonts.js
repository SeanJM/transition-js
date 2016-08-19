const fs = require('fs');
const m = require('match-file-utility');

const files = m('src/application/fonts/', /(eot|svg|ttf|woff|woff2)$/);

module.exports = {
  files : files
};
