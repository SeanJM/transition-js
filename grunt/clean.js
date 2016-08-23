const fs = require('fs');
const config = JSON.parse(fs.readFileSync('package.json'));

const scriptFiles = config.gruntBuild.isSite
  ? require('./scripts/site_files')
  : require('./scripts/plugin_files');

function exists(a) {
  let o = {};
  for (let k in a) {
    try {
      fs.statSync(a[k]);
      o[k] = a[k];
    } catch (e) {}
  }
  return o;
}

const dest = config.gruntBuild.isProduction
  ? exists(scriptFiles.dest.development)
  : exists(scriptFiles.dest.production);

for (var k in dest) {
  fs.unlink(dest[k]);
}
