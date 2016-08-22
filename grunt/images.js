const m = require('match-file-utility');
const path = require('path');

let dest = {};
let files = m('src/', /\.(png|jpg|svg)$/);

files.forEach(function (file) {
  dest['bin/' + path.basename(file)] = file;
});

module.exports = {
  dest : dest,
  files : files
};
