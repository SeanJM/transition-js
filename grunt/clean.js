const fs = require('fs');
const config = JSON.parse(fs.readFileSync('package.json'));

const scriptFiles = config.isSite
  ? require('./scripts/site/files')
  : require('./scripts/plugin/files');

const dest = config.isProduction
  ? scriptFiles.dest.development
  : scriptFiles.dest.production;

for (var k in dest) {
  try {
    fs.unlink(dest[k]);
  } catch(e) {}
}
