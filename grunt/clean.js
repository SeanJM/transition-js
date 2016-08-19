const fs = require('fs');
const isSite = require('./predicates/isSite');

var scriptFiles = isSite
  ? require('./scripts/site/site.files')
  : require('./scripts/plugin/plugin.files');

for (var k in scriptFiles.dest) {
  try {
    fs.unlink(scriptFiles.dest[k]);
  } catch(e) {}
}
